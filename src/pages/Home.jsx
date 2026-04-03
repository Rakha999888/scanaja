import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ClayCharacter from '../components/ClayCharacter'
import BgAssets from '../components/BgAssets'
import Particles from '../components/Particles'
import useScrollReveal from '../hooks/useScrollReveal'
import useTilt from '../hooks/useTilt'

const stats = [
  { label: 'Mahasiswa Terdaftar', value: '1.240+', bg: '#a5f3fc', text: '#0e7490' },
  { label: 'Sesi Absensi', value: '3.580+', bg: '#bae6fd', text: '#0369a1' },
  { label: 'Jurusan Aktif', value: '5', bg: '#fde68a', text: '#92400e' },
  { label: 'Tingkat Akurasi', value: '99%', bg: '#a7f3d0', text: '#065f46' },
]

const steps = [
  { step: '01', title: 'Isi Data Diri', desc: 'Masukkan nama, email, dan jurusanmu dalam satu form singkat.', bg: '#cffafe', accent: '#0891b2' },
  { step: '02', title: 'Dapat QR Code', desc: 'QR Code unik otomatis dibuat sebagai identitas absensimu.', bg: '#d1fae5', accent: '#059669' },
  { step: '03', title: 'Scan & Absen', desc: 'Tunjukkan QR Code ke dosen atau alat scanner di kelasmu.', bg: '#e0f2fe', accent: '#0284c7' },
]

const testimonials = [
  { nama: 'Rina Aulia', jurusan: 'Teknik Informatika', pesan: 'ScanAja bikin absensi jadi super cepat, tinggal scan QR dan selesai!', bg: '#a5f3fc', accent: '#0891b2' },
  { nama: 'Budi Santoso', jurusan: 'Sistem Informasi', pesan: 'Tampilannya bersih dan mudah dipakai, tidak perlu bingung sama sekali.', bg: '#bae6fd', accent: '#0284c7' },
  { nama: 'Citra Dewi', jurusan: 'Manajemen', pesan: 'QR Code-nya unik per mahasiswa, jadi tidak bisa titip absen lagi hehe.', bg: '#fef9c3', accent: '#ca8a04' },
]

