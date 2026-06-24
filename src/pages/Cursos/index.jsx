import { useEffect, useMemo, useState } from "react";
import * as Images from "../../assets";
import api, { apiBaseURL } from "../../services/api";

// Imagens locais usadas como capa reserva quando o curso vem sem imagem da API.
const capasReserva = [
  Images.imgBasqueteSlider,
  Images.imgTenisSlider,
  Images.imgVoleiSlider,
  Images.imgFutsalSlider,
  Images.imgHandebolSlider,
  Images.imgBadmintonSlider,
];

// Cursos de reserva: aparecem enquanto a API nao responde.
const fallbackCourses = [
  { title: "Basquete: fundamentos", level: "Iniciante", lessons: 18, image: Images.imgBasqueteSlider },
  { title: "Tenis para evoluir saque", level: "Intermediario", lessons: 14, image: Images.imgTenisSlider },
  { title: "Volei: defesa e recepcao", level: "Iniciante", lessons: 16, image: Images.imgVoleiSlider },
  { title: "Futsal: movimentacao", level: "Avancado", lessons: 22, image: Images.imgFutsalSlider },
  { title: "Handebol: arremesso", level: "Intermediario", lessons: 12, image: Images.imgHandebolSlider },
  { title: "Badminton essencial", level: "Iniciante", lessons: 10, image: Images.imgBadmintonSlider },
];

// Converte um curso do banco (titulo, carga_horaria...) para o formato do card.
// nivel e imagem sao opcionais: se nao vierem, usamos uma capa local e escondemos o selo.
function mapearCurso(curso, indice) {
  return {
    title: curso.titulo,
    level: curso.nivel || null,
    lessons: curso.carga_horaria,
    image: curso.imagem
      ? `${apiBaseURL}${curso.imagem}`
      : capasReserva[indice % capasReserva.length],
  };
}

export default function Cursos() {
  const [courses, setCourses] = useState(fallbackCourses);

  // Busca os cursos reais no back-end quando a pagina carrega.
  useEffect(() => {
    api
      .get("/curso")
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data.map(mapearCurso));
        }
      })
      .catch(() => {
        // sem conexao com a API: mantem os cursos de reserva
      });
  }, []);

  // Filtro de busca simples por titulo/nivel (roda no proprio cliente).
  const [busca, setBusca] = useState("");
  const cursosVisiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return courses;
    return courses.filter((c) =>
      `${c.title} ${c.level || ""}`.toLowerCase().includes(termo)
    );
  }, [courses, busca]);

  return (
    <main className="sportly-page px-4 py-6 sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        {/* Cabecalho da pagina + campo de busca */}
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Cursos</p>
            <h1 className="mt-2 text-3xl font-black uppercase sm:text-5xl">Aprenda com treinos guiados</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Escolha uma modalidade, acompanhe aulas e organize sua evolucao em uma experiencia pronta para desktop e mobile.
            </p>
          </div>
          <div className="sportly-panel grid gap-3 p-4">
            <label className="text-sm font-bold text-slate-300" htmlFor="course-search">
              Buscar curso
            </label>
            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-slate-950">
              <i className="bi bi-search" />
              <input
                id="course-search"
                className="min-w-0 flex-1 bg-transparent outline-none"
                placeholder="Modalidade ou nivel"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filtros rapidos (visuais por enquanto) */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {["Todos", "Quadra", "Condicionamento", "Tecnica", "Favoritos"].map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold ${
                index === 0 ? "border-cyan-300 bg-cyan-400 text-slate-950" : "border-white/10 text-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grade de cursos */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cursosVisiveis.map((course, index) => (
            <article key={`${course.title}-${index}`} className="overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-xl shadow-black/20">
              <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
              <div className="grid gap-4 p-5">
                <div>
                  {/* O selo de nivel so aparece se o curso tiver essa informacao */}
                  {course.level && (
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black uppercase text-cyan-200">{course.level}</span>
                  )}
                  <h2 className="mt-3 text-xl font-black">{course.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{course.lessons}h de conteudo</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/3 rounded-full bg-cyan-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">33%</span>
                </div>
                <button type="button" className="sportly-button w-full">
                  <i className="bi bi-play-fill" />
                  Continuar
                </button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
