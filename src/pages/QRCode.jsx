import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { QRCodeCanvas } from 'qrcode.react'
import { db } from '../firebase'
import Navbar from '../components/Navbar'
import BgAssets from '../components/BgAssets'

export default function QRCodePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const email = localStorage.getItem('scanaja_email')
    if (!email) { navigate('/profile'); return }
    getDoc(doc(db, 'profiles', email)).then(snap => {
      if (!snap.exists()) navigate('/profile')
      else setProfile(snap.data())
    })
  }, [navigate])

  function handleDownload() {
    const canvas = document.querySelector('#qr-canvas canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `scanaja-${profile.nama.replace(/\s+/g, '-').toLowerCase()}.png`
    a.click()
  }

  function handleReset() {
    localStorage.removeItem('scanaja_email')
    navigate('/login/user')
  }

  if (!profile) return null

  return (
    <div className="relative min-h-screen bg-pastel-purple-bg">
      <BgAssets theme="blue" />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <div className="max-w-sm mx-auto px-4 py-10">
          <div className="clay bg-white p-8 text-center">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-extrabold border-2 border-white bg-pastel-blue text-blue-700 mb-5"
              style={{ boxShadow: '0 3px 0 0 rgba(0,0,0,0.10)' }}
            >
              QR Code Absensi
            </span>

            <h2 className="text-xl font-black text-gray-800 mb-1">{profile.nama}</h2>
            <p className="text-sm font-semibold text-gray-400 mb-1">{profile.email}</p>
            <p className="text-xs font-bold text-gray-300 mb-6">{profile.jurusan}</p>

            <div
              id="qr-canvas"
              className="flex justify-center mb-6 p-5 rounded-[1.75rem] border-2 border-white"
              style={{ background: '#ede9fe', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.07)' }}
            >
              <QRCodeCanvas
                value={JSON.stringify({ nama: profile.nama, email: profile.email, jurusan: profile.jurusan })}
                size={180}
                bgColor="transparent"
                fgColor="#5b21b6"
                level="H"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={handleDownload} className="clay-btn bg-pastel-purple text-violet-800 w-full hover:brightness-95">
                Unduh QR Code
              </button>
              <Link to="/profile" className="clay-btn bg-pastel-yellow text-yellow-800 block w-full hover:brightness-95">
                Edit Data Diri
              </Link>
              <button onClick={handleReset} className="text-xs font-bold text-gray-300 hover:text-red-400 mt-1 transition-colors">
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
