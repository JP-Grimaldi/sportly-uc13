import { useNavigate } from "react-router-dom";
import * as Images from "../../assets"; // imagens dos cards e do hero

// Categorias de esporte exibidas na grade da Home (conteudo da landing).
const categories = [
  { eyebrow: "Combate", title: "Boxe", lessons: "24 licoes", image: Images.imgLuvaBoxeEverlast },
  { eyebrow: "Mente e corpo", title: "Yoga", lessons: "18 licoes", image: Images.imgColchoneteYoga },
  { eyebrow: "Aquatico", title: "Natacao", lessons: "16 licoes", image: Images.imgVoleiSlider },
  { eyebrow: "Forca", title: "Musculacao", lessons: "22 licoes", image: Images.imgHalteres10kg },
  { eyebrow: "Radical", title: "Surf", lessons: "12 licoes", image: Images.imgBadmintonSlider },
  { eyebrow: "Aventura", title: "Escalada", lessons: "7 licoes", image: Images.imgTenisDeMesaSlider },
];

// Instrutores em destaque mostrados no fim da pagina.
const instructors = [
  { name: "Ana Ferreira", role: "Treinamento funcional", image: Images.photoUserSportly, rating: "4.9", students: "1.2k alunos" },
  { name: "Mestre Okamoto", role: "Artes marciais", image: Images.imgBadmintonSlider, rating: "4.8", students: "980 alunos" },
  { name: "Carla Santos", role: "Tenis de alto nivel", image: Images.imgTenisSlider, rating: "4.9", students: "2.1k alunos" },
  { name: "Diego Rocha", role: "Basquete total", image: Images.imgBasqueteSlider, rating: "4.9", students: "870 alunos" },
];

function OutlineTitle({ first, second }) {
  return (
    <h2 className="text-4xl font-black uppercase leading-[0.88] tracking-tight text-white sm:text-5xl">
      {first}
      <br />
      <span className="text-transparent [-webkit-text-stroke:1px_white]">{second}</span>
    </h2>
  );
}

function ImageTile({ item, className = "" }) {
  return (
    <article className={`group relative min-h-72 overflow-hidden bg-zinc-900 ${className}`}>
      <img className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105" src={item.image} alt={item.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{item.eyebrow}</p>
        <h3 className="mt-1 text-3xl font-black uppercase leading-none text-white">{item.title}</h3>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">{item.lessons}</p>
      </div>
      <button
        type="button"
        className="absolute bottom-5 right-5 flex h-7 w-7 items-center justify-center border border-white/20 bg-black/50 text-xs text-white transition group-hover:bg-white group-hover:text-black"
        aria-label={`Abrir ${item.title}`}
      >
        <i className="bi bi-arrow-up-right" />
      </button>
    </article>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Hero principal: imagem de fundo + chamada para acao */}
      <section className="relative min-h-[calc(100vh-3rem)] overflow-hidden border-b border-white/10">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
          src={Images.imgLuvaBoxeEverlast}
          alt="Atleta Sportly"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,transparent_0,rgba(0,0,0,0.42)_30%,#0d0d0d_76%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-[#0d0d0d]" />
        <p className="absolute right-8 top-8 hidden text-7xl font-black leading-none text-white/5 md:block">001</p>

        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col justify-center px-5 py-16 sm:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400">Seu proximo corpo aqui</p>
            <h1 className="text-6xl font-black uppercase leading-[0.82] tracking-tight text-white sm:text-8xl md:text-9xl">
              Sport<span className="text-transparent [-webkit-text-stroke:2px_white]">ly</span>.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400">
              Aprenda um esporte novo, evolua no que voce ama. Cursos com profissionais de treino, comunidade ativa e uma IA para guiar sua jornada.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/cursos")}
                className="border border-white bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black transition hover:bg-cyan-300"
              >
                Explorar
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="border border-white/25 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                Assinar
              </button>
            </div>
          </div>

          <div className="mt-20">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Categorias</p>
            <OutlineTitle first="Encontre" second="seu esporte" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="mb-10">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Categorias</p>
          <OutlineTitle first="Encontre" second="seu esporte" />
        </div>

        <div className="grid gap-px bg-zinc-800 md:grid-cols-3">
          {categories.map((category) => (
            <ImageTile key={category.title} item={category} />
          ))}
        </div>
      </section>

      <section className="bg-[#101010]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="mb-10">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-cyan-500">Destaques</p>
            <OutlineTitle first="Atletas &" second="historias" />
          </div>

          <div className="grid gap-px bg-zinc-800 lg:grid-cols-[1.45fr_0.75fr]">
            <article className="group relative min-h-[560px] overflow-hidden bg-zinc-900">
              <img className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105" src={Images.imgLuvaBoxe} alt="A arte de lutar" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 max-w-lg p-6 sm:p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Combate</p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-none sm:text-4xl">
                  A arte de lutar
                  <br />
                  sem limites
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  Aprenda com os melhores lutadores do Brasil. Curso de MMA do absoluto zero ao avancado.
                </p>
                <button type="button" onClick={() => navigate("/cursos")} className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  Ver curso <i className="bi bi-arrow-right" />
                </button>
              </div>
            </article>

            <div className="grid gap-px">
              <ImageTile item={{ eyebrow: "Artes marciais", title: "Tecnica que domina o solo", lessons: "", image: Images.imgBadmintonSlider }} className="min-h-64" />
              <ImageTile item={{ eyebrow: "Forca", title: "Forca sem desculpas", lessons: "", image: Images.imgHalteres }} className="min-h-64" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Instrutores</p>
            <OutlineTitle first="Aprenda com" second="os melhores" />
          </div>
          <button type="button" className="self-start text-[10px] font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:text-white sm:self-end">
            Todos os instrutores <i className="bi bi-arrow-right" />
          </button>
        </div>

        <div className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <article key={instructor.name} className="bg-[#0d0d0d]">
              <img className="h-72 w-full object-cover grayscale" src={instructor.image} alt={instructor.name} />
              <div className="p-4">
                <h3 className="text-sm font-black uppercase">{instructor.name}</h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">{instructor.role}</p>
                <div className="mt-3 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
                  <span>
                    <i className="bi bi-star-fill text-white" /> {instructor.rating}
                  </span>
                  <span>{instructor.students}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
