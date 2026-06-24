import { useEffect, useState } from "react";
import * as Images from "../../assets"; // icones e graficos do perfil
import api from "../../services/api";

// Cartoes de resumo (calorias, plano alimentar, sono) exibidos no topo.
const metrics = [
  { label: "Calorias queimadas", value: "1.850", icon: "bi bi-fire", tone: "text-orange-300" },
  { label: "Plano alimentar", value: "Ativo", image: Images.imgPlanoAlimentar, tone: "text-cyan-300" },
  { label: "Tempo de sono", value: "8h 40m", status: "Otimo", tone: "text-emerald-300" },
];

// Metas diarias do usuario (corrida, ciclismo...).
const goals = [
  { icon: Images.iconCorrida, title: "5 KM", progress: "0/5", status: "Pendente" },
  { icon: Images.iconCiclismo, title: "15 KM", progress: "0/15", status: "Concluido" },
];

function Profile() {
  const [usuario, setUsuario] = useState(null);

  // Busca os dados de quem esta logado na rota protegida /perfil, enviando
  // o token salvo no login pelo cabecalho Authorization. Se nao houver
  // token (ou ele estiver invalido/expirado), a tela continua no modo padrao.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/perfil", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setUsuario(data))
      .catch(() => {
        // token invalido ou expirado: mantem a tela no modo padrao
      });
  }, []);

  return (
    <main className="sportly-page px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex justify-end text-sm font-bold uppercase text-cyan-200">Sportlycoin: 0</div>

        <section className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="sportly-panel p-5">
            <div className="flex items-center gap-4 lg:flex-col lg:text-center">
              <div className="relative shrink-0">
                <img className="h-24 w-24 rounded-full border-4 border-cyan-300/30 object-cover" src={Images.photoUserSportly} alt="Usuario Sportly" />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow"
                  aria-label="Alterar foto"
                >
                  <img className="h-5 w-5" src={Images.iconCamera} alt="" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-black">{usuario ? usuario.nome : "Sportly"}</h1>
                <p className="text-sm font-semibold text-cyan-200">{usuario ? usuario.email : "Iniciante"}</p>
              </div>
            </div>

            <button type="button" className="sportly-button mt-6 w-full">
              <i className="bi bi-pencil-square" />
              Editar perfil
            </button>
          </aside>

          <section className="grid gap-5">
            <nav className="sportly-panel flex gap-2 overflow-x-auto p-3">
              {[
                ["bi bi-bullseye", "Minhas metas"],
                ["bi bi-bar-chart-line", "Estatisticas"],
                ["bi bi-trophy", "Conquistas"],
                ["bi bi-card-checklist", "Adicionar treino"],
              ].map(([icon, label]) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-cyan-200"
                >
                  <i className={icon} />
                  {label}
                </button>
              ))}
            </nav>

            <section className="grid gap-4 md:grid-cols-3">
              {metrics.map((metric) => (
                <article key={metric.label} className="sportly-panel flex min-h-40 flex-col items-center justify-center gap-2 p-5 text-center">
                  {metric.image ? (
                    <img className="h-16 w-16 object-contain" src={metric.image} alt="" />
                  ) : (
                    <i className={`${metric.icon} text-4xl ${metric.tone}`} />
                  )}
                  <h2 className={`text-3xl font-black ${metric.tone}`}>{metric.value}</h2>
                  <p className="text-sm font-semibold text-slate-300">{metric.label}</p>
                  {metric.status && <p className="text-sm font-bold text-emerald-300">{metric.status}</p>}
                </article>
              ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-[0.85fr_1.4fr]">
              <article className="sportly-panel p-5">
                <h2 className="text-xl font-black">Seu progresso</h2>
                <p className="mt-1 text-sm text-slate-400">Resistencia (min)</p>
                <div className="mt-5 rounded-lg bg-white p-4">
                  <img className="mx-auto h-52 w-full object-contain" src={Images.imgGrafico} alt="Grafico de progresso" />
                </div>
              </article>

              <article className="sportly-panel p-5">
                <h2 className="text-xl font-black">Metas diarias</h2>
                <div className="mt-5 grid gap-3">
                  {goals.map((goal) => (
                    <div key={goal.title} className="grid gap-3 rounded-lg border border-white/10 bg-white/5 p-4 sm:grid-cols-[64px_1fr_auto_auto] sm:items-center">
                      <img className="h-14 w-14 rounded-md bg-white/10 p-2 object-contain" src={goal.icon} alt="" />
                      <div>
                        <p className="text-lg font-black">{goal.title}</p>
                        <p className="text-sm text-slate-400">Meta do dia</p>
                      </div>
                      <p className="font-bold text-cyan-200">{goal.progress}</p>
                      <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm font-bold text-cyan-200">{goal.status}</span>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}

export default Profile;
