export default function LoadingScreen({ message = 'Menyimpan data...' }) {
  return (
    <div
      className="fixed inset-0 z-[998] flex items-center justify-center"
      style={{ background: 'rgba(237,233,254,0.75)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="flex flex-col items-center gap-6 rounded-[2rem] border-2 border-white px-12 py-10"
        style={{
          background: 'white',
          boxShadow: '0 12px 0 0 rgba(0,0,0,0.09), 0 20px 40px rgba(0,0,0,0.10)',
          animation: 'loadCardPop 0.4s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* Spinner clay */}
        <div className="relative w-16 h-16">
          {/* Ring luar */}
          <div
            className="absolute inset-0 rounded-full border-4 border-violet-100"
          />
          {/* Arc berputar */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-400"
            style={{ animation: 'spin 0.9s linear infinite' }}
          />
          {/* Dot tengah */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-5 h-5 rounded-full bg-violet-200 border-2 border-white"
              style={{
                boxShadow: '0 3px 0 rgba(124,58,237,0.25)',
                animation: 'dotPulse 0.9s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Dots animasi */}
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-violet-300"
              style={{
                animation: 'dotBounce 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm font-extrabold text-gray-700">{message}</p>
          <p className="text-xs font-semibold text-gray-400 mt-1">Mohon tunggu sebentar</p>
        </div>
      </div>

      <style>{`
        @keyframes loadCardPop {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1);    background: #ddd6fe; }
          50%       { transform: scale(1.3);  background: #a78bfa; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.4; }
          50%       { transform: translateY(-6px); opacity: 1;   }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
