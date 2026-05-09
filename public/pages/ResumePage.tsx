import React, { FC } from "react";

const RESUME_PDF_B64 = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YzIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNSAwIG9iago8PAovQmFzZUZvbnQgL1N5bWJvbCAvTmFtZSAvRjQgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Db250ZW50cyAxMSAwIFIgL01lZGlhQm94IFsgMCAwIDYxMiA3OTIgXSAvUGFyZW50IDEwIDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAvVHJhbnMgPDwKCj4+IAogIC9UeXBlIC9QYWdlCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9Db250ZW50cyAxMiAwIFIgL01lZGlhQm94IFsgMCAwIDYxMiA3OTIgXSAvUGFyZW50IDEwIDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAvVHJhbnMgPDwKCj4+IAogIC9UeXBlIC9QYWdlCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgMTAgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9BdXRob3IgKFwoYW5vbnltb3VzXCkpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA1MDYwMjE3MjkrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA1MDYwMjE3MjkrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSkgCiAgL1N1YmplY3QgKFwodW5zcGVjaWZpZWRcKSkgL1RpdGxlIChcKGFub255bW91c1wpKSAvVHJhcHBlZCAvRmFsc2UKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9Db3VudCAyIC9LaWRzIFsgNiAwIFIgNyAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjExIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDI3MzIKPj4Kc3RyZWFtCkdiIiNdZ05JJS4mcTBMVW9MaScmLU5sOkVeLl1NLSpjNzkxQ0NBNE5tYVpocllzTGs2bjQ4TzxOMHAxUzUqSV8ubUNRSzN0YFg/O29cU0Y/Ul1oJDwtOCJgXz50KzM0O00oJyNFaEdsLGtoYStcJTJOYzRgVCUlczQ0ckkzaC83TCQiMTZmY1hxWyh0ampAbHA3LkpcLURBZ1p1P2xCMUZxTFpfInArRXUkYUkkYStEW0dBMXFCTGI2QFRpZGJQQGBzTWQqLjJba1ZZMyhuKDJqIXFBYVpvOkxidSYwIj04XmEvYWdFKE9DcDdhLSRldTZNUD9nOF9nJ1MnR0c9SFs4PFkuO0IpbklmTmIqYSNWJFwlS1tUK0tbXmdDTHVAJ19pOXNDLC5OWVFFS3RjPWklRSE4ayI7bEI6NT5tQSVIcmRvNl4xTDAoPVxtY0g/JzNEbytLakU2Ty9LRjpCZUlHRlUob2tGTCgwbG85NFcqVl1SaWxzSEBXMDcqVDpVNSteNkEpRD1tViZbLlhgT0RKI1hEIyNIK2A9PW8sLFZfZiExMFRSVj43V09eXmVhWylmY2VfOUgxTVJMMmYjS0Q0XTw6KWssSCg3Vys/aVZXMEpiW0g/JyZQZkciJ2VbSjRta2EvV1dqQlQtZF0zKywzVDBXLzs7KCtRXTI7V14mUWY/QXRyRCg4LEMnTGkjSChzXlgmO0g+dT9Lc0J1Mk1cSDtxImlwZyJDWnJBQSh0dTYmTSdmXm86U0k7Q0taY04vaSdPaGcoWyNcYFYpSV1FMjElKVp0cSlxQHBJayJuUD9OdTQ+LF9gZ1lkPWBHV1Q0NEY2LGUlU0ZASylBViVKMGFwRmAuOHJeVC0kT2BAOzlKMW5AJj9tXyltPUlkUG9NaW01ZkwuOElOWidTMFQyRyhiYDA8SGFgXTkmWDRPbGNlY2RGK0UqQlNfbltkQl1bO0kkNiYydCVbcilgdD83T24vWStfImxETkMiMl4hRFs6Il9UMVBuOV9QSzFdWDRoJTo6P0o6PmMjakVoKy5BTjByJ1xsO25mJSU2KSVUVnJURGJKMlA3ZT10PWZuUzYlNTlDUydbWnJ0X1U8NSwlT08nRUEtUmkmK1kqNzQ5M0RhZmhkbFhjXyg/YDIsPDtSPjs3T1JWInAnMV5hTWVjPlxlWGReUll0QXVgMihQZEMqPi4takBsOGJebyxYNGJtX2JUalkhUklyUTUqYXE0cFZzRk00SikvSmc0czNSPCZbJiJMXiQvMyQ/ODVoQ2YlRChYLVRaN1taKk9zcXVgPConbmZPQ1VtVl40PURDSFsoJmBWb3RmJiY/NWVWSCc6ZnNkVkRrI0dPa0ZER2BIaFlQQlZSPF1jO0pFMy1oW04xMU5MXDJdNXBRLF0rJC5fYGglSW4kJmFMKDdgSyxCMTFubUIiKWtnKU83ZVMnVWh0VGttIilbWm1tUVRAITlHPUJkM1ZcTGZsNjFOKVg0akFiaS0mYCEzVXJdRl8oWThMKjgkQkxGaXI5W11qOSZGYjhpSlhubjpcREU6aTFPNWYrPTpOPCw8YkZyQT1oW2soWXE9Xmc8bk1pJzhrTG1HU1J0bm9hMUtNTillNU1jMVArVCE8MV9KdF9zbE43ZGxnalJPNTMwOVIyZFkrOWo1QyglJGBhNlYnNltuNyFYbEc5YVw8X0NzUzNzJGZYLDlHcGAjYlVbVXVFLyFSY0piVXRFayQ0TXElO0NSaUY1PVkpSmRnUlhubVU8UkhZKjg0XFZgbSxwR1pPXlBHNUVHVTxvM1I9TSh0QmxmOzJYRnEiO2FVJygnKEdeP25ndEBRKjdjUCRvWXBua1xCYmtwUHBDYSJPPl1sKmRgZUVnSiZxRGNnPnJZXGNmOCQ1Ll80IStrTz9uOytcQms8VWoiSWU6KXUpSUhhbTsuS2pFXkVVZlw+RVg8Zy9NNFNNL1Q2WXQ+MERALi1QKW0zTXIqUTpBYURPV1taLjBjUF1HVixIJXVTU1MoXFU5PjFQVEpeTF9dciRUVSY0QTZAZnBBMVJoXS4oaGs3OXJFcGQ7OGtSJi0hIj1ubkIrL1IzZU9gb2QlJVM4NmY1Z1xIYDNvUHJxS0dFVi1DW25LVTUnJ0tbSCwtS0JWImFYVnE3cm9UaTA=";

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

