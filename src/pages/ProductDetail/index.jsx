import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Images from "../../assets";
import api, { apiBaseURL } from "../../services/api";

// Converte o produto do banco para o formato usado nesta tela de detalhe.
// Specs detalhadas nao existem no banco, entao reaproveitamos as do exemplo.
function mapearProdutoDetalhe(p, reserva) {
  const preco = Number(p.preco);
  return {
    title: p.nome,
    price: `R$ ${preco.toFixed(2).replace(".", ",")}`,
    installments: p.parcela_qtd
      ? `ou ${p.parcela_qtd}x de R$ ${Number(p.parcela_valor).toFixed(2).replace(".", ",")} sem juros`
      : "",
    description: p.descricao || reserva.description,
    category: p.categoria || reserva.category,
    specs: reserva.specs,
    images: [p.imagem ? `${apiBaseURL}${p.imagem}` : reserva.images[0]],
  };
}

// Produto de exemplo: usado enquanto a API nao responde.
const produtoFallback = {
  title: "Produto Premium",
  price: "R$ 89,90",
  installments: "ou 12x de R$ 7,49 sem juros",
  description: "Produto esportivo com acabamento resistente, indicado para treinos frequentes e uso em quadras internas ou externas.",
  category: "Basquete",
  specs: [
    ["Tamanho", "Oficial (Tamanho 7)"],
    ["Material", "Couro sintetico"],
    ["Peso", "600g"],
    ["Cor", "Laranja com detalhes pretos"],
    ["Indicacao", "Quadras internas e externas"],
    ["Marca", "Nike"],
    ["Garantia", "90 dias"],
  ],
  images: [Images.imgBolaBasquete, Images.imgBolaFutebolAdidas, Images.imgLuvaBoxeEverlast],
};

function ProductDetail() {
  const { id_produto } = useParams();
  const [product, setProduct] = useState(produtoFallback);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(produtoFallback.images[0]);

  // Busca o produto especifico pelo id que veio na URL (/productDetail/:id_produto).
  useEffect(() => {
    if (!id_produto) return;
    api
      .get(`/produto/${id_produto}`)
      .then(({ data }) => {
        const dados = Array.isArray(data) ? data[0] : data;
        if (dados) {
          const mapeado = mapearProdutoDetalhe(dados, produtoFallback);
          setProduct(mapeado);
          setActiveImage(mapeado.images[0]);
        }
      })
      .catch(() => {
        // sem conexao com a API: mantem o produto de exemplo
      });
  }, [id_produto]);

  return (
    <main className="sportly-page px-4 py-6 sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link className="font-bold text-cyan-200 hover:text-cyan-100" to="/">
            Inicio
          </Link>
          <span>/</span>
          <Link className="font-bold text-cyan-200 hover:text-cyan-100" to="/">
            Produtos
          </Link>
          <span>/</span>
          <span>Produto #{id_produto}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <section className="sportly-panel p-4 sm:p-6">
            <div className="flex aspect-square max-h-[520px] items-center justify-center rounded-lg bg-white p-6">
              <img className="h-full w-full object-contain" src={activeImage} alt={product.title} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`flex aspect-square items-center justify-center rounded-lg border bg-white p-3 transition ${
                    activeImage === image ? "border-cyan-300 ring-2 ring-cyan-300" : "border-white/10 hover:border-cyan-300"
                  }`}
                >
                  <img className="h-full w-full object-contain" src={image} alt="" />
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-5">
            <div>
              <h1 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">{product.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="text-yellow-300">★★★★★</div>
                <span className="text-sm text-slate-400">(127 avaliacoes)</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black uppercase text-emerald-300">
                  Produto disponivel
                </span>
              </div>
            </div>

            <div className="sportly-panel p-5">
              <p className="text-4xl font-black text-emerald-300">{product.price}</p>
              <p className="mt-1 text-sm text-slate-400">{product.installments}</p>
              <p className="mt-5 leading-relaxed text-slate-300">{product.description}</p>
            </div>

            <div className="sportly-panel p-5">
              <h2 className="text-xl font-black">Especificacoes</h2>
              <dl className="mt-4 grid gap-3">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-slate-400">Categoria</dt>
                  <dd className="font-bold text-white">{product.category}</dd>
                </div>
                {product.specs.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <dt className="text-slate-400">{label}</dt>
                    <dd className="text-right font-bold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="sportly-panel p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold">Quantidade</span>
                <div className="inline-flex w-fit overflow-hidden rounded-md border border-white/10">
                  <button type="button" className="h-11 w-11 text-xl font-bold hover:bg-white/10" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                    -
                  </button>
                  <input
                    className="h-11 w-16 bg-transparent text-center font-bold outline-none"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                  />
                  <button type="button" className="h-11 w-11 text-xl font-bold hover:bg-white/10" onClick={() => setQuantity((value) => value + 1)}>
                    +
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button type="button" className="sportly-button py-3 uppercase">
                  Comprar agora
                </button>
                <button type="button" className="sportly-button-secondary py-3 uppercase">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
