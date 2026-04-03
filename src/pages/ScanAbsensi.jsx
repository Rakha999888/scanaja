import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import BgAssets from '../components/BgAssets'
import LoadingScreen from '../components/LoadingScreen'

export default function ScanAbsensi() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [mode, setMode] = useState('idle') // idle | scanning | result
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('scanaja_admin')) navigate('/login/admin')
  }, [navigate])

  useEffect(() => {
    function handleClickOutside(e) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function saveAbsensi(data) {
    setLoading(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const q = query(
        collection(db, 'absensi'),
        where('email', '==', data.email),
        where('tanggal', '==', today)
      )
      const snap = await getDocs(q)
      if (!snap.empty) {
        setResult({ status: 'duplicate', data, message: 'Sudah absen hari ini.' })
        setMode('result')
        setLoading(false)
        return
      }
      await addDoc(collection(db, 'absensi'), {
        ...data,
        tanggal: today,
        waktu: new Date().toLocaleTimeString('id-ID'),
        timestamp: Date.now(),
      })
      setResult({ status: 'success', data })
      setMode('result')
    } catch (err) {
      setResult({ status: 'error', message: err.message })
      setMode('result')
    }
    setLoading(false)
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setResult(null)
    setLoading(true)
    let scanner
    try {
      scanner = new Html5Qrcode('qr-file-reader')
      const decoded = await scanner.scanFile(file, true)
      await scanner.clear()
      const data = JSON.parse(decoded)
      if (!data.nama || !data.email) throw new Error('QR tidak valid')
      await saveAbsensi(data)
    } catch {
      if (scanner) scanner.clear().catch(() => {})
      setResult({ status: 'error', message: 'Gagal membaca QR dari gambar. Pastikan gambar jelas dan merupakan QR ScanAja.' })
      setMode('result')
      setLoading(false)
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function reset() {
    setResult(null)
    setMode('idle')
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="purple" />
      {loading && <LoadingScreen message="Memproses absensi..." />}
      <div id="qr-file-reader" style={{ display: 'none' }} />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Navbar */}
        <nav className="w-full sticky top-0 z-40 px-4 pt-4 pb-2">
          <div
            ref={mobileMenuRef}
            className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-[1.75rem] border-2 border-white"
            style={{ boxShadow: '0 6px 0 0 rgba(0,0,0,0.08)' }}
          >
            <div className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="rounded-[1rem] px-3 py-1 text-xs font-extrabold border-2 border-white"
                  style={{ background: '#ede9fe', color: '#5b21b6', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
                >
                  📷 Scan
                </span>
                <span className="font-black text-violet-600 text-lg">ScanAja</span>
              </div>
              {/* Desktop menu */}
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/admin/kehadiran"
                  className="px-4 py-2 rounded-[1rem] text-sm font-extrabold border-2 border-white transition-all"
                  style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
                >
                  📋 Kehadiran
                </Link>
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-4 py-2 rounded-[1rem] text-sm font-extrabold text-gray-400 hover:bg-violet-50 hover:text-violet-500 transition-all border-2 border-transparent"
                >
                  ← Dashboard
                </button>
              </div>
              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileMenuOpen(v => !v)}
                className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-[0.875rem] border-2 border-white"
                style={{ background: '#ede9fe', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
              >
                <span className={`block w-5 h-0.5 bg-violet-600 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-violet-600 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-violet-600 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
            {/* Mobile dropdown */}
            {mobileMenuOpen && (
              <div className="sm:hidden border-t-2 border-gray-50 px-4 py-3 flex flex-col gap-2">
                <Link
                  to="/admin/kehadiran"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-[1rem] text-sm font-extrabold border-2 border-white"
                  style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
                >
                  📋 Dashboard Kehadiran
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/admin/dashboard') }}
                  className="flex items-center gap-2 px-4 py-3 rounded-[1rem] text-sm font-extrabold border-2 border-white"
                  style={{ background: '#f3f0ff', color: '#7c3aed', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
                >
                  👥 Dashboard Daftar
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-800">Scan Absensi</h1>
            <p className="text-sm font-semibold text-gray-400 mt-1">Scan QR Code mahasiswa untuk mencatat kehadiran</p>
          </div>

          {/* Area utama */}
          <div
            className="rounded-[2rem] border-2 border-white bg-white overflow-hidden mb-4"
            style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.07)' }}
          >
            <div className="p-6">
              {mode === 'idle' && (
                <div className="flex flex-col items-center py-8 gap-4">
                  <div
                    className="w-24 h-24 rounded-[1.5rem] flex items-center justify-center border-2 border-white"
                    style={{ background: '#ede9fe', boxShadow: '0 6px 0 rgba(0,0,0,0.09)' }}
                  >
                    <span className="text-4xl">📷</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-400 text-center">Kamera akan aktif untuk scan QR Code mahasiswa</p>
                  <button
                    onClick={() => setMode('scanning')}
                    className="clay-btn text-white px-8"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)' }}
                  >
                    Mulai Scan Kamera
                  </button>
                </div>
              )}

              {mode === 'scanning' && (
                <ScannerView
                  onSuccess={async (text) => {
                    setMode('idle')
                    try {
                      const data = JSON.parse(text)
                      if (!data.nama || !data.email) throw new Error('invalid')
                      await saveAbsensi(data)
                    } catch {
                      setResult({ status: 'error', message: 'QR Code tidak valid atau bukan dari ScanAja.' })
                      setMode('result')
                    }
                  }}
                  onStop={() => setMode('idle')}
                />
              )}

              {mode === 'result' && result && (
                <ResultCard result={result} onReset={reset} onScanAgain={() => { reset(); setMode('scanning') }} />
              )}
            </div>
          </div>

          {/* Upload file */}
          <div
            className="rounded-[2rem] border-2 border-white bg-white p-6"
            style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.07)' }}
          >
            <p className="text-sm font-black text-gray-700 mb-1">Upload Gambar QR</p>
            <p className="text-xs font-semibold text-gray-400 mb-4">Gunakan ini jika kamera tidak berfungsi</p>
            <label
              className="flex items-center gap-3 cursor-pointer rounded-[1.25rem] border-2 border-dashed border-violet-200 px-5 py-4 hover:bg-violet-50 transition-colors"
              style={{ background: '#faf8ff' }}
            >
              <span className="text-2xl">🖼️</span>
              <div>
                <p className="text-sm font-extrabold text-violet-600">Pilih gambar QR Code</p>
                <p className="text-xs font-semibold text-gray-400">PNG, JPG, JPEG</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScannerView({ onSuccess, onStop }) {
  const scannerRef = useRef(null)
  const calledRef = useRef(false)

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (text) => {
        if (calledRef.current) return
        calledRef.current = true
        scanner.stop().catch(() => {}).finally(() => onSuccess(text))
      },
      () => {}
    ).catch(() => onStop())

    return () => {
      scanner.isScanning && scanner.stop().catch(() => {})
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        id="qr-reader"
        className="w-full rounded-[1.25rem] overflow-hidden"
        style={{ maxWidth: '100%' }}
      />
      <button
        onClick={() => {
          scannerRef.current?.isScanning && scannerRef.current.stop().catch(() => {})
          onStop()
        }}
        className="text-sm font-bold text-gray-400 hover:text-red-400 transition-colors"
      >
        Hentikan Scan
      </button>
    </div>
  )
}

function ResultCard({ result, onReset, onScanAgain }) {
  const isSuccess = result.status === 'success'
  const isDuplicate = result.status === 'duplicate'
  const cfg = isSuccess
    ? { bg: '#d1fae5', text: '#065f46', icon: '✅', title: 'Absensi Berhasil!' }
    : isDuplicate
    ? { bg: '#fef9c3', text: '#92400e', icon: '⚠️', title: 'Sudah Absen Hari Ini' }
    : { bg: '#fee2e2', text: '#991b1b', icon: '❌', title: 'Gagal' }

  return (
    <div className="flex flex-col items-center py-6 gap-4">
      <div
        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center border-2 border-white"
        style={{ background: cfg.bg, boxShadow: '0 6px 0 rgba(0,0,0,0.09)' }}
      >
        <span className="text-4xl">{cfg.icon}</span>
      </div>
      <div className="text-center">
        <p className="font-black text-gray-800 text-lg">{cfg.title}</p>
        {result.data && (
          <div className="mt-2 space-y-0.5">
            <p className="text-sm font-extrabold text-gray-700">{result.data.nama}</p>
            <p className="text-xs font-semibold text-gray-400">{result.data.email}</p>
            <p className="text-xs font-semibold text-gray-400">{result.data.jurusan}</p>
          </div>
        )}
        {result.message && (
          <p className="text-xs font-semibold mt-2" style={{ color: cfg.text }}>{result.message}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          onClick={onScanAgain}
          className="clay-btn text-white px-6 text-sm w-full sm:w-auto"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)' }}
        >
          Scan Lagi
        </button>
        <button onClick={onReset} className="clay-btn bg-gray-100 text-gray-500 px-6 text-sm w-full sm:w-auto">
          Reset
        </button>
      </div>
    </div>
  )
}
