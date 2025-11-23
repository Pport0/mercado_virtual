import { useEffect, useState } from "react";
import { getProducts, Product } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts().then(setProducts).catch(err=>setError(err.message));
  }, []);

  return (
    <section>
      <h2 style={{ padding: "1.5rem 2rem" }}>🛒 Produtos Disponíveis</h2>
      {error && <p style={{color:'red', padding:'0 2rem'}}>{error}</p>}
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
