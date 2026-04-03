import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import BgAssets from '../components/BgAssets'

const JURUSAN_LIST = [
  'Akuntansi',
  'Manajemen',
  'Teknologi Informasi',
  'Teknik Informatika',
  'Sistem Informasi',
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([])
  const [filterJurusan, setFilterJurusan] = useState('Semua')
  const [editTarget, setEditTarget] = useState(null)   // { id, nama, email, jurusan }
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, nama }
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('scanaja_admin')) {
      navigate('/login/admin')
      return
    }
    const unsub = onSnapshot(collection(db, 'profiles'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setProfiles(data)
    })
    return () => unsub()
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('scanaja_admin')
    navigate('/login/admin')
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await deleteDoc(doc(db, 'profiles', deleteTarget.id))
    setDeleteTarget(null)
  }

  async function handleSaveEdit(e) {
    e.preventDefault()
    setSaving(true)
    await updateDoc(doc(db, 'profiles', editTarget.id), {
      nama: editTarget.nama,
      email: editTarget.email,
      jurusan: editTarget.jurusan,
    })
    setSaving(false)
    setEditTarget(null)
  }

  const jurusanList = ['Semua', ...Array.from(new Set(profiles.map(p => p.jurusan).filter(Boolean)))]
  const filtered = filterJurusan === 'Semua' ? profiles : profiles.filter(p => p.jurusan === filterJurusan)

  const stats = [
    { label: 'Total Mahasiswa', value: profiles.length, bg: '#c4b5fd', text: '#5b21b6' },
    { label: 'Profil Lengkap', value: profiles.filter(p => p.nama).length, bg: '#a7f3d0', text: '#065f46' },
    { label: 'Belum Lengkap', value: profiles.filter(p => !p.nama).length, bg: '#fde68a', text: '#92400e' },
  ]

  return (
    <div className="relative min-h-screen" style={{ background: '#f0ebff' }}>
      <BgAssets theme="purple" />

      {/* Modal Edit */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.35)' }}>
          <div className="w-full max-w-md rounded-[2rem] bg-white border-2 border-white p-8" style={{ boxShadow: '0 16px 0 0 rgba(0,0,0,0.10)' }}>
            <h3 className="text-xl font-black text-gray-800 mb-1">Edit Data Mahasiswa</h3>
            <p className="text-xs font-semibold text-gray-400 mb-6">Perubahan langsung tersimpan ke database</p>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <div>
                <label className="clay-label">Nama Lengkap</label>
                <input
                  className="clay-input" type="text" required
                  value={editTarget.nama}
                  onChange={e => setEditTarget({ ...editTarget, nama: e.target.value })}
                />
              </div>
              <div>
                <label className="clay-label">Email</label>
                <input
                  className="clay-input" type="email" required
                  value={editTarget.email}
                  onChange={e => setEditTarget({ ...editTarget, email: e.target.value })}
                />
              </div>
              <div>
                <label className="clay-label">Jurusan</label>
                <select
                  className="clay-input appearance-none" required
                  value={editTarget.jurusan}
                  onChange={e => setEditTarget({ ...editTarget, jurusan: e.target.value })}
                >
                  <option value="" disabled>Pilih jurusan</option>
                  {JURUSAN_LIST.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  type="submit" disabled={saving}
                  className="clay-btn text-white flex-1"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)' }}
                >
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  className="clay-btn bg-gray-100 text-gray-500 flex-1"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.35)' }}>
          <div className="w-full max-w-sm rounded-[2rem] bg-white border-2 border-white p-8 text-center" style={{ boxShadow: '0 16px 0 0 rgba(0,0,0,0.10)' }}>
            <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center mx-auto mb-4 border-2 border-white" style={{ background: '#fee2e2', boxShadow: '0 4px 0 rgba(0,0,0,0.08)' }}>
              <span className="text-3xl">🗑️</span>
            </div>
            <h3 className="text-lg font-black text-gray-800 mb-1">Hapus Data?</h3>
            <p className="text-sm font-semibold text-gray-400 mb-6">
              Data <span className="font-extrabold text-gray-700">{deleteTarget.nama || deleteTarget.id}</span> akan dihapus permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="clay-btn flex-1 text-white"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                Hapus
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="clay-btn bg-gray-100 text-gray-500 flex-1"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative" style={{ zIndex: 1 }}>
        <nav className="w-full sticky top-0 z-40 px-4 pt-4 pb-2">
          <div
            className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between bg-white/90 backdrop-blur-md rounded-[1.75rem] border-2 border-white"
            style={{ boxShadow: '0 6px 0 0 rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="rounded-[1rem] px-3 py-1 text-xs font-extrabold border-2 border-white"
                style={{ background: '#ede9fe', color: '#5b21b6', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
              >
                🛡️ Admin
              </span>
              <span className="font-black text-violet-600 text-lg">ScanAja</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admin/scan"
                className="px-4 py-2 rounded-[1rem] text-sm font-extrabold border-2 border-white transition-all"
                style={{ background: '#ede9fe', color: '#5b21b6', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
              >
                📷 Scan Absensi
              </Link>
              <Link
                to="/admin/kehadiran"
                className="px-4 py-2 rounded-[1rem] text-sm font-extrabold border-2 border-white transition-all"
                style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}
              >
                📋 Kehadiran
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-[1rem] text-sm font-extrabold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border-2 border-transparent"
              >
                Keluar
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-800">Dashboard Daftar</h1>
            <p className="text-sm font-semibold text-gray-400 mt-1">Kelola data mahasiswa ScanAja</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map(({ label, value, bg, text }) => (
              <div
                key={label}
                className="rounded-[1.75rem] border-2 border-white text-center py-7 px-4"
                style={{ background: bg, boxShadow: '0 8px 0 0 rgba(0,0,0,0.09)' }}
              >
                <p className="text-4xl font-black" style={{ color: text }}>{value}</p>
                <p className="text-xs font-bold text-gray-500 mt-1.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border-2 border-white bg-white overflow-hidden" style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.07)' }}>
            <div className="px-5 md:px-8 py-5 border-b-2 border-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-gray-800">Daftar Mahasiswa</h2>
                <p className="text-xs font-semibold text-gray-400 mt-0.5">{filtered.length} dari {profiles.length} akun terdaftar</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {jurusanList.map(j => (
                  <button
                    key={j}
                    onClick={() => setFilterJurusan(j)}
                    className="px-3 py-1.5 rounded-[0.75rem] text-xs font-extrabold border-2 border-white transition-all"
                    style={filterJurusan === j
                      ? { background: '#7c3aed', color: '#fff', boxShadow: '0 3px 0 rgba(0,0,0,0.15)' }
                      : { background: '#f3f0ff', color: '#7c3aed', boxShadow: '0 2px 0 rgba(0,0,0,0.07)' }
                    }
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            {profiles.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm font-bold text-gray-400">Belum ada mahasiswa terdaftar</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr style={{ background: '#f9f7ff' }}>
                      <th className="text-left px-5 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide">No</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide">Nama</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Email</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide hidden md:table-cell">Jurusan</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wide">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(({ id, nama, email, jurusan }, i) => (
                      <tr key={id} className="border-t border-gray-50 hover:bg-violet-50/40 transition-colors">
                        <td className="px-5 py-4 text-sm font-bold text-gray-400">{i + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-[0.75rem] flex items-center justify-center text-sm font-black border-2 border-white shrink-0" style={{ background: '#ede9fe', color: '#7c3aed', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}>
                              {nama ? nama[0] : '?'}
                            </div>
                            <span className="text-sm font-extrabold text-gray-700">{nama || '-'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-500 hidden sm:table-cell">{email || id}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-500 hidden md:table-cell">{jurusan || '-'}</td>
                        <td className="px-4 py-4">
                          <span
                            className="inline-block rounded-full px-3 py-1 text-xs font-extrabold border-2 border-white"
                            style={nama
                              ? { background: '#d1fae5', color: '#065f46', boxShadow: '0 2px 0 rgba(0,0,0,0.07)' }
                              : { background: '#fef9c3', color: '#92400e', boxShadow: '0 2px 0 rgba(0,0,0,0.07)' }
                            }
                          >
                            {nama ? 'Lengkap' : 'Belum lengkap'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditTarget({ id, nama: nama || '', email: email || id, jurusan: jurusan || '' })}
                              className="px-3 py-1.5 rounded-[0.75rem] text-xs font-extrabold border-2 border-white transition-all hover:brightness-95"
                              style={{ background: '#ede9fe', color: '#7c3aed', boxShadow: '0 2px 0 rgba(0,0,0,0.08)' }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ id, nama })}
                              className="px-3 py-1.5 rounded-[0.75rem] text-xs font-extrabold border-2 border-white transition-all hover:brightness-95"
                              style={{ background: '#fee2e2', color: '#dc2626', boxShadow: '0 2px 0 rgba(0,0,0,0.08)' }}
                            >
                              🗑️ Hapus
                            </button>
                          </div>
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
