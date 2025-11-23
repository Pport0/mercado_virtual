import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { useAuth } from "../store/authStore";

export default function Header() {
  const cart = useCart((s) => s.items);
  const { isLogged, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(){
    logout();
    navigate("/");
  }

  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          🛍 Mercado Virtual
        </Link>
      </h1>

      <nav>
        <Link to="/">Produtos</Link>
        <Link to="/cart">Carrinho ({cart.length})</Link>
        <Link to="/admin">Cadastrar Produto</Link>
        {isLogged ? (
          <button className="btn-ghost" onClick={handleLogout}>Sair</button>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
        <ThemeToggle />
      </nav>
    </header>
  );
}

function ThemeToggle(){
  const theme = localStorage.getItem("mv_theme") || "light";
  const [t, setT] = React.useState(theme);
  React.useEffect(()=> {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("mv_theme", t);
  }, [t]);
  return (
    <select aria-label="Tema" value={t} onChange={(e)=>setT(e.target.value)} style={{marginLeft:12}}>
      <option value="light">Claro</option>
      <option value="dark">Escuro</option>
    </select>
  );
}
