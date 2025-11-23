import { useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const auth = useAuth();
  const nav = useNavigate();

  async function submit(e:any){
    e.preventDefault();
    const ok = await auth.login(u,p);
    if(ok){
      nav("/admin");
    }else{
      setErr("Credenciais inválidas. Usuário: admin / admin123");
    }
  }

  return (
    <section style={{maxWidth:400, margin:"3rem auto", padding:"0 1rem"}}>
      <h2>Login</h2>
      {err && <p style={{color:'red'}}>{err}</p>}
      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        <input placeholder="Usuário" value={u} onChange={e=>setU(e.target.value)} required/>
        <input placeholder="Senha" value={p} onChange={e=>setP(e.target.value)} type="password" required/>
        <div>
          <button className="btn" type="submit">Entrar</button>
        </div>
      </form>
      <p style={{fontSize:13, color:'#555', marginTop:10}}>Use <strong>admin / admin123</strong> para entrar (mock).</p>
    </section>
  );
}
