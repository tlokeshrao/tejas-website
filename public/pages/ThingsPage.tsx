import React, { useState, useEffect, FC } from "react";

const ThingsPage: FC = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 550);
    return () => clearInterval(t);
  }, []);

  interface Brick {
    c: string;
    x: number;
    y: number;
  }

  const bricks: Brick[] = [
    {c:"#E3000B",x:0,y:0},
    {c:"#FFD700",x:52,y:0},
    {c:"#006CB7",x:104,y:0},
    {c:"#00A550",x:0,y:36},
    {c:"#9B59B6",x:52,y:36},
    {c:"#FF6B35",x:104,y:36},
    {c:"#FFD700",x:0,y:72},
    {c:"#E3000B",x:52,y:72},
    {c:"#006CB7",x:104,y:72}
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0f0f14",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"56px"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');
        @keyframes scan{0%{top:-2px}100%{top:100%}}
        @keyframes flicker{0%,89%,91%,93%,100%{opacity:1}90%,92%{opacity:0.6}}`}</style>
      
      <div style={{textAlign:"center"}}>
        <div style={{position:"relative",width:"156px",height:"108px",margin:"0 auto 2.5rem"}}>
          {bricks.map((b,i)=>{
            const w=48,h=28,sR=6;
            return (<div key={i} style={{position:"absolute",left:b.x,top:b.y}}>
              <svg width={w} height={h+sR*1.2} viewBox={`0 0 ${w} ${h+sR*1.2}`}>
                <ellipse cx={w/2} cy={sR*0.8} rx={sR} ry={sR*0.5} fill={b.c} stroke="rgba(0,0,0,0.25)" strokeWidth="0.8"/>
                <ellipse cx={w/2} cy={sR*0.6} rx={sR*0.8} ry={sR*0.3} fill="rgba(255,255,255,0.3)"/>
                <rect x="0" y={sR} width={w} height={h} rx="2" fill={b.c}/>
                <rect x="0" y={sR} width={w} height={h} rx="2" fill="rgba(255,255,255,0.1)"/>
              </svg>
            </div>);
          })}
          <div style={{position:"absolute",top:"-14px",right:"-14px",fontFamily:"'Fredoka One', cursive",fontSize:"2rem",color:"rgba(255,215,0,0.5)",animation:"flicker 3s infinite"}}>?</div>
        </div>

        <div style={{display:"inline-block",background:"rgba(0,15,0,0.9)",border:"2px solid rgba(0,255,70,0.35)",borderRadius:"8px",padding:"2rem 3rem",position:"relative",overflow:"hidden",boxShadow:"0 0 40px rgba(0,255,70,0.1),inset 0 0 40px rgba(0,0,0,0.6)",animation:"flicker 5s infinite"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 2px)",pointerEvents:"none",zIndex:1}}/>
          <div style={{position:"absolute",left:0,right:0,height:"3px",background:"rgba(0,255,70,0.12)",animation:"scan 2.5s linear infinite",zIndex:2}}/>
          <div style={{position:"relative",zIndex:3}}>
            <div style={{fontFamily:"'Share Tech Mono', monospace",color:"rgba(0,255,70,0.9)",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",letterSpacing:"0.04em",marginBottom:"0.75rem"}}>
              UNDER_CONSTRUCTION<span style={{opacity:blink?1:0,marginLeft:"2px"}}>▌</span>
            </div>
            <div style={{fontFamily:"'Share Tech Mono', monospace",color:"rgba(0,255,70,0.45)",fontSize:"13px",letterSpacing:"0.08em",marginBottom:"4px"}}>&gt; something cool loading...</div>
            <div style={{fontFamily:"'Share Tech Mono', monospace",color:"rgba(0,255,70,0.3)",fontSize:"11px",letterSpacing:"0.08em"}}>&gt; status: assembling bricks</div>
          </div>
        </div>

        <p style={{fontFamily:"'DM Sans', sans-serif",color:"rgba(255,255,255,0.2)",fontSize:"13px",marginTop:"2rem",letterSpacing:"0.05em"}}>check back soon</p>
      </div>
    </div>
  );
};

export default ThingsPage;
