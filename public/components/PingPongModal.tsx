import React, { FC } from "react";
import { useForm, ValidationError } from "@formspree/react";

interface PingPongModalProps {
  onClose: () => void;
}

const PingPongModal: FC<PingPongModalProps> = ({ onClose }) => {
  const [state, handleSubmit] = useForm("xredrrdz");

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}} onClick={onClose}>
      <div style={{background:"#1a1a2e",border:"1px solid rgba(255,215,0,0.25)",borderRadius:"16px",padding:"2rem",maxWidth:"420px",width:"100%",position:"relative"}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:"1rem",right:"1rem",background:"transparent",border:"none",color:"rgba(255,255,255,0.35)",fontSize:"18px",cursor:"pointer"}}>✕</button>
        {state.succeeded ? (
          <div style={{textAlign:"center",padding:"1rem 0"}}>
            <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🏓</div>
            <div style={{fontFamily:"'Fredoka One', cursive",fontSize:"1.8rem",color:"#FFD700",marginBottom:"0.5rem"}}>challenge accepted!</div>
            <p style={{fontFamily:"'DM Sans', sans-serif",color:"rgba(255,255,255,0.55)",fontSize:"14px",margin:0}}>I'll reach out to confirm. Get your paddle ready.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"1.5rem"}}>
              <span style={{fontSize:"1.6rem"}}>🏓</span>
              <div>
                <h2 style={{fontFamily:"'Fredoka One', cursive",fontSize:"1.5rem",color:"#FFD700",margin:0}}>ping pong request</h2>
                <p style={{fontFamily:"'DM Sans', sans-serif",fontSize:"12px",color:"rgba(255,255,255,0.4)",margin:0}}>challenge tejas to a match</p>
              </div>
            </div>
            {([{name:"name",label:"who",ph:"John Doe",t:"text"},{name:"when",label:"when",ph:"e.g. Saturday afternoons",t:"text"},{name:"where",label:"where",ph:"e.g. Crystal City Sports Pub",t:"text"},{name:"email",label:"email",ph:"john@email.com",t:"email"}] as const).map(f=>(
              <div key={f.name} style={{marginBottom:"0.9rem"}}>
                <label style={{display:"block",fontFamily:"'DM Sans', sans-serif",fontSize:"11px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"5px"}}>{f.label}</label>
                <input type={f.t} name={f.name} placeholder={f.ph} required style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"9px 12px",color:"#fff",fontFamily:"'DM Sans', sans-serif",fontSize:"14px",outline:"none",boxSizing:"border-box"}}/>
                <ValidationError field={f.name} errors={state.errors} />
              </div>
            ))}
            <button type="submit" disabled={state.submitting} style={{width:"100%",background:"#FFD700",border:"none",borderRadius:"8px",padding:"11px",color:"#0f0f14",fontFamily:"'DM Sans', sans-serif",fontSize:"14px",fontWeight:700,cursor:state.submitting?"not-allowed":"pointer",marginTop:"0.25rem",opacity:state.submitting?0.7:1}}>
              {state.submitting ? "sending..." : "send challenge 🏓"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PingPongModal;