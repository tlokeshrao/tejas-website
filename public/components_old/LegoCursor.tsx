import { useState, useEffect, useRef } from 'react';

const LEGO_COLORS = ['#E3000B', '#006CB7', '#FFD700', '#00A550', '#FF6B35', '#9B59B6'];

export const LegoCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [color, setColor] = useState(LEGO_COLORS[0]);
  const [clicking, setClicking] = useState(false);
  const colorIdx = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => {
      setClicking(true);
      colorIdx.current = (colorIdx.current + 1) % LEGO_COLORS.length;
      setColor(LEGO_COLORS[colorIdx.current]);
    };
    const up = () => setClicking(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  const studs = [[8, 4], [20, 4], [8, 16], [20, 16]];
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          left: pos.x - 14,
          top: pos.y - 14,
          transform: `scale(${clicking ? 0.85 : 1})`,
          transition: 'transform 0.1s',
          filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.4))',
        }}
        width="28"
        height="28"
        viewBox="0 0 28 28"
      >
        <rect x="0" y="6" width="28" height="22" rx="2" fill={color} />
        <rect x="0" y="6" width="28" height="22" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="1" y="7" width="26" height="10" rx="1" fill="rgba(255,255,255,0.1)" />
        {studs.map(([cx, cy], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="5" ry="3" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
            <ellipse cx={cx} cy={cy - 0.5} rx="4.5" ry="2.2" fill="rgba(255,255,255,0.3)" />
          </g>
        ))}
      </svg>
    </div>
  );
};
