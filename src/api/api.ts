export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const BASE = "/api";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Falha ao buscar produtos");
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Produto não encontrado");
  return res.json();
}

export async function createProduct(p: Omit<Product, "id">): Promise<Product> {
  const res = await fetch(`${BASE}/products`, { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(p) });
  if (!res.ok) throw new Error("Falha ao criar produto");
  return res.json();
}

export async function updateProduct(id: string, p: Omit<Product, "id">): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`, { method: "PUT", headers: { "Content-Type":"application/json" }, body: JSON.stringify(p) });
  if (!res.ok) throw new Error("Falha ao atualizar produto");
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao excluir produto");
}
