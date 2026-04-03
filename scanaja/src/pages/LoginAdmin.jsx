import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgAssets from '../components/BgAssets'
import Toast from '../components/Toast'
import LoadingScreen from '../components/LoadingScreen'
import useToast from '../hooks/useToast'

const ADMIN_CREDENTIALS = { email: 'admin@scanaja.id', password: 'admin123' }

export default function LoginAdmin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, toast, remove } = useToast()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.email !== ADMIN_CREDENTIALS.email || form.password !== ADMIN_CREDENTIALS.password) {
      toast.error('Akses ditolak', 'Email atau password admin salah.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('scanaja_admin', 'true')
      toast.success('Selamat datang, Admin!')
      setTimeout(() => navigate('/admin/dashboard'), 800)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="purple" />
      <Toast toasts={toasts} remove={remove} />
      {loading && <LoadingScreen message="Masuk sebagai admin..." />}

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10" style={{ zIndex: 1 }}>
        <div className="w-full max-w-sm">

          {/* Logo + judul */}
          <div className="text-center mb-6">
            <Link to="/">
              <span className="font-black text-violet-600 text-xl tracking-tight">ScanAja</span>
            </Link>
            <div className="mt-4 flex justify-center">
              <div
                className="inline-flex items-center gap-2 rounded-[1.25rem] px-5 py-2 border-2 border-white"
                style={{ background: '#ede9fe', boxShadow: '0 5px 0 0 rgba(0,0,0,0.09)' }}
              >
                <span>🛡️</span>
                <span className="text-lg font-black text-violet-700">Admin Panel</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-400 mt-2">Masuk sebagai administrator</p>
          </div>

          {/* Card */}
          <div
            className="rounded-[2rem] border-2 border-white bg-white p-6 md:p-8"
            style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.09), 0 16px 32px rgba(0,0,0,0.07)' }}
          >
            {/* Hint demo */}
            <div
              className="rounded-[1rem] border-2 border-white p-3 mb-5 text-center"
              style={{ background: '#ede9fe', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05)' }}
            >
              <p className="text-xs font-bold text-violet-600">Demo: admin@scanaja.id / admin123</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="clay-label">Email Admin</label>
                <input
                  type="email" name="email" required
                  placeholder="admin@scanaja.id"
                  value={form.email} onChange={handleChange}
                  className="clay-input"
                />
              </div>
              <div>
                <label className="clay-label">Password</label>
                <input
                  type="password" name="password" required
                  placeholder="Password admin"
                  value={form.password} onChange={handleChange}
                  className="clay-input"
                />
              </div>
              <button
                type="submit"
                className="clay-btn btn-glow text-white w-full mt-1"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
              >
                Masuk sebagai Admin
              </button>
            </form>
          </div>

          {/* Kembali — di bawah card */}
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
