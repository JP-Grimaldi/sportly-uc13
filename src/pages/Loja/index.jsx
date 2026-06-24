import { useEffect, useMemo, useState } from "react";
import * as Images from "../../assets";
import LojaMobile from "./LojaMobile";
import api, { apiBaseURL } from "../../services/api";

// Imagens locais usadas como reserva caso algum produto venha sem imagem da API.
const imagensLocais = [
  Images.imgPularCorda,
  Images.imgRaqueteTenis,
  Images.imgHalteres,
  Images.imgLuvaBoxeEverlast,
  Images.imgColchoneteYoga,
  Images.imgLuvaBoxe,
  Images.imgBolaFutebol,
  Images.imgBolaBasquete,
];

// Converte um produto vindo do banco (nome, preco, imagem...) para o formato
// que os cards da loja esperam (name, price, image...).
function mapearProduto(produto) {
  return {
    id: produto.id_produto,
    name: produto.nome,
    category: produto.categoria || "Geral",
    description: produto.descricao || "",
    price: Number(produto.preco),
    image: produto.imagem
      ? `${apiBaseURL}${produto.imagem}`
      : imagensLocais[(produto.id_produto - 1) % imagensLocais.length],
  };
}

// Produtos de reserva: aparecem enquanto a API nao responde (ou se estiver fora).
const fallbackProducts = [
  {
    id: 1,
    name: "Shaker Premium",
    category: "Recuperacao",
    description: "700ml, mola misturadora, tampa a prova de vazamento.",
    price: 49,
    rating: 4.8,
    reviews: 90,
    badge: "Top vendido",
    image: Images.imgPularCorda,
  },
  {
    id: 2,
    name: "Relogio Esportivo GPS",
    category: "Performance",
    description: "Monitor cardiaco, GPS, 20 modos esportivos. 7 dias de bateria.",
    price: 899,
    rating: 4.9,
    reviews: 432,
    badge: "Premium",
    image: Images.imgRaqueteTenis,
  },
  {
    id: 3,
    name: "Banda de Monitoramento",
    category: "Performance",
    description: "Passos, calorias, sono e frequencia cardiaca.",
    price: 299,
    rating: 4.7,
    reviews: 664,
    image: Images.imgHalteres,
  },
  {
    id: 4,
    name: "Pistola de Massagem",
    category: "Recuperacao",
    description: "6 cabecas, 30 velocidades, bateria 6h. Profissional.",
    price: 399,
    rating: 4.9,
    reviews: 987,
    badge: "Mais vendido",
    image: Images.imgLuvaBoxeEverlast,
  },
  {
    id: 5,
    name: "Rolo Miofascial 45cm",
    category: "Recuperacao",
    description: "Liberacao miofascial profunda. Alta densidade.",
    price: 79,
    rating: 4.7,
    reviews: 543,
    image: Images.imgColchoneteYoga,
  },
  {
    id: 6,
    name: "Hand Grip Ajustavel",
    category: "Equipamentos",
    description: "Fortalece antebraco e maos. Resistencia 10-40kg.",
    price: 39,
    rating: 4.5,
    reviews: 329,
    image: Images.imgLuvaBoxe,
  },
  {
    id: 7,
    name: "Mochila Esportiva 30L",
    category: "Equipamentos",
    description: "Compartimento para tenis, bolso termico e USB.",
    price: 249,
    rating: 4.8,
    reviews: 156,
    badge: "Novo",
    image: Images.imgBolaFutebol,
  },
  {
    id: 8,
    name: "Garrafa Termica 1L",
    category: "Performance",
    description: "Mantem frio por 24h. Aco inoxidavel com isolamento duplo.",
    price: 119,
    rating: 4.9,
    reviews: 814,
    badge: "Top",
    image: Images.imgBolaBasquete,
  },
  {
    id: 9,
    name: "Aveia Flocos Finos 1kg",
    category: "Alimentacao",
    description: "Rica em fibras e carboidratos de baixo indice glicemico.",
    price: 22,
    rating: 4.5,
    reviews: 231,
    image: Images.imgPlanoAlimentar,
  },
  {
    id: 10,
    name: "Pre-Treino Explosion",
    category: "Alimentacao",
    description: "Energia, foco e pump para treinos intensos. Sem jitter.",
    price: 129,
    rating: 4.8,
    reviews: 376,
    badge: "Novo",
    image: Images.imgTenisSlider,
  },
  {
    id: 11,
    name: "Vitaminas e Minerais",
    category: "Alimentacao",
    description: "Multivitaminico completo para atletas. 60 capsulas.",
    price: 59,
    rating: 4.8,
    reviews: 631,
    image: Images.imgBadmintonSlider,
  },
  {
    id: 12,
    name: "Snack Fit Mix 3x",
    category: "Alimentacao",
    description: "Mix de nuts, frutas secas e sementes. Lanche saudavel.",
    price: 49,
    rating: 4.4,
    reviews: 287,
    image: Images.imgVoleiSlider,
  },
  {
    id: 13,
    name: "Faixas de Compressao",
    category: "Recuperacao",
    description: "Recuperacao muscular ativa. Kit com 2 unidades.",
    price: 89,
    rating: 4.6,
    reviews: 845,
    image: Images.imgFutsalSlider,
  },
  {
    id: 14,
    name: "Kit Alongamento",
    category: "Recuperacao",
    description: "Faixas de flexibilidade com guia de exercicios.",
    price: 59,
    rating: 4.5,
    reviews: 221,
    image: Images.imgHandebolSlider,
  },
  {
    id: 15,
    name: "Corda de Pular Speed",
    category: "Equipamentos",
    description: "Rolamento duplo, cabo de aco e ajuste rapido.",
    price: 89,
    rating: 4.7,
    reviews: 765,
    image: Images.imgPularCorda,
  },
  {
    id: 16,
    name: "Luva de Treino",
    category: "Equipamentos",
    description: "Protecao e grip para musculacao e crossfit.",
    price: 69,
    rating: 4.6,
    reviews: 433,
    image: Images.imgLuvaBoxeEverlast,
  },
];

