import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('scanaja_email')
  const [open, setOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem('scanaja_email')
    localStorage.removeItem('scanaja_profile')
    setOpen(false)
    navigate('/login')
  }

  const userLinks = [
    { to: '/', label: 'Home', bg: '#cffafe', text: '#0e7490' },
    { to: '/profile', label: 'Data Diri', bg: '#fde68a', text: '#92400e' },
    { to: '/qrcode', label: 'QR Code', bg: '#bae6fd', text: '#0369a1' },
  ]
  const guestLinks = [
    { to: '/', label: 'Home', bg: '#cffafe', text: '#0e7490' },
    { to: '/login', label: 'Masuk', bg: '#a5f3fc', text: '#0891b2' },
  ]
  const links = isLoggedIn ? userLinks : guestLinks

  return (
    <nav className="w-full sticky top-0 z-50 px-3 pt-3 pb-2">
      <div
        className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between bg-white/90 backdrop-blur-md rounded-[1.5rem] border-2 border-white"
        style={{ boxShadow: '0 6px 0 0 rgba(0,0,0,0.08)' }}
      >
        <Link to="/" onClick={() => setOpen(false)}>
          <span className="font-black text-cyan-600 text-lg tracking-tight">ScanAja</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {links.map(({ to, label, bg, text }) => (
            <NavLink key={to} to={to} label={label} active={pathname === to} bg={bg} text={text} />
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-[1rem] text-sm font-extrabold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border-2 border-transparent"
            >
              Keluar
            </button>
          ) : (
            <Link
              to="/register"
              className="clay-btn text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)', boxShadow: '0 4px 0 rgba(109,40,217,0.35)' }}
            >
              Daftar
            </Link>
          )}
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden w-9 h-9 rounded-[0.75rem] flex flex-col items-center justify-center gap-1.5 border-2 border-white"
          style={{ background: '#ede9fe', boxShadow: '0 3px 0 rgba(0,0,0,0.09)' }}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span className={`block w-4 h-0.5 bg-violet-600 rounded transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-4 h-0.5 bg-violet-600 rounded transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-0.5 bg-violet-600 rounded transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div
          className="md:hidden max-w-6xl mx-auto mt-2 rounded-[1.5rem] border-2 border-white bg-white/95 backdrop-blur-md p-4 flex flex-col gap-2"
          style={{ boxShadow: '0 8px 0 0 rgba(0,0,0,0.08)' }}
        >
          {links.map(({ to, label, bg, text }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="rounded-[1rem] px-4 py-3 text-sm font-extrabold transition-all border-2 border-white"
              style={pathname === to
                ? { background: bg, color: text, boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }
                : { color: '#6b7280' }
              }
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-[1rem] px-4 py-3 text-sm font-extrabold text-red-400 hover:bg-red-50 transition-all text-left border-2 border-transparent"
            >
              Keluar
            </button>
          ) : (
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="clay-btn text-white text-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)' }}
            >
              Daftar
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

function NavLink({ to, label, active, bg, text }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-[1rem] text-sm font-extrabold transition-all border-2"
      style={active
        ? { background: bg, color: text, borderColor: 'white', boxShadow: '0 4px 0 0 rgba(0,0,0,0.09)' }
        : { color: '#9ca3af', borderColor: 'transparent' }
      }
    >
      {label}
    </Link>
  )
}