function StepCard({ step, title, desc, bg, accent, delay }) {
  const tilt = useTilt(7)
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} ${visible ? 'visible' : ''}`}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="tilt-card rounded-[1.5rem] border-2 border-white p-7 h-full cursor-default"
        style={{ background: bg, boxShadow: '0 6px 0 0 rgba(0,0,0,0.08)' }}
      >
        <div
          className="w-12 h-12 rounded-[1rem] flex items-center justify-center mb-5 border-2 border-white text-base font-black"
          style={{ background: 'white', color: accent, boxShadow: `0 4px 0 0 ${accent}40` }}
        >
          {step}
        </div>
        <h3 className="font-black text-lg mb-2" style={{ color: accent }}>{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function TestiCard({ nama, jurusan, pesan, bg, accent, delay }) {
  const tilt = useTilt(5)
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} ${visible ? 'visible' : ''}`}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="tilt-card rounded-[1.75rem] border-2 border-white bg-white p-7 h-full cursor-default flex flex-col justify-between"
        style={{ boxShadow: '0 8px 0 0 rgba(0,0,0,0.07)' }}
      >
        <div>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl font-black mb-5 border-2 border-white"
            style={{ background: bg, color: accent, boxShadow: `0 3px 0 ${accent}30` }}
          >"</div>
          <p className="text-sm text-gray-600 leading-relaxed">{pesan}</p>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
          <div
            className="w-10 h-10 rounded-[0.875rem] flex items-center justify-center font-black border-2 border-white shrink-0"
            style={{ background: bg, color: accent, boxShadow: `0 3px 0 ${accent}30` }}
          >{nama[0]}</div>
          <div>
            <p className="text-sm font-extrabold text-gray-700">{nama}</p>
            <p className="text-xs text-gray-400 font-semibold">{jurusan}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [heroRef, heroVisible] = useScrollReveal()
  const [statsRef, statsVisible] = useScrollReveal()
  const [stepsRef, stepsVisible] = useScrollReveal()
  const [testiRef, testiVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  return (
    <div className="relative min-h-screen" style={{ background: '#ecfeff' }}>
      <BgAssets />
      <Particles count={14} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />

        {/* ── HERO — full width, dua kolom ── */}
        <section className="max-w-6xl mx-auto px-4 pt-6 pb-4">
          <div
            ref={heroRef}
            className={`reveal ${heroVisible ? 'visible' : ''} relative rounded-[2rem] md:rounded-[3rem] border-2 border-white overflow-hidden`}
            style={{
              background: 'linear-gradient(135deg, #a5f3fc 0%, #67e8f9 30%, #38bdf8 65%, #bae6fd 100%)',
              boxShadow: '0 14px 0 0 rgba(0,0,0,0.09), 0 24px 48px rgba(0,0,0,0.08)',
            }}
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/25" style={{ filter: 'blur(50px)' }} />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20" style={{ filter: 'blur(40px)' }} />

            <div className="relative grid md:grid-cols-2 items-center gap-0 px-6 md:px-16 py-10 md:py-16">
              {/* Kiri — teks */}
              <div className="text-center md:text-left">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold border-2 border-white mb-5"
                  style={{ background: 'rgba(255,255,255,0.50)', color: '#0e7490', backdropFilter: 'blur(10px)', boxShadow: '0 3px 0 rgba(0,0,0,0.07)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" style={{ animation: 'glowPulse 2s infinite' }} />
                  Absensi Digital Kampus
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-[1.1] mb-5 tracking-tight">
                  Absensi<br />
                  <span className="shimmer-text">Lebih Mudah</span><br />
                  <span className="text-gray-700">dengan QR</span>
                </h1>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                  Daftarkan dirimu, dapatkan QR Code unik, dan gunakan sebagai identitas absensi di setiap kelas.
                </p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link to="/register" className="clay-btn btn-glow text-white" style={{ background: 'linear-gradient(135deg, #0891b2, #0284c7)' }}>
                    Mulai Sekarang
                  </Link>
                  <a href="#cara-kerja" className="clay-btn text-cyan-700" style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(10px)', boxShadow: '0 5px 0 0 rgba(0,0,0,0.07)' }}>
                    Cara Kerja
                  </a>
                </div>
              </div>

              {/* Kanan — karakter, hanya desktop */}
              <div className="hidden md:flex flex-col items-center justify-center gap-4">
                <ClayCharacter />
                <div
                  className="rounded-[1.25rem] border-2 border-white px-5 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 0 rgba(0,0,0,0.07)' }}
                >
                  <p className="text-sm font-extrabold text-cyan-600">Hei, scan QR-mu yuk!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={statsRef}
          className={`reveal ${statsVisible ? 'visible' : ''} max-w-6xl mx-auto px-4 py-4`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(({ label, value, bg, text }, i) => {
              const tilt = useTilt(6)
              return (
                <div
                  key={label}
                  ref={tilt.ref}
                  onMouseMove={tilt.onMouseMove}
                  onMouseLeave={tilt.onMouseLeave}
                  className="tilt-card rounded-[1.5rem] border-2 border-white text-center py-6 px-3 cursor-default"
                  style={{ background: bg, boxShadow: '0 6px 0 0 rgba(0,0,0,0.09)' }}
                >
                  <p className="text-2xl md:text-3xl font-black" style={{ color: text }}>{value}</p>
                  <p className="text-xs font-bold text-gray-500 mt-1">{label}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="cara-kerja" className="max-w-6xl mx-auto px-4 py-4">
          <div
            ref={stepsRef}
            className={`reveal ${stepsVisible ? 'visible' : ''} rounded-[2rem] border-2 border-white bg-white`}
            style={{ boxShadow: '0 10px 0 0 rgba(0,0,0,0.07)', overflow: 'hidden' }}
          >
            <div className="px-6 md:px-10 py-6 md:py-8 border-b-2 border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block rounded-full px-4 py-1 text-xs font-extrabold border-2 border-white mb-3" style={{ background: '#d1fae5', color: '#065f46', boxShadow: '0 3px 0 rgba(0,0,0,0.07)' }}>
                  Cara Kerja
                </span>
                <h2 className="text-xl md:text-2xl font-black text-gray-800">Tiga Langkah Mudah</h2>
                <p className="text-sm text-gray-400 font-semibold mt-1">Dari daftar sampai absen, semua dalam hitungan menit.</p>
              </div>
              <Link to="/register" className="clay-btn text-white self-start md:self-auto shrink-0" style={{ background: 'linear-gradient(135deg, #0891b2, #0284c7)', boxShadow: '0 5px 0 rgba(8,145,178,0.35)' }}>
                Coba Sekarang
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 md:p-8">
              {steps.map((s, i) => <StepCard key={s.step} {...s} delay={i + 1} />)}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-4">
          {(() => {
            const [ref, visible] = useScrollReveal()
            return (
              <div ref={ref} className={`reveal ${visible ? 'visible' : ''} grid grid-cols-1 md:grid-cols-5 gap-4`}>
                <div className="md:col-span-3 rounded-[2rem] border-2 border-white p-7 md:p-10 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)', boxShadow: '0 8px 0 0 rgba(0,0,0,0.08)', minHeight: 220 }}>
                  <div>
                    <span className="inline-block rounded-full px-4 py-1 text-xs font-extrabold border-2 border-white mb-4" style={{ background: 'white', color: '#0891b2', boxShadow: '0 3px 0 rgba(0,0,0,0.07)' }}>Keunggulan</span>
                    <h3 className="text-xl md:text-2xl font-black text-cyan-800 mb-2">QR Code Unik<br />Per Mahasiswa</h3>
                    <p className="text-sm text-cyan-600 leading-relaxed max-w-xs">Setiap mahasiswa mendapat QR Code berbeda — tidak bisa dipalsukan atau dititipkan.</p>
                  </div>
                  <div className="mt-5">
                    <Link to="/register" className="clay-btn bg-white text-cyan-700 inline-block" style={{ boxShadow: '0 5px 0 rgba(0,0,0,0.09)' }}>Daftar Gratis</Link>
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col gap-4">
                  <div className="rounded-[2rem] border-2 border-white p-6 flex-1" style={{ background: 'linear-gradient(135deg, #fef9c3, #fde68a)', boxShadow: '0 8px 0 0 rgba(0,0,0,0.08)' }}>
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-extrabold border-2 border-white mb-3" style={{ background: 'white', color: '#ca8a04', boxShadow: '0 3px 0 rgba(0,0,0,0.07)' }}>Cepat</span>
                    <h4 className="font-black text-yellow-800 text-base">Unduh Langsung</h4>
                    <p className="text-xs text-yellow-700 mt-1 leading-relaxed">QR Code bisa diunduh sebagai gambar PNG kapan saja.</p>
                  </div>
                  <div className="rounded-[2rem] border-2 border-white p-6 flex-1" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', boxShadow: '0 8px 0 0 rgba(0,0,0,0.08)' }}>
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-extrabold border-2 border-white mb-3" style={{ background: 'white', color: '#059669', boxShadow: '0 3px 0 rgba(0,0,0,0.07)' }}>Mudah</span>
                    <h4 className="font-black text-green-800 text-base">Data Tersimpan</h4>
                    <p className="text-xs text-green-700 mt-1 leading-relaxed">Isi data sekali, data tersimpan otomatis di perangkatmu.</p>
                  </div>
                </div>
              </div>
            )
          })()}
        </section>

        <section className="max-w-6xl mx-auto px-4 py-4">
          <div ref={testiRef} className={`reveal ${testiVisible ? 'visible' : ''} mb-6`}>
            <span className="inline-block rounded-full px-4 py-1 text-xs font-extrabold border-2 border-white mb-3" style={{ background: '#a5f3fc', color: '#0e7490', boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}>Testimoni</span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
              <h2 className="text-xl md:text-2xl font-black text-gray-800">Kata Mereka</h2>
              <p className="text-sm text-gray-400 font-semibold">Mahasiswa yang sudah pakai ScanAja</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => <TestiCard key={t.nama} {...t} delay={i + 1} />)}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-4 pb-14">
          <div
            ref={ctaRef}
            className={`reveal ${ctaVisible ? 'visible' : ''} relative rounded-[2rem] md:rounded-[3rem] border-2 border-white overflow-hidden`}
            style={{ background: 'linear-gradient(135deg, #0891b2 0%, #0284c7 50%, #0369a1 100%)', boxShadow: '0 14px 0 0 rgba(8,145,178,0.25)' }}
          >
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10" style={{ filter: 'blur(40px)' }} />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-7 md:px-12 py-10 md:py-14">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">Siap mulai<br />absensi digital?</h2>
                <p className="text-white/70 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">Isi data dirimu sekarang dan dapatkan QR Code dalam hitungan detik.</p>
              </div>
              <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                <Link to="/register" className="clay-btn bg-white text-violet-700 text-center" style={{ boxShadow: '0 5px 0 0 rgba(0,0,0,0.13)' }}>
                  Isi Data Diri Sekarang
                </Link>
                <p className="text-white/50 text-xs text-center font-semibold">Gratis, cepat, dan mudah</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t-2 border-white/60 bg-white/40 py-7 text-center">
          <p className="text-xs font-bold text-gray-400">ScanAja &copy; 2026 — by rakhakbr</p>
        </footer>
      </div>
    </div>
  )
}
