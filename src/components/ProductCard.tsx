import { Link } from "react-router-dom";
import type { Product } from "../api/api";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card" aria-labelledby={`title-${product.id}`}>
      <h3 id={`title-${product.id}`}>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <p style={{color:'#666', fontSize:14}}>{product.description}</p>
      <div style={{marginTop:8}}>
        <Link to={`/product/${product.id}`} className="btn">Ver Detalhes</Link>
      </div>
    </article>
  );
}
