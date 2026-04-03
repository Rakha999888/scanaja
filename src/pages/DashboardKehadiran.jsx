import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import BgAssets from '../components/BgAssets'
import LoadingScreen from '../components/LoadingScreen'

const ACARA_LIST = [
  { id: 'freshmen-year-2027', label: 'Freshmen Year 2027' },
  { id: 'workshop-teknologi', label: 'Workshop Teknologi' },
  { id: 'wisuda-2026', label: 'Wisuda 2026' },
]

export default function DashboardKehadiran() {
  const navigate = useNavigate()
  const [absensi, setAbsensi] = useState([])
  const [loadingInit, setLoadingInit] = useState(true)
  const [filterTanggal, setFilterTanggal] = useState('')
  const [filterAcara, setFilterAcara] = useState('Semua')

  useEffect(() => {
    if (!localStorage.getItem('scanaja_admin')) {
      navigate('/login/admin')
      return
    }
    const q = query(collection(db, 'absensi'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setAbsensi(data)
      setLoadingInit(false)
    })
    return () => unsub()
  }, [navigate])

  const today = new Date().toISOString().split('T')[0]
  const activeTanggal = filterTanggal || today

  let filtered = absensi.filter(a => a.tanggal === activeTanggal)
  if (filterAcara !== 'Semua') filtered = filtered.filter(a => a.acara === filterAcara)

  const getAcaraLabel = (id) => ACARA_LIST.find(a => a.id === id)?.label || id || '-'

  // Daftar tanggal unik untuk filter
  const tanggalList = [...new Set(absensi.map(a => a.tanggal))].sort((a, b) => b.localeCompare(a))

  if (loadingInit) return <LoadingScreen message="Memuat data kehadiran..." />

  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="purple" />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Navbar */}
        <nav className="w-full sticky top-0 z-40 px-4 pt-4 pb-2">
          <div
            className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between bg-white/90 backdrop-blur-md rounded-[1.75rem] border-2 border-white"
            style={{ boxShadow: '0 6px 0 0 rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="rounded-[1rem] px-3 py-1 text-xs font-extrabold border-2 border-white"
                style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
              >
                📋 Kehadiran
              </span>
              <span className="font-black text-violet-600 text-lg">ScanAja</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/admin/scan" className="px-4 py-2 rounded-[1rem] text-sm font-extrabold border-2 border-white transition-all"
                style={{ background: '#ede9fe', color: '#5b21b6', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}>
                📷 Scan
              </Link>
              {/* Dropdown Dashboard */}
              <div className="relative group">
                <button className="px-4 py-2 rounded-[1rem] text-sm font-extrabold border-2 border-white transition-all flex items-center gap-1"
                  style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}>
                  📊 Dashboard <span className="text-xs">▾</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-52 rounded-[1.25rem] bg-white border-2 border-white overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                  style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.09)' }}>
                  <Link to="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-extrabold text-violet-700 hover:bg-violet-50 transition-colors">
                    👥 Dashboard Daftar
                  </Link>
                  <div className="border-t border-gray-50" />
                  <Link to="/admin/kehadiran"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-extrabold text-emerald-700 hover:bg-emerald-50 transition-colors">
                    📋 Dashboard Kehadiran
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-gray-800">Dashboard Kehadiran</h1>
            <p className="text-sm font-semibold text-gray-400 mt-1">Data absensi yang daftar masuk secara real-time</p>
          </div>

          {/* Stats hari ini */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Hadir Hari Ini', value: absensi.filter(a => a.tanggal === today).length, bg: '#d1fae5', text: '#065f46' },
              { label: 'Total Semua Hari', value: absensi.length, bg: '#c4b5fd', text: '#5b21b6' },
              { label: 'Hari Aktif', value: tanggalList.length, bg: '#bae6fd', text: '#0369a1' },
              { label: 'Ditampilkan', value: filtered.length, bg: '#fde68a', text: '#92400e' },
            ].map(({ label, value, bg, text }) => (
              <div
                key={label}
                className="rounded-[1.75rem] border-2 border-white text-center py-6 px-4"
                style={{ background: bg, boxShadow: '0 8px 0 0 rgba(0,0,0,0.09)' }}
              >
                <p className="text-3xl font-black" style={{ color: text }}>{value}</p>
                <p className="text-xs font-bold text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Tabel */}
          <div className="rounded-[2rem] border-2 border-white bg-white overflow-hidden" style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.07)' }}>
            <div className="px-5 md:px-8 py-5 border-b-2 border-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-gray-800">Daftar Kehadiran</h2>
                <p className="text-xs font-semibold text-gray-400 mt-0.5">
                  {filtered.length} mahasiswa hadir pada {activeTanggal}
                </p>
              </div>
              {/* Filter dropdown */}
              <div className="flex flex-wrap gap-2 items-center">
                <select
                  value={activeTanggal}
                  onChange={e => setFilterTanggal(e.target.value)}
                  className="appearance-none rounded-[0.875rem] border-2 border-white px-3 py-1.5 text-xs font-extrabold text-emerald-700 cursor-pointer"
                  style={{ background: '#d1fae5', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
                >
                  {tanggalList.length === 0 && <option value={today}>Hari Ini</option>}
                  {tanggalList.map(t => (
                    <option key={t} value={t}>{t === today ? `Hari Ini (${t})` : t}</option>
                  ))}
                </select>
                <select
                  value={filterAcara}
                  onChange={e => setFilterAcara(e.target.value)}
                  className="appearance-none rounded-[0.875rem] border-2 border-white px-3 py-1.5 text-xs font-extrabold text-emerald-700 cursor-pointer"
                  style={{ background: '#d1fae5', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
                >
                  <option value="Semua">Semua Acara</option>
                  {ACARA_LIST.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm font-bold text-gray-400">Belum ada kehadiran pada tanggal ini</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr style={{ background: '#f0fdf4' }}>
                      <th className="text-left px-5 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide">No</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide">Nama</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Email</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide hidden md:table-cell">Jurusan</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide hidden md:table-cell">Acara</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(({ id, nama, email, jurusan, acara, waktu }, i) => (
                      <tr key={id} className="border-t border-gray-50 hover:bg-green-50/40 transition-colors">
                        <td className="px-5 py-4 text-sm font-bold text-gray-400">{i + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-[0.75rem] flex items-center justify-center text-sm font-black border-2 border-white shrink-0"
                              style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
                            >
                              {nama ? nama[0] : '?'}
                            </div>
                            <span className="text-sm font-extrabold text-gray-700">{nama || '-'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-500 hidden sm:table-cell">{email || '-'}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-500 hidden md:table-cell">{jurusan || '-'}</td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          {acara ? (
                            <span
                              className="inline-block rounded-full px-3 py-1 text-xs font-extrabold border-2 border-white"
                              style={{ background: '#ede9fe', color: '#5b21b6', boxShadow: '0 2px 0 rgba(0,0,0,0.07)' }}
                            >
                              {getAcaraLabel(acara)}
                            </span>
                          ) : <span className="text-xs text-gray-300 font-bold">-</span>}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className="inline-block rounded-full px-3 py-1 text-xs font-extrabold border-2 border-white"
                            style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 2px 0 rgba(0,0,0,0.07)' }}
                          >
                            {waktu || '-'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
