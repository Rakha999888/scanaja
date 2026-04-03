import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgAssets from '../components/BgAssets'
import Toast from '../components/Toast'
import LoadingScreen from '../components/LoadingScreen'
import useToast from '../hooks/useToast'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, toast, remove } = useToast()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('scanaja_users') || '{}')
    if (!users[form.email]) {
      toast.error('Akun tidak ditemukan', 'Silakan daftar terlebih dahulu.')
      return
    }
    if (users[form.email].password !== form.password) {
      toast.error('Password salah', 'Periksa kembali passwordmu.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('scanaja_email', form.email)
      const profile = localStorage.getItem('scanaja_profile')
      toast.success('Berhasil masuk!', 'Selamat datang kembali.')
      setTimeout(() => navigate(profile ? '/qrcode' : '/profile'), 800)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="pink" />
      <Toast toasts={toasts} remove={remove} />
      {loading && <LoadingScreen message="Sedang masuk..." />}

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12" style={{ zIndex: 1 }}>
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/">
              <span
                className="inline-block rounded-[1.25rem] px-6 py-2 text-2xl font-black text-violet-700 border-2 border-white"
                style={{ background: '#ede9fe', boxShadow: '0 6px 0 0 rgba(0,0,0,0.09)' }}
              >
                ScanAja
              </span>
            </Link>
            <p className="text-sm font-semibold text-gray-400 mt-3">Masuk ke akunmu</p>
          </div>

          {/* Card */}
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
                  type="email"
                  name="email"
                  required
                  placeholder="email@kampus.ac.id"
                  value={form.email}
                  onChange={handleChange}
                  className="clay-input"
                />
              </div>
              <div>
                <label className="clay-label">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password kamu"
                  value={form.password}
                  onChange={handleChange}
                  className="clay-input"
                />
              </div>

              <button
                type="submit"
                className="clay-btn btn-glow text-white w-full mt-1"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)' }}
              >
                Masuk
              </button>
            </form>

            <div
              className="mt-6 pt-5 border-t-2 border-gray-50 text-center"
            >
              <p className="text-sm font-semibold text-gray-400">
                Belum punya akun?{' '}
                <Link to="/register" className="font-extrabold text-violet-600 hover:text-violet-800 transition-colors">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center mt-6 text-xs font-bold text-gray-300">
            ScanAja &copy; 2026 — by rakhakbr
          </p>
        </div>
      </div>
    </div>
  )
}
