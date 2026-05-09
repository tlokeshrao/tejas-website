import React, { useState, useEffect, FC } from "react";
import LegoBlock from "../components/LegoBlock";
import PingPongModal from "../components/PingPongModal";

interface BlockData {
  color: string;
  x: string;
  y: string;
  size: number;
  delay: number;
}

const BLOCKS: BlockData[] = [
  {color:"#E3000B",x:"5%",y:"15%",size:2,delay:200},
  {color:"#006CB7",x:"12%",y:"55%",size:1.5,delay:400},
  {color:"#FFD700",x:"8%",y:"75%",size:1,delay:600},
  {color:"#00A550",x:"82%",y:"20%",size:1.5,delay:300},
  {color:"#FF6B35",x:"88%",y:"60%",size:2,delay:500},
  {color:"#9B59B6",x:"78%",y:"78%",size:1,delay:700},
  {color:"#006CB7",x:"3%",y:"40%",size:1,delay:800},
  {color:"#E3000B",x:"90%",y:"42%",size:1,delay:350}
];

const HomePage: FC = () => {
  const [vis, setVis] = useState({t:false,s:false,tags:false});
  const [gtClicked, setGtClicked] = useState(false);
  const [showPP, setShowPP] = useState(false);

  useEffect(() => {
    setTimeout(()=>setVis(v=>({...v,t:true})),100);
    setTimeout(()=>setVis(v=>({...v,s:true})),600);
    setTimeout(()=>setVis(v=>({...v,tags:true})),1000);
  }, []);

  return (
    <div style={{minHeight:"100vh",background:"#0f0f14",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",paddingTop:"56px"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@300;400;500;600&display=swap'); 
        body,*{cursor:none!important;} 
        .tag-pill{transition:transform 0.2s,background 0.2s;} 
        .tag-pill:hover{transform:scale(1.08) rotate(-2deg);background:rgba(255,215,0,0.2)!important;} 
        .gt-btn{transition:all 0.15s;} 
        .gt-btn:hover{transform:scale(1.05);} 
        .gt-btn:active{transform:scale(0.95);} 
        .pp-cta{transition:all 0.2s;} 
        .pp-cta:hover{background:rgba(255,215,0,0.12)!important;border-color:rgba(255,215,0,0.4)!important;transform:translateY(-2px);} 
        input::placeholder{color:rgba(255,255,255,0.25);}`}</style>

      {BLOCKS.map((b,i)=><LegoBlock key={i} {...b}/>)}
      
      <div style={{background:"radial-gradient(ellipse at 50% 50%, rgba(255,215,0,0.06) 0%, transparent 70%)",position:"absolute",inset:0,pointerEvents:"none"}}/>
      
      <div style={{textAlign:"center",zIndex:10,padding:"2rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{opacity:vis.t?1:0,transform:vis.t?"translateY(0)":"translateY(30px)",transition:"all 0.8s cubic-bezier(0.34,1.2,0.64,1)"}}>
          <div style={{fontFamily:"'Fredoka One', cursive",fontSize:"clamp(3rem,8vw,7rem)",color:"#fff",lineHeight:1.05,textShadow:"0 0 60px rgba(255,215,0,0.3)"}}>
            hey, i'm <span style={{color:"#FFD700"}}>tejas</span><span style={{color:"#E3000B"}}>.</span>
          </div>
        </div>

        <div style={{opacity:vis.s?1:0,transform:vis.s?"translateY(0)":"translateY(20px)",transition:"all 0.7s ease 0.1s"}}>
          <p style={{fontFamily:"'DM Sans', sans-serif",fontSize:"clamp(1rem,2.5vw,1.35rem)",color:"rgba(255,255,255,0.5)",marginTop:"1rem",marginBottom:"2rem",fontWeight:300,letterSpacing:"0.02em"}}>
            software engineer · lego aficionado
          </p>
        </div>

        <div style={{opacity:vis.tags?1:0,transform:vis.tags?"translateY(0)":"translateY(15px)",transition:"all 0.6s ease",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"10px",justifyContent:"center",maxWidth:"540px"}}>
            <button className="gt-btn" onClick={()=>setGtClicked(c=>!c)} style={{background:gtClicked?"rgba(179,163,105,0.2)":"rgba(255,255,255,0.06)",border:gtClicked?"1px solid rgba(179,163,105,0.6)":"1px solid rgba(255,255,255,0.12)",color:gtClicked?"#B3A369":"rgba(255,255,255,0.7)",padding:"8px 18px",borderRadius:"999px",fontFamily:"'DM Sans', sans-serif",fontSize:"14px",cursor:"pointer",fontWeight:gtClicked?"600":"400",transition:"all 0.2s"}}>
              {gtClicked?"🐝 go jackets!":"georgia tech alum"}
            </button>
          </div>

          <div style={{width:"1px",height:"28px",background:"linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)"}}/>

          <button className="pp-cta" onClick={()=>setShowPP(true)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.75)",padding:"14px 30px",borderRadius:"12px",fontFamily:"'DM Sans', sans-serif",fontSize:"15px",cursor:"pointer",display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"1.3rem"}}>🏓</span>
            <span>challenge me to ping pong</span>
          </button>
        </div>
      </div>

      {showPP&&<PingPongModal onClose={()=>setShowPP(false)}/>}
    </div>
  );
};

export default HomePage;
