import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoBrancaSportly } from "../assets";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // controla o menu no mobile
  const navigate = useNavigate();

  // Links do menu principal (mesmos no desktop e no mobile)
  const navItems = [
    { label: "INICIO", to: "/" },
    { label: "CURSOS", to: "/cursos" },
    { label: "COMUNIDADE", to: "/cursos" },
    { label: "LOJA", to: "/loja" },
    { label: "MISSOES", to: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur">
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center">
          <img className="h-4 w-auto sm:h-5" src={logoBrancaSportly} alt="Sportly" />
        </Link>

        <nav className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-7 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
            {navItems.map((item) => (
              <li key={`${item.label}-${item.to}`}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `transition hover:text-white ${isActive ? "text-white" : "text-zinc-400"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button type="button" className="flex h-8 w-8 items-center justify-center text-zinc-300 transition hover:text-white" aria-label="Carrinho">
            <i className="bi bi-cart3 text-sm" />
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center text-zinc-300 transition hover:text-white" aria-label="Perfil">
            <i className="bi bi-person text-sm" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-sm border border-white/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="rounded-sm bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-black transition hover:bg-cyan-300"
          >
            Registrar
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button type="button" className="flex h-9 w-9 items-center justify-center text-zinc-400" aria-label="Buscar">
            <i className="bi bi-search text-lg" />
          </button>
          <button type="button" className="flex h-9 w-9 items-center justify-center text-zinc-400" aria-label="Carrinho">
            <i className="bi bi-bag text-lg" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-xl text-zinc-300"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Abrir menu"
          >
            <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"} />
          </button>
        </div>
      </div>

      {/* Menu que abre no celular ao tocar no icone de lista */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#111] px-3 py-4 md:hidden">
          <nav>
            <ul className="grid text-2xl font-black text-white">
              {navItems.map((item) => (
                <li key={`${item.label}-mobile`}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-white/10 px-2 py-3 ${isActive ? "text-white" : "text-white"}`
                    }
                  >
                    {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="border border-white px-3 py-3 text-xs font-black uppercase tracking-[0.22em]"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="bg-white px-3 py-3 text-xs font-black uppercase tracking-[0.22em] text-black"
            >
              Criar conta
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
