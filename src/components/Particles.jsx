import { useMemo } from 'react'

// Shapes bertema scan/QR: pixel dot, scan corner, ring sinyal
const SHAPES = ['pixel', 'corner', 'ring', 'dot']

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function Particles({ count = 18 }) {
  const particles = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      shape: SHAPES[i % SHAPES.length],
      size: randomBetween(8, 20),
      left: randomBetween(2, 98),
      delay: randomBetween(0, 8),
      duration: randomBetween(6, 14),
      color: ['#67e8f9','#38bdf8','#a5f3fc','#0ea5e9','#bae6fd'][i % 5],
      opacity: randomBetween(0.30, 0.65),
    }))
  ), [count])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map(({ id, shape, size, left, delay, duration, color, opacity }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            left: `${left}%`,
            bottom: '-40px',
            width: size,
            height: size,
            opacity,
            animation: `particleRise ${duration}s ease-in infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          {shape === 'pixel' && (
            <div style={{ width: size, height: size, borderRadius: '3px', background: color, boxShadow: `0 2px 6px ${color}80` }} />
          )}
          {shape === 'corner' && (
            <svg viewBox="0 0 20 20" width={size} height={size}>
              <path d="M4 12 L4 4 L12 4" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          )}
          {shape === 'ring' && (
            <div style={{ width: size, height: size, borderRadius: '50%', border: `${Math.max(2, size * 0.18)}px solid ${color}`, boxShadow: `0 2px 6px ${color}60` }} />
          )}
          {shape === 'dot' && (
            <div style={{ width: size * 0.5, height: size * 0.5, borderRadius: '50%', background: color, margin: 'auto', marginTop: size * 0.25 }} />
          )}
        </div>
      ))}
    </div>
  )
}
