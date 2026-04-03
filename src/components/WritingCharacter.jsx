export default function WritingCharacter() {
  return (
    <div className="relative flex items-end justify-center select-none" style={{ width: 220, height: 260 }}>

      {/* Shadow lantai */}
      <div
        className="anim-shadow absolute bottom-0 left-1/2 rounded-full"
        style={{
          width: 110,
          height: 16,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 140 190"
        width="220"
        height="240"
        className="anim-bounce block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient badan */}
          <radialGradient id="bodyGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="100%" stopColor="#a78bfa" />
          </radialGradient>
          {/* Gradient kepala */}
          <radialGradient id="headGrad" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </radialGradient>
          {/* Gradient clipboard */}
          <linearGradient id="clipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          {/* Highlight badan */}
          <radialGradient id="bodyHighlight" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── KAKI ── */}
        <ellipse cx="50" cy="168" rx="13" ry="11" fill="#a78bfa" stroke="white" strokeWidth="2.5" />
        <ellipse cx="90" cy="168" rx="13" ry="11" fill="#a78bfa" stroke="white" strokeWidth="2.5" />
        {/* Sepatu */}
        <ellipse cx="47" cy="178" rx="15" ry="9" fill="#6d28d9" stroke="white" strokeWidth="2" />
        <ellipse cx="93" cy="178" rx="15" ry="9" fill="#6d28d9" stroke="white" strokeWidth="2" />
        {/* Highlight sepatu */}
        <ellipse cx="43" cy="174" rx="5" ry="3" fill="white" opacity="0.25" />
        <ellipse cx="89" cy="174" rx="5" ry="3" fill="white" opacity="0.25" />

        {/* ── BADAN ── */}
        <ellipse cx="70" cy="125" rx="34" ry="38" fill="url(#bodyGrad)" stroke="white" strokeWidth="3" />
        {/* Perut */}
        <ellipse cx="70" cy="132" rx="22" ry="24" fill="#ede9fe" opacity="0.7" />
        {/* Highlight badan */}
        <ellipse cx="70" cy="125" rx="34" ry="38" fill="url(#bodyHighlight)" />

        {/* ── TANGAN KIRI (melambai) ── */}
        <g className="anim-wave">
          <ellipse cx="28" cy="112" rx="11" ry="14" fill="url(#bodyGrad)" stroke="white" strokeWidth="2.5" />
          <ellipse cx="28" cy="112" rx="11" ry="14" fill="url(#bodyHighlight)" />
          {/* Jari-jari kiri */}
          <circle cx="21" cy="101" r="4" fill="#c4b5fd" stroke="white" strokeWidth="1.5" />
          <circle cx="27" cy="98" r="4" fill="#c4b5fd" stroke="white" strokeWidth="1.5" />
          <circle cx="33" cy="99" r="4" fill="#c4b5fd" stroke="white" strokeWidth="1.5" />
        </g>

        {/* ── TANGAN KANAN (pegang clipboard) ── */}
        <ellipse cx="112" cy="112" rx="11" ry="14" fill="url(#bodyGrad)" stroke="white" strokeWidth="2.5" />
        <ellipse cx="112" cy="112" rx="11" ry="14" fill="url(#bodyHighlight)" />

        {/* ── CLIPBOARD ── */}
        <g style={{ animation: 'clipboardFloat 2.4s ease-in-out infinite' }}>
          {/* Papan */}
          <rect x="96" y="72" width="38" height="46" rx="6" fill="url(#clipGrad)" stroke="white" strokeWidth="2" />
          {/* Klip atas */}
          <rect x="109" y="68" width="12" height="8" rx="3" fill="#fbbf24" stroke="white" strokeWidth="1.5" />
          {/* Garis tulisan */}
          <line x1="102" y1="86" x2="128" y2="86" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="102" y1="93" x2="128" y2="93" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="102" y1="100" x2="120" y2="100" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          {/* Centang */}
          <path d="M 102 108 L 106 112 L 114 104" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Highlight clipboard */}
          <rect x="96" y="72" width="38" height="46" rx="6" fill="white" opacity="0.15" />
        </g>

        {/* ── PENSIL animasi menulis ── */}
        <g style={{ animation: 'pencilWrite 1.2s ease-in-out infinite' }}>
          <rect x="118" y="95" width="5" height="20" rx="2.5" fill="#fbbf24" stroke="white" strokeWidth="1.2"
            transform="rotate(-30 121 105)" />
          <polygon points="121,113 118,120 124,120" fill="#f87171"
            transform="rotate(-30 121 113)" />
          <polygon points="121,120 119,124 123,124" fill="#fef3c7"
            transform="rotate(-30 121 120)" />
        </g>

        {/* ── KEPALA ── */}
        {/* Telinga */}
        <ellipse cx="33" cy="68" rx="8" ry="10" fill="url(#headGrad)" stroke="white" strokeWidth="2" />
        <ellipse cx="107" cy="68" rx="8" ry="10" fill="url(#headGrad)" stroke="white" strokeWidth="2" />
        {/* Dalam telinga */}
        <ellipse cx="33" cy="68" rx="4" ry="6" fill="#e9d5ff" />
        <ellipse cx="107" cy="68" rx="4" ry="6" fill="#e9d5ff" />

        {/* Kepala utama */}
        <ellipse cx="70" cy="65" rx="36" ry="34" fill="url(#headGrad)" stroke="white" strokeWidth="3" />
        {/* Highlight kepala */}
        <ellipse cx="58" cy="52" rx="14" ry="10" fill="white" opacity="0.3" />

        {/* Pipi */}
        <ellipse cx="48" cy="74" rx="9" ry="7" fill="#fbcfe8" opacity="0.75" />
        <ellipse cx="92" cy="74" rx="9" ry="7" fill="#fbcfe8" opacity="0.75" />

        {/* Mata kiri */}
        <ellipse cx="56" cy="62" rx="7" ry="8" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
        <ellipse cx="57" cy="63" rx="4" ry="4.5" fill="#4c1d95" />
        <circle cx="58.5" cy="61" r="1.5" fill="white" />
        <circle cx="56" cy="65" r="0.8" fill="white" opacity="0.6" />

        {/* Mata kanan */}
        <ellipse cx="84" cy="62" rx="7" ry="8" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
        <ellipse cx="85" cy="63" rx="4" ry="4.5" fill="#4c1d95" />
        <circle cx="86.5" cy="61" r="1.5" fill="white" />
        <circle cx="84" cy="65" r="0.8" fill="white" opacity="0.6" />

        {/* Alis — ekspresi fokus */}
        <path d="M 50 54 Q 56 51 62 54" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 78 54 Q 84 51 90 54" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Mulut — senyum kecil fokus */}
        <path d="M 60 78 Q 70 85 80 78" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Rambut / antena */}
        <rect x="67" y="30" width="6" height="12" rx="3" fill="#c4b5fd" />
        <circle cx="70" cy="28" r="8" fill="#fde68a" stroke="white" strokeWidth="2.5" />
        {/* Highlight antena */}
        <circle cx="67" cy="25" r="2.5" fill="white" opacity="0.5" />

        {/* Bintang kecil dekoratif */}
        <g style={{ animation: 'starTwinkle 2s ease-in-out infinite' }}>
          <circle cx="18" cy="45" r="3" fill="#fde68a" stroke="white" strokeWidth="1" />
        </g>
        <g style={{ animation: 'starTwinkle 2s ease-in-out infinite 0.7s' }}>
          <circle cx="125" cy="55" r="2.5" fill="#fbcfe8" stroke="white" strokeWidth="1" />
        </g>
        <g style={{ animation: 'starTwinkle 2s ease-in-out infinite 1.3s' }}>
          <circle cx="15" cy="130" r="2" fill="#a7f3d0" stroke="white" strokeWidth="1" />
        </g>
      </svg>

      <style>{`
        @keyframes clipboardFloat {
          0%, 100% { transform: rotate(-3deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-4px); }
        }
        @keyframes pencilWrite {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(2px) translateY(-2px); }
          75% { transform: translateX(-2px) translateY(1px); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(0.5); }
        }
      `}</style>
    </div>
  )
}
