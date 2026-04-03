function QRMiniAsset({ style }) {
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="qrBg" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
        <filter id="qrShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0e7490" floodOpacity="0.30" />
        </filter>
      </defs>
      <rect x="8" y="8" width="84" height="84" rx="16" fill="url(#qrBg)" filter="url(#qrShadow)" stroke="white" strokeWidth="3" />
      <ellipse cx="38" cy="28" rx="18" ry="9" fill="white" opacity="0.22" />
      <rect x="22" y="22" width="20" height="20" rx="3" fill="white" opacity="0.9" />
      <rect x="58" y="22" width="20" height="20" rx="3" fill="white" opacity="0.9" />
      <rect x="22" y="58" width="20" height="20" rx="3" fill="white" opacity="0.9" />
      <rect x="27" y="27" width="10" height="10" rx="1.5" fill="#0891b2" />
      <rect x="63" y="27" width="10" height="10" rx="1.5" fill="#0891b2" />
      <rect x="27" y="63" width="10" height="10" rx="1.5" fill="#0891b2" />
      <rect x="58" y="58" width="5" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="65" y="58" width="5" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="72" y="58" width="5" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="58" y="65" width="5" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="72" y="65" width="5" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="65" y="72" width="5" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="72" y="72" width="5" height="5" rx="1" fill="white" opacity="0.85" />
    </svg>
  )
}

function ScanFrameAsset({ style }) {
  return (
    <svg viewBox="0 0 110 110" width="110" height="110" style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="frameShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0284c7" floodOpacity="0.28" />
        </filter>
      </defs>
      <rect x="10" y="10" width="90" height="90" rx="18" fill="#e0f2fe" filter="url(#frameShadow)" stroke="white" strokeWidth="3" />
      <ellipse cx="38" cy="28" rx="16" ry="8" fill="white" opacity="0.30" />
      <path d="M28 48 L28 30 Q28 26 32 26 L50 26" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M82 48 L82 30 Q82 26 78 26 L60 26" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M28 62 L28 80 Q28 84 32 84 L50 84" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M82 62 L82 80 Q82 84 78 84 L60 84" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="28" y1="55" x2="82" y2="55" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.8" />
    </svg>
  )
}

function RadarAsset({ style }) {
  return (
    <svg viewBox="0 0 110 110" width="100" height="100" style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#06b6d4" />
        </radialGradient>
        <filter id="radarShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0e7490" floodOpacity="0.28" />
        </filter>
      </defs>
      <circle cx="55" cy="55" r="44" fill="url(#radarBg)" filter="url(#radarShadow)" stroke="white" strokeWidth="3" />
      <ellipse cx="40" cy="36" rx="14" ry="7" fill="white" opacity="0.22" />
      <circle cx="55" cy="55" r="32" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
      <circle cx="55" cy="55" r="20" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
      <circle cx="55" cy="55" r="8" fill="white" opacity="0.6" />
      <line x1="55" y1="18" x2="55" y2="92" stroke="white" strokeWidth="1.5" opacity="0.35" />
      <line x1="18" y1="55" x2="92" y2="55" stroke="white" strokeWidth="1.5" opacity="0.35" />
      <line x1="55" y1="55" x2="87" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="76" cy="38" r="4" fill="white" opacity="0.9" />
    </svg>
  )
}

function PhoneQRAsset({ style }) {
  return (
    <svg viewBox="0 0 80 120" width="72" height="108" style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="phoneBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="phoneShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0284c7" floodOpacity="0.30" />
        </filter>
      </defs>
      <rect x="8" y="5" width="64" height="110" rx="14" fill="url(#phoneBg)" filter="url(#phoneShadow)" stroke="white" strokeWidth="3" />
      <ellipse cx="30" cy="20" rx="14" ry="7" fill="white" opacity="0.25" />
      <rect x="14" y="20" width="52" height="72" rx="8" fill="white" opacity="0.85" />
      <rect x="22" y="28" width="14" height="14" rx="2" fill="#0284c7" opacity="0.8" />
      <rect x="44" y="28" width="14" height="14" rx="2" fill="#0284c7" opacity="0.8" />
      <rect x="22" y="50" width="14" height="14" rx="2" fill="#0284c7" opacity="0.8" />
      <rect x="25" y="31" width="8" height="8" rx="1" fill="white" />
      <rect x="47" y="31" width="8" height="8" rx="1" fill="white" />
      <rect x="25" y="53" width="8" height="8" rx="1" fill="white" />
      <rect x="44" y="50" width="5" height="5" rx="1" fill="#0284c7" opacity="0.8" />
      <rect x="51" y="50" width="5" height="5" rx="1" fill="#0284c7" opacity="0.8" />
      <rect x="44" y="57" width="5" height="5" rx="1" fill="#0284c7" opacity="0.8" />
      <rect x="51" y="57" width="5" height="5" rx="1" fill="#0284c7" opacity="0.8" />
      <line x1="18" y1="65" x2="62" y2="65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" opacity="0.7" />
      <circle cx="40" cy="104" r="5" fill="white" opacity="0.6" />
    </svg>
  )
}

function BarcodeAsset({ style }) {
  const bars = [18,22,25,30,33,37,41,45,48,52,56,59,63,67,71,75,78,82,86,89,93,97,100,104,108,112]
  return (
    <svg viewBox="0 0 130 70" width="120" height="65" style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="barcodeBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cffafe" />
          <stop offset="100%" stopColor="#a5f3fc" />
        </linearGradient>
        <filter id="barcodeShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0e7490" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect x="5" y="5" width="120" height="60" rx="12" fill="url(#barcodeBg)" filter="url(#barcodeShadow)" stroke="white" strokeWidth="3" />
      <ellipse cx="40" cy="18" rx="18" ry="7" fill="white" opacity="0.28" />
      {bars.map((x, i) => (
        <rect key={i} x={x} y="18" width={i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5} height={i % 4 === 0 ? 34 : 28} rx="0.5" fill="#0891b2" opacity={0.7 + (i % 3) * 0.1} />
      ))}
      <line x1="10" y1="35" x2="120" y2="35" stroke="#06b6d4" strokeWidth="2" opacity="0.5" strokeDasharray="5 3" />
    </svg>
  )
}

export default function BgAssets() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute" style={{ top: '-20px', left: '-20px', animation: 'floatA 6s ease-in-out infinite' }}>
        <QRMiniAsset />
      </div>
      <div className="absolute" style={{ top: '50px', right: '30px', animation: 'floatB 5s ease-in-out infinite' }}>
        <ScanFrameAsset />
      </div>
      <div className="absolute" style={{ bottom: '70px', left: '50px', animation: 'floatC 7s ease-in-out infinite' }}>
        <RadarAsset />
      </div>
      <div className="absolute" style={{ bottom: '30px', right: '70px', animation: 'floatA 5.5s ease-in-out infinite 1s' }}>
        <PhoneQRAsset />
      </div>
      <div className="absolute" style={{ top: '20px', left: '50%', transform: 'translateX(-50%)', animation: 'floatB 8s ease-in-out infinite 0.5s' }}>
        <BarcodeAsset />
      </div>
    </div>
  )
}
