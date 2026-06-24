import { useMemo, useState } from "react";

// Versao mobile da loja. Recebe os produtos ja prontos da pagina Loja,
// entao nao precisa buscar nada na API por conta propria.

function OutlineTitle({ first, second }) {
  return (
    <h1 className="text-5xl font-black uppercase leading-[0.84] tracking-tight text-white">
      {first}
      <br />
      <span className="text-transparent [-webkit-text-stroke:1px_white]">{second}</span>
    </h1>
  );
}

function MobileProductCard({ product, onAdd }) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-square overflow-hidden bg-zinc-900">
        {product.badge && (
          <span className="absolute left-2 top-2 z-10 bg-white px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-black">
            {product.badge === "Top vendido" ? "Popular" : product.badge}
          </span>
        )}
        <button
          type="button"
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center bg-black/60 text-xs text-zinc-300"
          aria-label="Favoritar"
        >
          <i className="bi bi-bag" />
        </button>
        <img className="h-full w-full object-cover grayscale" src={product.image} alt={product.name} />
      </div>

      <div className="pt-3">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">{product.category}</p>
        <h2 className="mt-1 line-clamp-2 text-sm font-black uppercase leading-tight text-white">{product.name}</h2>
        <p className="mt-2 line-clamp-1 text-xs leading-relaxed text-zinc-500">{product.description}</p>
        {product.rating && (
          <div className="mt-3 flex items-center gap-1 text-[10px] text-zinc-500">
            <span className="text-stone-400">★★★★</span>
            <span className="text-zinc-700">★</span>
            <span>{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        )}
        <div className="mt-2 flex items-center justify-between gap-2">
          <strong className="text-lg font-black text-white">R$ {product.price}</strong>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="text-[10px] font-black uppercase tracking-[0.12em] text-zinc-500"
          >
            <i className="bi bi-bag mr-1" />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

export default function LojaMobile({ products, onAddToCart, cartCount, onOpenCart }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  // Mesma logica da versao desktop: categorias saem dos produtos recebidos.
  const categories = useMemo(() => {
    const nomes = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return ["Todos", ...nomes];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const byCategory = activeCategory === "Todos" || product.category === activeCategory;
      const bySearch = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
      return byCategory && bySearch;
    });
  }, [activeCategory, products, search]);

  const featuredProducts = filteredProducts.slice(0, 4);
  const regularProducts = filteredProducts.slice(4, 12);

  return (
    <main className="min-h-screen bg-[#111] text-white">
      <section className="px-5 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-zinc-500">Sportly Store</p>
            <OutlineTitle first="Loja" second="Sportly" />
            <p className="mt-5 max-w-72 text-sm leading-relaxed text-zinc-500">
              Produtos selecionados para sua evolucao fisica e mental.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenCart}
            className="mt-10 shrink-0 border border-white/20 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em]"
          >
            <i className="bi bi-cart3 mr-2" />
            Carrinho {cartCount > 0 && cartCount}
          </button>
        </div>

        <label className="mt-8 flex items-center gap-4 bg-zinc-800 px-4 py-4 text-zinc-500">
          <i className="bi bi-search text-lg" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            placeholder="Busque suplementos, equipamentos, alimentacao..."
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`border px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] ${
                activeCategory === category ? "border-white bg-white text-black" : "border-white/15 text-zinc-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mb-7">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.45em] text-zinc-500">Destaque</p>
          <h2 className="text-4xl font-black uppercase leading-[0.9] text-white">
            Mais
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white]">Vendidos</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {featuredProducts.map((product) => (
            <MobileProductCard key={product.id} product={product} onAdd={onAddToCart} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#151515] px-5 py-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {regularProducts.map((product) => (
            <MobileProductCard key={product.id} product={product} onAdd={onAddToCart} />
          ))}
        </div>
      </section>

    </main>
  );
}
