import { Link } from 'react-router-dom'
import BgAssets from '../components/BgAssets'

export default function LoginSelect() {
  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="purple" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12" style={{ zIndex: 1 }}>
        <div className="w-full max-w-md">

          <div className="text-center mb-10">
            <Link to="/">
              <span
                className="inline-block rounded-[1.25rem] px-6 py-2 text-2xl font-black text-violet-700 border-2 border-white"
                style={{ background: '#ede9fe', boxShadow: '0 6px 0 0 rgba(0,0,0,0.09)' }}
              >
                ScanAja
              </span>
            </Link>
            <p className="text-sm font-semibold text-gray-400 mt-3">Masuk sebagai siapa?</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Admin */}
            <Link
              to="/login/admin"
              className="group rounded-[2rem] border-2 border-white bg-white p-7 flex items-center gap-5 transition-all hover:-translate-y-1"
              style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.09), 0 16px 32px rgba(0,0,0,0.07)' }}
            >
              <div
                className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center shrink-0 border-2 border-white text-2xl"
                style={{ background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)', boxShadow: '0 5px 0 rgba(124,58,237,0.25)' }}
              >
                🛡️
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-800 text-lg">Admin</p>
                <p className="text-sm font-semibold text-gray-400 mt-0.5">Kelola data mahasiswa & absensi</p>
              </div>
              <span className="text-gray-300 text-xl group-hover:text-violet-400 transition-colors">→</span>
            </Link>

            {/* User */}
            <Link
              to="/login/user"
              className="group rounded-[2rem] border-2 border-white bg-white p-7 flex items-center gap-5 transition-all hover:-translate-y-1"
              style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.09), 0 16px 32px rgba(0,0,0,0.07)' }}
            >
              <div
                className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center shrink-0 border-2 border-white text-2xl"
                style={{ background: 'linear-gradient(135deg, #fbcfe8, #f9a8d4)', boxShadow: '0 5px 0 rgba(219,39,119,0.20)' }}
              >
                🎓
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-800 text-lg">Mahasiswa</p>
                <p className="text-sm font-semibold text-gray-400 mt-0.5">Isi data diri & dapatkan QR Code</p>
              </div>
              <span className="text-gray-300 text-xl group-hover:text-pink-400 transition-colors">→</span>
            </Link>
          </div>

          <p className="text-center mt-8 text-xs font-bold text-gray-300">
            ScanAja &copy; 2026 — by rakhakbr
          </p>
        </div>
      </div>
    </div>
  )
}
