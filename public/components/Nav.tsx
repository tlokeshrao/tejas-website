import React, { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Nav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname.replace("/", "") || "home";

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:"rgba(15,15,20,0.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",height:"56px"}}>
      <span onClick={()=>navigate("/")} style={{cursor:"pointer",fontFamily:"'Fredoka One', cursive",fontSize:"22px",color:"#FFD700",letterSpacing:"1px"}}>TL</span>
      <div style={{display:"flex",gap:"0.25rem"}}>
        {["home","resume","now","things"].map(l => (
          <button key={l} onClick={()=>navigate(l==="home"?"/":`/${l}`)} style={{background:current===l?"rgba(255,215,0,0.15)":"transparent",border:current===l?"1px solid rgba(255,215,0,0.4)":"1px solid transparent",color:current===l?"#FFD700":"rgba(255,255,255,0.6)",borderRadius:"8px",padding:"6px 16px",fontFamily:"'DM Sans', sans-serif",fontSize:"14px",cursor:"pointer",transition:"all 0.2s",textTransform:"capitalize",fontWeight:current===l?"600":"400"}}>
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Nav;