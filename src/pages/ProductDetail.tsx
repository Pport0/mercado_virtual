import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, Product } from "../api/api";
import { useCart } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (id) getProduct(id).then(setProduct).catch(()=>{});
  }, [id]);

  if (!product) return <p style={{ padding: "2rem" }}>Carregando...</p>;

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p style={{ fontSize: "1.1rem" }}>{product.description}</p>
      <h2 style={{ marginTop: "1rem" }}>R$ {product.price.toFixed(2)}</h2>

      <button onClick={() => add(product)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