interface Project {
  name: string;
  stack: string;
  period: string;
  bullets: string[];
}

interface Skill {
  label: string;
  items: string[];
}

interface Education {
  deg: string;
  school: string;
  period: string;
  gpa: string;
  extra: string;
}

const downloadResume = () => {
  const b = atob(RESUME_PDF_B64);
  const bytes = new Uint8Array(b.length);
  for (let i=0;i<b.length;i++) bytes[i]=b.charCodeAt(i);
  const blob = new Blob([bytes],{type:"application/pdf"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url;
  a.download="Tejas_Lokeshrao_Resume.pdf";
  a.click();
  URL.revokeObjectURL(url);
};

const projects_data: Project[] = [
  {name:"Hateful Memes Detection",stack:"Python · PyTorch · Transformers",period:"Aug–Dec 2023",bullets:["Ensemble model (HateCLIPper intermediate fusion) for multimodal classification — AUROC 0.865, beating the research benchmark.","Benchmarked early-fusion with image captioning across GPT-2, DistilBERT, and LLMs."]},
  {name:"BiDirectional Decoding Translator (BiDeT)",stack:"Python · PyTorch · LSTM · NLP",period:"Jan–May 2023",bullets:["Bidirectional decoder for seq2seq — 21% test loss reduction on WMT-14 EN→DE vs. unidirectional baselines.","Dual-LSTM system using left-to-right and right-to-left context for improved fluency."]},
];

const ResumePage: FC = () => {
  const jobs: Job[] = [
    {title:"Software Engineer, Applied AI",company:"Deloitte",location:"Arlington, VA",period:"Aug 2024 – Present",bullets:["Developed an agentic AI platform adopted by >75% of a public sector agency (14,000+ users); implemented custom MCP, CoT, extended thinking, and context management.","Led backend dev on a medical reviews app with 5 workflow modules — 40% efficiency gain, 33% backlog reduction.","Engineered RL infrastructure with Gymnasium environments, DQN, and GRPO models for behavior prediction.","Spearheaded 9 technical sessions for 250+ attendees on agent building and platform onboarding."]},
    {title:"Solutions Engineering Intern",company:"Deloitte",location:"Atlanta, GA",period:"Jun–Aug 2023",bullets:["Delivered a government application integration roadmap for cross-platform data flow.","Led LLM fine-tuning and evaluation sessions for 50+ engineers."]},
    {title:"Software Engineering Intern",company:"NCR",location:"Atlanta, GA",period:"May–Aug 2022",bullets:["Engineered a PoC migrating Samza to Kafka Streams for real-time POS telemetry.","Identified stream processing bottlenecks and provided pipeline replacement recommendations."]},
  ];
  const skills: Skill[] = [
    {label:"Languages",items:["Python","C/C++","TypeScript","JavaScript","Java","SQL","Scala"]},
    {label:"ML / AI",items:["MCP","CoT","GRPO","DQN","PyTorch","TensorFlow","NLP","Computer Vision"]},
    {label:"Systems",items:["Kafka Streams","Distributed Systems","RESTful APIs","Microservices","ETL"]},
    {label:"Cloud & Tools",items:["AWS Bedrock","Lambda","EC2","S3","Docker","CI/CD","React","Git"]},
  ];

  const education: Education[] = [
    {deg:"MS Computer Science — Machine Learning",school:"Georgia Institute of Technology",period:"Aug 2023 – May 2024",gpa:"3.75",extra:"TA: Computing, Society & Professionalism · Deep RL · Computer Vision · Game AI"},
    {deg:"BS Computer Science",school:"Georgia Institute of Technology",period:"Aug 2020 – May 2023",gpa:"4.0",extra:"Faculty Honors · DSA · Systems & Networks · NLP · ML · Intro to AI"}
  ];

  const Section: FC<{title: string; children: React.ReactNode}> = ({title,children})=>(<div style={{marginBottom:"2.5rem"}}><div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.25rem"}}><h2 style={{fontFamily:"'Fredoka One', cursive",fontSize:"1.4rem",color:"#FFD700",margin:0}}>{title}</h2><div style={{flex:1,height:"1px",background:"rgba(255,215,0,0.2)"}}/></div>{children}</div>);
  const Card: FC<{children: React.ReactNode}> = ({children})=>(<div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"1.25rem",marginBottom:"0.75rem"}}>{children}</div>);

  return (
    <div style={{minHeight:"100vh",background:"#0f0f14",paddingTop:"80px",paddingBottom:"4rem"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@300;400;500;600&display=swap'); .dl-btn:hover{opacity:0.85!important;} .gh-link:hover{background:rgba(255,255,255,0.12)!important;} input::placeholder{color:rgba(255,255,255,0.25);}`}</style>
      <div style={{maxWidth:"800px",margin:"0 auto",padding:"0 2rem"}}>

        <div style={{marginBottom:"2.5rem",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"1rem"}}>
          <div>
            <h1 style={{fontFamily:"'Fredoka One', cursive",fontSize:"2.8rem",color:"#fff",margin:"0 0 0.25rem"}}>Tejas Lokeshrao</h1>
            <p style={{fontFamily:"'DM Sans', sans-serif",color:"rgba(255,255,255,0.4)",fontSize:"14px",margin:"0 0 0.75rem"}}>Arlington, VA · 703-463-7547 · tejaslkr23@gmail.com</p>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
              <a href="https://github.com/tlokeshrao" target="_blank" rel="noopener noreferrer" className="gh-link" style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.75)",padding:"5px 14px",borderRadius:"999px",fontFamily:"'DM Sans', sans-serif",fontSize:"13px",textDecoration:"none",display:"flex",alignItems:"center",gap:"6px",transition:"background 0.2s"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                github
              </a>
              {["Top Secret Clearance","GT MS CS 3.75","GT BS CS 4.0"].map(b=>(<span key={b} style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.25)",color:"#FFD700",padding:"5px 14px",borderRadius:"999px",fontFamily:"'DM Sans', sans-serif",fontSize:"13px"}}>{b}</span>))}
            </div>
          </div>
          <button className="dl-btn" onClick={downloadResume} style={{background:"#FFD700",border:"none",borderRadius:"10px",padding:"10px 20px",color:"#0f0f14",fontFamily:"'DM Sans', sans-serif",fontSize:"14px",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",whiteSpace:"nowrap",flexShrink:0,transition:"opacity 0.2s"}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            download pdf
          </button>
        </div>

        <Section title="Experience">
          {jobs.map((j,i)=>(<Card key={i}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"0.5rem"}}><div><div style={{fontFamily:"'DM Sans', sans-serif",fontWeight:600,fontSize:"15px",color:"#fff"}}>{j.title}</div><div style={{fontFamily:"'DM Sans', sans-serif",fontSize:"13px",color:"#FFD700",marginTop:"2px"}}>{j.company} · {j.location}</div></div><span style={{fontFamily:"'DM Sans', sans-serif",fontSize:"12px",color:"rgba(255,255,255,0.35)"}}>{j.period}</span></div><ul style={{margin:0,paddingLeft:"1.25rem"}}>{j.bullets.map((b,bi)=><li key={bi} style={{fontFamily:"'DM Sans', sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.6)",lineHeight:"1.7",marginBottom:"4px"}}>{b}</li>)}</ul></Card>))}
        </Section>

        <Section title="Projects">
          {projects_data.map((p,i)=>(<Card key={i}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"0.5rem"}}><div><div style={{fontFamily:"'DM Sans', sans-serif",fontWeight:600,fontSize:"15px",color:"#fff"}}>{p.name}</div><div style={{fontFamily:"'DM Sans', sans-serif",fontSize:"12px",color:"rgba(255,215,0,0.7)",marginTop:"2px"}}>{p.stack}</div></div><span style={{fontFamily:"'DM Sans', sans-serif",fontSize:"12px",color:"rgba(255,255,255,0.35)"}}>{p.period}</span></div><ul style={{margin:0,paddingLeft:"1.25rem"}}>{p.bullets.map((b,bi)=><li key={bi} style={{fontFamily:"'DM Sans', sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.6)",lineHeight:"1.7",marginBottom:"4px"}}>{b}</li>)}</ul></Card>))}
          <div style={{marginTop:"0.25rem",padding:"0.75rem 1rem",background:"rgba(255,215,0,0.04)",border:"1px dashed rgba(255,215,0,0.18)",borderRadius:"10px",fontFamily:"'DM Sans', sans-serif",fontSize:"13px",color:"rgba(255,255,255,0.35)"}}>
            📎 To embed your LinkedIn project PDFs here, re-prompt me with the files attached and I'll link them in.
          </div>
        </Section>

        <Section title="Education">
          {education.map((e,i)=>(
            <Card key={i}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}><div><div style={{fontFamily:"'DM Sans', sans-serif",fontWeight:600,fontSize:"15px",color:"#fff"}}>{e.deg}</div><div style={{fontFamily:"'DM Sans', sans-serif",fontSize:"13px",color:"#FFD700",marginTop:"2px"}}>{e.school}</div><div style={{fontFamily:"'DM Sans', sans-serif",fontSize:"12px",color:"rgba(255,255,255,0.35)",marginTop:"6px"}}>{e.extra}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:"'DM Sans', sans-serif",fontSize:"12px",color:"rgba(255,255,255,0.35)"}}>{e.period}</div><div style={{fontFamily:"'Fredoka One', cursive",fontSize:"1.25rem",color:"#00A550",marginTop:"4px"}}>GPA {e.gpa}</div></div></div></Card>
          ))}
        </Section>

        <Section title="Skills">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:"0.75rem"}}>
            {skills.map((s,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"10px",padding:"1rem"}}><div style={{fontFamily:"'Fredoka One', cursive",fontSize:"0.95rem",color:"#FFD700",marginBottom:"0.6rem"}}>{s.label}</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{s.items.map((it,j)=><span key={j} style={{background:"rgba(255,255,255,0.06)",borderRadius:"5px",padding:"2px 8px",fontFamily:"'DM Sans', sans-serif",fontSize:"11px",color:"rgba(255,255,255,0.6)"}}>{it}</span>)}</div></div>))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ResumePage;
