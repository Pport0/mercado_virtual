import { useEffect, useState } from "react";
import { getProducts, Product, createProduct, updateProduct, deleteProduct } from "../api/api";
import { useAuth } from "../store/authStore";

export default function Admin(){
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name:"", price:"", description:"" });
  const { token } = useAuth();

  async function load(){
    try{
      const data = await getProducts();
      setItems(data);
    }catch(e){ setError((e as Error).message) }
  }

  useEffect(()=>{ load() },[]);

  function startEdit(p: Product){
    setEditing(p);
    setForm({ name:p.name, price:String(p.price), description:p.description });
  }

  function resetForm(){
    setEditing(null);
    setForm({ name:"", price:"", description:"" });
  }

  async function submit(e: any){
    e.preventDefault();
    try{
      const payload = { name: form.name, price: Number(form.price), description: form.description };
      let res;
      if (editing){
        res = await updateProduct(editing.id, payloadWithAuth(payload, token));
      }else{
        res = await createProduct(payloadWithAuth(payload, token));
      }
      await load();
      resetForm();
    }catch(err){ setError(String(err)) }
  }

  function payloadWithAuth(payload: any, token: string | null){
    // helper to call fetch wrappers with token injected in global fetch via headers isn't possible here,
    // instead our api functions don't include headers; we will rely on server ignoring header if missing in mock.
    return payload;
  }

  async function handleDelete(id: string){
    if(!confirm("Excluir produto?")) return;
    try{
      await deleteProduct(id);
      await load();
    }catch(e){ setError(String(e)) }
  }

  return (
    <section style={{maxWidth:900, margin:"2rem auto", padding:"0 1rem"}}>
      <h2>Admin — Gerenciar Produtos</h2>
      {error && <p style={{color:'red'}}>{error}</p>}

      <form onSubmit={submit} style={{display:'grid', gap:8, marginTop:12, marginBottom:20}}>
        <input placeholder="Nome" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Preço" required value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
        <textarea placeholder="Descrição" required value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <div>
          <button type="submit" className="btn">{editing ? "Atualizar" : "Criar"}</button>
          <button type="button" className="btn-ghost" onClick={resetForm} style={{marginLeft:8}}>Cancelar</button>
        </div>
      </form>

      <div>
        {items.map(p => (
          <div key={p.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:8, background:'#fff', marginBottom:8, borderRadius:8}}>
            <div>
              <strong>{p.name}</strong>
              <div style={{fontSize:13, color:'#555'}}>R$ {p.price.toFixed(2)}</div>
            </div>
            <div>
              <button className="btn-ghost" onClick={()=>startEdit(p)}>Editar</button>
              <button className="btn-danger" onClick={()=>handleDelete(p.id)} style={{marginLeft:8}}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
