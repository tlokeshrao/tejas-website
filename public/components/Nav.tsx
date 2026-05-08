import React, { FC } from "react";

interface NavProps {
  page: string;
  setPage: (page: string) => void;
}

const Nav: FC<NavProps> = ({ page, setPage }) => {
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:"rgba(15,15,20,0.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",height:"56px"}}>
      <span onClick={()=>setPage("home")} style={{cursor:"pointer",fontFamily:"'Fredoka One', cursive",fontSize:"22px",color:"#FFD700",letterSpacing:"1px"}}>TL</span>
      <div style={{display:"flex",gap:"0.25rem"}}>
        {["home","resume","now","things"].map(l => (
          <button 
            key={l} 
            onClick={()=>setPage(l)} 
            style={{
              background:page===l?"rgba(255,215,0,0.15)":"transparent",
              border:page===l?"1px solid rgba(255,215,0,0.4)":"1px solid transparent",
              color:page===l?"#FFD700":"rgba(255,255,255,0.6)",
              borderRadius:"8px",
              padding:"6px 16px",
              fontFamily:"'DM Sans', sans-serif",
              fontSize:"14px",
              cursor:"pointer",
              transition:"all 0.2s",
              textTransform:"capitalize",
              fontWeight:page===l?"600":"400"
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
