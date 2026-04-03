import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import BgAssets from '../components/BgAssets'
import Toast from '../components/Toast'
import LoadingScreen from '../components/LoadingScreen'
import useToast from '../hooks/useToast'

export default function LoginUser() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, toast, remove } = useToast()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const userRef = doc(db, 'users', form.email)
      const snap = await getDoc(userRef)
      if (!snap.exists()) {
        toast.error('Akun tidak ditemukan', 'Silakan daftar terlebih dahulu.')
        setLoading(false)
        return
      }
      if (snap.data().password !== form.password) {
        toast.error('Password salah', 'Periksa kembali passwordmu.')
        setLoading(false)
        return
      }
      localStorage.setItem('scanaja_email', form.email)
      toast.success('Berhasil masuk!', 'Selamat datang kembali.')
      // Cek apakah profil sudah ada di Firestore
      const profileSnap = await getDoc(doc(db, 'profiles', form.email))
      setTimeout(() => navigate(profileSnap.exists() ? '/qrcode' : '/profile'), 800)
    } catch (err) {
      toast.error('Gagal masuk', err.message)
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="pink" />
      <Toast toasts={toasts} remove={remove} />
      {loading && <LoadingScreen message="Sedang masuk..." />}

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12" style={{ zIndex: 1 }}>
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="mt-4">
              <div
                className="inline-flex items-center gap-2 rounded-[1.25rem] px-5 py-2 border-2 border-white"
                style={{ background: '#fce7f3', boxShadow: '0 6px 0 0 rgba(0,0,0,0.09)' }}
              >
                <span className="text-lg">🎓</span>
                <span className="text-xl font-black text-pink-700">Mahasiswa</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-400 mt-3">Masuk ke akun mahasiswamu</p>
          </div>

          <div
            className="rounded-[2rem] border-2 border-white bg-white p-8"
            style={{ boxShadow: '0 12px 0 0 rgba(0,0,0,0.09), 0 20px 40px rgba(0,0,0,0.08)' }}
          >
            <h2 className="text-2xl font-black text-gray-800 mb-1">Selamat Datang</h2>
            <p className="text-sm font-semibold text-gray-400 mb-7">Masukkan email dan password kamu</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="clay-label">Email</label>
                <input
                  type="email" name="email" required
                  placeholder="email@kampus.ac.id"
                  value={form.email} onChange={handleChange}
                  className="clay-input"
                />
              </div>
              <div>
                <label className="clay-label">Password</label>
                <input
                  type="password" name="password" required
                  placeholder="Password kamu"
                  value={form.password} onChange={handleChange}
                  className="clay-input"
                />
              </div>
              <button
                type="submit"
                className="clay-btn btn-glow text-white w-full mt-1"
                style={{ background: 'linear-gradient(135deg, #db2777, #a21caf)' }}
              >
                Masuk
              </button>
            </form>

            <div className="mt-6 pt-5 border-t-2 border-gray-50 text-center">
              <p className="text-sm font-semibold text-gray-400">
                Belum punya akun?{' '}
                <Link to="/register" className="font-extrabold text-pink-600 hover:text-pink-800 transition-colors">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-violet-500 transition-colors">
              ← Kembali ke pilihan login
            </Link>
          </div>

          <p className="text-center mt-3 text-xs font-bold text-gray-300">
            ScanAja &copy; 2026 — by rakhakbr
          </p>
        </div>
      </div>
    </div>
  )
}
