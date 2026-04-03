import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Navbar from '../components/Navbar'
import WritingCharacter from '../components/WritingCharacter'
import BgAssets from '../components/BgAssets'
import Toast from '../components/Toast'
import LoadingScreen from '../components/LoadingScreen'
import useToast from '../hooks/useToast'

const JURUSAN_LIST = [
  'Akuntansi',
  'Manajemen',
  'Teknologi Informasi',
  'Teknik Informatika',
  'Sistem Informasi',
]

const ACARA_LIST = [
  { id: 'freshmen-year-2027', label: 'Freshmen Year 2027', icon: '🎤', desc: 'Penerimaan mahasiswa baru 2027' },
  { id: 'workshop-teknologi', label: 'Workshop Teknologi', icon: '💻', desc: 'Workshop & pelatihan teknologi' },
  { id: 'wisuda-2026', label: 'Wisuda 2026', icon: '🎓', desc: 'Upacara wisuda angkatan 2026' },
]

export default function Profile() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nama: '', email: '', jurusan: '', acara: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, toast, remove } = useToast()

  useEffect(() => {
    const userEmail = localStorage.getItem('scanaja_email')
    if (!userEmail) return
    getDoc(doc(db, 'profiles', userEmail)).then(snap => {
      if (snap.exists()) {
        setForm(snap.data())
        toast.info('Data ditemukan', 'Profilmu sudah terisi sebelumnya.')
      }
    })
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nama.trim()) { toast.error('Nama wajib diisi', 'Masukkan nama lengkapmu.'); return }
    if (!form.email.trim()) { toast.error('Email wajib diisi', 'Masukkan email kampusmu.'); return }
    if (!form.jurusan) { toast.error('Jurusan belum dipilih', 'Pilih jurusanmu terlebih dahulu.'); return }
    if (!form.acara) { toast.error('Acara belum dipilih', 'Pilih acara yang ingin kamu ikuti.'); return }

    setLoading(true)
    try {
      const userEmail = localStorage.getItem('scanaja_email') || 'guest'
      await setDoc(doc(db, 'profiles', userEmail), { ...form, updatedAt: Date.now() })
      toast.success('Data tersimpan!', 'QR Code siap dibuat untukmu.')
      setTimeout(() => navigate('/qrcode'), 800)
    } catch (err) {
      toast.error('Gagal menyimpan', err.message)
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-pastel-purple-bg">
      <BgAssets theme="yellow" />
      <Toast toasts={toasts} remove={remove} />
      {loading && <LoadingScreen message="Menyimpan data dirimu..." />}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="clay bg-white overflow-hidden">
            <div className="flex min-h-[560px]">

              {/* Panel kiri */}
              <div
                className="hidden md:flex flex-col justify-between w-80 shrink-0 p-10"
                style={{ background: 'linear-gradient(160deg, #c4b5fd 0%, #bae6fd 60%, #fbcfe8 100%)' }}
              >
                <div>
                  <span className="clay-badge bg-white text-violet-700 mb-6 inline-block">Data Diri</span>
                  <h2 className="text-3xl font-black text-gray-800 leading-snug mb-3">
                    Lengkapi<br />Profilmu
                  </h2>
                  <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                    Isi data dirimu untuk mendapatkan QR Code unik sebagai identitas absensi.
                  </p>
                </div>
                <div className="flex justify-center my-2">
                  <WritingCharacter />
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { n: '1', label: 'Isi form data diri' },
                    { n: '2', label: 'Dapatkan QR Code' },
                    { n: '3', label: 'Gunakan saat absen' },
                  ].map(({ n, label }) => (
                    <div key={n} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 border-2 border-white"
                        style={{ boxShadow: '0 3px 0 rgba(0,0,0,0.10)' }}
                      >
                        <span className="text-xs font-black text-violet-700">{n}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel kanan — form */}
              <div className="flex-1 p-10 flex flex-col justify-center">
                <h2 className="text-2xl font-black text-gray-800 mb-1 md:hidden">Isi Data Diri</h2>
                <p className="text-sm font-semibold text-gray-400 mb-8 md:hidden">Lengkapi profilmu untuk mendapatkan QR Code</p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="clay-label">Nama Lengkap</label>
                      <input
                        type="text" name="nama" required
                        placeholder="Nama sesuai KTM"
                        value={form.nama} onChange={handleChange}
                        className="clay-input"
                      />
                    </div>
                    <div>
                      <label className="clay-label">Email</label>
                      <input
                        type="email" name="email" required
                        placeholder="email@kampus.ac.id"
                        value={form.email} onChange={handleChange}
                        className="clay-input"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="clay-label">Jurusan</label>
                    <select
                      name="jurusan" required
                      value={form.jurusan} onChange={handleChange}
                      className="clay-input appearance-none"
                    >
                      <option value="" disabled>Pilih jurusan kamu</option>
                      {JURUSAN_LIST.map((j) => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                  </div>

                  {/* Pilih Acara */}
                  <div className="mb-8">
                    <label className="clay-label">Pilih Acara</label>
                    <select
                      name="acara" required
                      value={form.acara} onChange={handleChange}
                      className="clay-input appearance-none"
                    >
                      <option value="" disabled>Pilih acara yang ingin diikuti</option>
                      {ACARA_LIST.map((acara) => (
                        <option key={acara.id} value={acara.id}>
                          {acara.icon} {acara.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {form.nama && (
                    <div
                      className="rounded-[1.25rem] border-2 border-white bg-pastel-purple-bg p-4 mb-6 flex items-center gap-4"
                      style={{ boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.05)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-[1rem] bg-pastel-purple flex items-center justify-center shrink-0 border-2 border-white"
                        style={{ boxShadow: '0 4px 0 rgba(0,0,0,0.10)' }}
                      >
                        <span className="text-lg font-black text-violet-700">{form.nama[0]}</span>
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-700 text-sm">{form.nama}</p>
                        <p className="text-xs text-gray-400 font-semibold">{form.email || '—'}</p>
                        <p className="text-xs text-gray-400 font-semibold">{form.jurusan || '—'}</p>
                        <p className="text-xs text-gray-400 font-semibold">
                          {ACARA_LIST.find(a => a.id === form.acara)?.label || '—'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <button type="submit" className="clay-btn bg-pastel-yellow text-yellow-800 hover:brightness-95">
                      Simpan & Lihat QR Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ nama: '', email: '', jurusan: '', acara: '' })}
                      className="text-sm font-bold text-gray-300 hover:text-gray-400 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
