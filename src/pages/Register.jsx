import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgAssets from '../components/BgAssets'
import Toast from '../components/Toast'
import LoadingScreen from '../components/LoadingScreen'
import useToast from '../hooks/useToast'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, toast, remove } = useToast()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (form.password.length < 6) {
      toast.error('Password terlalu pendek', 'Minimal 6 karakter.')
      return
    }
    if (form.password !== form.confirm) {
      toast.error('Password tidak cocok', 'Pastikan kedua password sama.')
      return
    }

    const users = JSON.parse(localStorage.getItem('scanaja_users') || '{}')
    if (users[form.email]) {
      toast.error('Email sudah terdaftar', 'Gunakan email lain atau langsung masuk.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      users[form.email] = { password: form.password }
      localStorage.setItem('scanaja_users', JSON.stringify(users))
      localStorage.setItem('scanaja_email', form.email)
      toast.success('Akun berhasil dibuat!', 'Lengkapi data dirimu sekarang.')
      setTimeout(() => navigate('/profile'), 800)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="purple" />
      <Toast toasts={toasts} remove={remove} />
      {loading && <LoadingScreen message="Membuat akun..." />}

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
            <p className="text-sm font-semibold text-gray-400 mt-3">Buat akun baru</p>
          </div>

          {/* Card */}
          <div
            className="rounded-[2rem] border-2 border-white bg-white p-8"
            style={{ boxShadow: '0 12px 0 0 rgba(0,0,0,0.09), 0 20px 40px rgba(0,0,0,0.08)' }}
          >
            <h2 className="text-2xl font-black text-gray-800 mb-1">Daftar Sekarang</h2>
            <p className="text-sm font-semibold text-gray-400 mb-7">Isi data berikut untuk membuat akun</p>

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
                  placeholder="Minimal 6 karakter"
                  value={form.password}
                  onChange={handleChange}
                  className="clay-input"
                />
              </div>
              <div>
                <label className="clay-label">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirm"
                  required
                  placeholder="Ulangi password"
                  value={form.confirm}
                  onChange={handleChange}
                  className="clay-input"
                />
              </div>

              <button
                type="submit"
                className="clay-btn btn-glow text-white w-full mt-1"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)' }}
              >
                Buat Akun
              </button>
            </form>

            <div className="mt-6 pt-5 border-t-2 border-gray-50 text-center">
              <p className="text-sm font-semibold text-gray-400">
                Sudah punya akun?{' '}
                <Link to="/login" className="font-extrabold text-violet-600 hover:text-violet-800 transition-colors">
                  Masuk di sini
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