const sortOptions = ["Relevancia", "Menor preco", "Maior preco", "Mais avaliados"];

function OutlineTitle({ first, second }) {
  return (
    <h1 className="text-4xl font-black uppercase leading-[0.88] tracking-tight text-white sm:text-5xl">
      {first}
      <br />
      <span className="text-transparent [-webkit-text-stroke:1px_white]">{second}</span>
    </h1>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="group relative border border-white/10 bg-[#0d0d0d]">
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 bg-black px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white">
          {product.badge}
        </span>
      )}
      <button
        type="button"
        className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center border border-white/25 bg-black/60 text-xs text-white transition hover:bg-white hover:text-black"
        aria-label="Favoritar"
      >
        <i className="bi bi-heart" />
      </button>

      <div className="aspect-[1.05] overflow-hidden bg-zinc-200">
        <img className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105" src={product.image} alt={product.name} />
      </div>

      <div className="grid gap-3 p-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">{product.category}</p>
          <h2 className="mt-1 min-h-10 text-sm font-black uppercase leading-tight text-white">{product.name}</h2>
          <p className="mt-2 min-h-10 text-xs leading-relaxed text-zinc-500">{product.description}</p>
        </div>

        {product.rating && (
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <span className="text-white">★★★★★</span>
            <span>{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <strong className="text-lg font-black text-white">R$ {product.price}</strong>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="border border-white/15 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
          >
            <i className="bi bi-bag mr-2" />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Loja() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Relevancia");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(fallbackProducts);

  // Busca os produtos reais no back-end assim que a pagina abre.
  // Se a API nao responder, a loja continua funcionando com a lista de reserva.
  useEffect(() => {
    api
      .get("/produto")
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map(mapearProduto));
        }
      })
      .catch(() => {
        // sem conexao com a API: mantem o fallback
      });
  }, []);

  // Monta a lista de categorias a partir dos proprios produtos carregados.
  const categories = useMemo(() => {
    const nomes = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return ["Todos", ...nomes];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const byCategory = activeCategory === "Todos" || product.category === activeCategory;
      const bySearch = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
      return byCategory && bySearch;
    });

    if (sort === "Menor preco") filtered.sort((a, b) => a.price - b.price);
    if (sort === "Maior preco") filtered.sort((a, b) => b.price - a.price);
    if (sort === "Mais avaliados") filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return filtered;
  }, [activeCategory, search, sort, products]);

  const featured = products.slice(0, 4);

  function addToCart(product) {
    setCart((items) => [...items, product]);
  }

  return (
    <>
      <div className="lg:hidden">
        <LojaMobile products={products} onAddToCart={addToCart} cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      </div>

      <main className="hidden min-h-screen bg-[#101010] text-white lg:block">
      <section id="top" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-8 border-b border-white/10 pb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Sportly Store</p>
              <OutlineTitle first="Loja" second="Sportly" />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500">
                Produtos selecionados para sua evolucao fisica e mental.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="w-fit border border-white/20 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] transition hover:bg-white hover:text-black"
            >
              <i className="bi bi-bag mr-2" />
              Carrinho {cart.length > 0 && <span className="ml-2 text-zinc-400">{cart.length}</span>}
            </button>
          </div>

          <div className="grid gap-4">
            <label className="flex items-center gap-3 border border-white/15 px-4 py-3 text-zinc-500">
              <i className="bi bi-search text-sm" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar suplementos, equipamentos, alimentacao..."
              />
            </label>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 border px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] transition ${
                      activeCategory === category
                        ? "border-white bg-white text-black"
                        : "border-white/15 text-white hover:border-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="flex w-fit items-center gap-3 text-zinc-500">
                <i className="bi bi-sliders text-lg" />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="border border-white/20 bg-[#101010] px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      {activeCategory === "Todos" && !search && (
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="mb-10">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Destaque</p>
            <OutlineTitle first="Mais" second="vendidos" />
          </div>

          <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-10">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
            {activeCategory === "Todos" ? "Todos os produtos" : activeCategory}
          </p>
          <h2 className="text-3xl font-black uppercase text-white sm:text-4xl">
            {visibleProducts.length} produtos
          </h2>
        </div>

        <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-600">Sportly</p>
            <OutlineTitle first="Invista na" second="sua evolucao" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500">
              Os melhores atletas investem no seu desenvolvimento. A Sportly seleciona os melhores produtos para sua jornada.
            </p>
          </div>

          <a
            href="#top"
            className="w-fit border border-white/15 px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] transition hover:bg-white hover:text-black"
          >
            Explorar produtos <i className="bi bi-arrow-right ml-2" />
          </a>
        </div>
      </section>

      </main>

      {cartOpen && (
        <aside className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-white/15 bg-[#101010] text-white shadow-2xl shadow-black/80">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <h2 className="text-sm font-black uppercase tracking-[0.18em]">
              <i className="bi bi-bag mr-2" />
              Carrinho <span className="text-zinc-500">{cart.length}</span>
            </h2>
            <button type="button" onClick={() => setCartOpen(false)} className="text-xl text-zinc-400 transition hover:text-white" aria-label="Fechar carrinho">
              <i className="bi bi-x-lg" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="grid flex-1 place-items-center text-center text-zinc-500">
              <div>
                <i className="bi bi-bag text-5xl" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.25em]">Carrinho vazio</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-5">
              <div className="grid gap-3">
                {cart.map((item, index) => (
                  <article key={`${item.id}-${index}`} className="grid grid-cols-[72px_1fr] gap-3 border border-white/10 p-3">
                    <img className="h-20 w-full object-cover grayscale" src={item.image} alt={item.name} />
                    <div>
                      <h3 className="text-xs font-black uppercase">{item.name}</h3>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">{item.category}</p>
                      <p className="mt-3 text-sm font-black">R$ {item.price}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
