import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BgAssets from '../components/BgAssets'

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-pastel-purple-bg">
      <BgAssets theme="pink" />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <div className="max-w-sm mx-auto px-4 py-20 text-center">
          <div className="clay bg-white p-10">
            <div
              className="text-7xl font-black mb-4 rounded-[1.5rem] py-4 bg-pastel-pink border-2 border-white"
              style={{ boxShadow: '0 6px 0 0 rgba(0,0,0,0.10)', color: '#be185d' }}
            >
              404
            </div>
            <h2 className="text-xl font-black text-gray-800 mb-2 mt-5">Halaman Tidak Ditemukan</h2>
            <p className="text-sm font-semibold text-gray-400 mb-8 leading-relaxed">
              Halaman yang kamu cari tidak ada atau sudah dipindahkan.
            </p>
            <Link to="/" className="clay-btn bg-pastel-purple text-violet-800 inline-block hover:brightness-95">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
