import React, { useState, useEffect } from "react";

export default function LegoBlock({ color, x, y, size=1, delay=0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => { 
    const t=setTimeout(()=>setVisible(true),delay); 
    return ()=>clearTimeout(t); 
  },[delay]);

  const w=48*size, h=32*size, studR=7*size;
  const studs = size>=2
    ? [{cx:w*0.28,cy:studR*0.9},{cx:w*0.72,cy:studR*0.9}]
    : [{cx:w*0.5,cy:studR*0.9}];

  return (
    <div style={{position:"absolute",left:x,top:y,opacity:visible?1:0,transform:visible?"translateY(0) rotate(0deg)":"translateY(-40px) rotate(-15deg)",transition:`opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms cubic-bezier(0.34,1.56,0.64,1)`}}>
      <svg width={w} height={h+studR*1.4} viewBox={`0 0 ${w} ${h+studR*1.4}`}>
        {studs.map((s,i)=>(
          <g key={i}>
            <ellipse cx={s.cx} cy={studR*0.9} rx={studR} ry={studR*0.55} fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="0.8"/>
            <ellipse cx={s.cx} cy={studR*0.7} rx={studR*0.8} ry={studR*0.35} fill="rgba(255,255,255,0.35)"/>
          </g>
        ))}
        <rect x="0" y={studR*1.1} width={w} height={h} rx="3" fill={color}/>
        <rect x="0" y={studR*1.1} width={w} height={h} rx="3" fill="rgba(255,255,255,0.12)"/>
        <rect x="1" y={studR*1.2} width={w-2} height={h*0.35} rx="2" fill="rgba(255,255,255,0.08)"/>
      </svg>
    </div>
  );
}
