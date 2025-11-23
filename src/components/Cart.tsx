import { useCart } from "../store/cartStore";

export default function Cart() {
  const { items, remove, clear } = useCart();

  return (
    <section style={{ maxWidth: 800, margin: "2rem auto", padding:"0 1rem" }}>
      <h2>Carrinho de Compras</h2>

      {items.length === 0 && <p>Carrinho vazio.</p>}

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div>
            <strong>{item.name}</strong>
            <div style={{fontSize:13, color:'#555'}}>R$ {item.price.toFixed(2)}</div>
          </div>
          <div>
            <button onClick={() => remove(item.id)} className="btn-danger">Remover</button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h3 style={{ marginTop: "1rem" }}>
            Total: R$ {items.reduce((t, p) => t + p.price, 0).toFixed(2)}
          </h3>
          <div style={{marginTop:12}}>
            <button onClick={() => clear()} className="btn-ghost">Limpar Carrinho</button>
          </div>
        </>
      )}
    </section>
  );
}
