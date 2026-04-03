export default function ClayCharacter() {
  return (
    <div className="relative flex items-end justify-center select-none" style={{ width: 180, height: 200 }}>

      {/* Shadow — tanpa blur, pakai opacity saja */}
      <div
        className="anim-shadow absolute bottom-0 left-1/2 rounded-full bg-violet-300/50"
        style={{ width: 90, height: 14 }}
      />

      <svg
        viewBox="0 0 120 160"
        width="160"
        height="180"
        className="anim-bounce block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Badan */}
        <ellipse cx="60" cy="105" rx="32" ry="36" fill="#c4b5fd" stroke="white" strokeWidth="3" />
        <ellipse cx="60" cy="112" rx="20" ry="22" fill="#ddd6fe" />

        {/* Kaki */}
        <ellipse cx="45" cy="143" rx="11" ry="10" fill="#a78bfa" stroke="white" strokeWidth="2.5" />
        <ellipse cx="75" cy="143" rx="11" ry="10" fill="#a78bfa" stroke="white" strokeWidth="2.5" />
        <ellipse cx="43" cy="152" rx="13" ry="8" fill="#7c3aed" stroke="white" strokeWidth="2" />
        <ellipse cx="77" cy="152" rx="13" ry="8" fill="#7c3aed" stroke="white" strokeWidth="2" />

        {/* Tangan kiri melambai */}
        <ellipse className="anim-wave" cx="22" cy="95" rx="10" ry="13" fill="#c4b5fd" stroke="white" strokeWidth="2.5" />
        {/* Tangan kanan pegang QR */}
        <ellipse cx="98" cy="95" rx="10" ry="13" fill="#c4b5fd" stroke="white" strokeWidth="2.5" />

        {/* Kepala */}
        <ellipse cx="60" cy="58" rx="34" ry="32" fill="#ede9fe" stroke="white" strokeWidth="3" />
        <ellipse cx="27" cy="55" rx="7" ry="9" fill="#c4b5fd" stroke="white" strokeWidth="2" />
        <ellipse cx="93" cy="55" rx="7" ry="9" fill="#c4b5fd" stroke="white" strokeWidth="2" />

        {/* Pipi */}
        <ellipse cx="40" cy="65" rx="8" ry="6" fill="#fbcfe8" opacity="0.7" />
        <ellipse cx="80" cy="65" rx="8" ry="6" fill="#fbcfe8" opacity="0.7" />

        {/* Mata kiri */}
        <ellipse cx="48" cy="55" rx="6" ry="7" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
        <ellipse cx="49" cy="56" rx="3" ry="3.5" fill="#5b21b6" />
        <circle cx="50" cy="54" r="1.2" fill="white" />

        {/* Mata kanan */}
        <ellipse cx="72" cy="55" rx="6" ry="7" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
        <ellipse cx="73" cy="56" rx="3" ry="3.5" fill="#5b21b6" />
        <circle cx="74" cy="54" r="1.2" fill="white" />

        {/* Senyum */}
        <path d="M 48 70 Q 60 80 72 70" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Antena */}
        <rect x="57.5" y="26" width="5" height="10" rx="2.5" fill="#c4b5fd" />
        <circle cx="60" cy="26" r="7" fill="#fde68a" stroke="white" strokeWidth="2" />

        {/* QR mini */}
        <rect x="88" y="84" width="22" height="22" rx="4" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
        <rect x="91" y="87" width="6" height="6" rx="1" fill="#7c3aed" />
        <rect x="99" y="87" width="6" height="6" rx="1" fill="#7c3aed" />
        <rect x="91" y="95" width="6" height="6" rx="1" fill="#7c3aed" />
        <rect x="99" y="95" width="3" height="3" rx="0.5" fill="#7c3aed" />
        <rect x="103" y="98" width="3" height="3" rx="0.5" fill="#7c3aed" />
      </svg>
    </div>
  )
}
