import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import * as Images from "../../assets"; // imagens (logo e fundo) usadas na tela

function Login() {
  const navigate = useNavigate();
  const inputEmail = useRef();
  const inputSenha = useRef();

  // Funcao de login: valida os campos, chama a API e guarda o token
  const loginUser = async () => {
    // Sem email ou senha nao adianta tentar
    if (!inputEmail.current.value || !inputSenha.current.value) {
      alert("Preencha todos os campos antes de entrar!");
      return;
    }

    try {
      const response = await api.post("/login", {
        email: inputEmail.current.value,
        senha: inputSenha.current.value,
      });

      // Token salvo no navegador para manter o usuario logado
      localStorage.setItem("token", response.data.token);
      // Deu certo: volta para a Home
      navigate("/");
    } catch (err) {
      // A API devolve a mensagem de erro (email/senha invalidos, etc.)
      alert(err.response?.data?.error || "Erro ao fazer login");
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-3rem)] overflow-hidden bg-black px-4 py-8 text-white">
      <div className="absolute inset-0 opacity-30 blur-sm">
        <img className="h-full w-full object-cover grayscale" src={Images.imgLuvaBoxeEverlast} alt="" />
      </div>
      <div className="absolute inset-0 bg-black/75" />

      <section className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-5xl place-items-center">
        <div className="grid w-full max-w-4xl border border-white/15 bg-[#101010] shadow-2xl shadow-black/60 md:grid-cols-[0.85fr_1.15fr]">
          <aside className="flex min-h-[420px] flex-col border-b border-white/10 bg-black/45 p-7 md:border-b-0 md:border-r md:p-10">
            <img className="h-6 w-fit" src={Images.logoBrancaSportly} alt="Sportly" />

            <div className="mt-16">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Bem-vindo de volta</p>
              <h1 className="mt-4 max-w-xs text-3xl font-black uppercase leading-tight">
                Pronto para treinar hoje?
              </h1>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
                Comece sua jornada e evolua no seu esporte favorito.
              </p>
            </div>

            <div className="mt-auto grid gap-5 border-t border-white/10 pt-6">
              {[
                ["+50k", "Atletas ativos"],
                ["200+", "Cursos disponiveis"],
                ["98%", "Satisfacao"],
              ].map(([value, label]) => (
                <div key={label} className="flex items-center gap-5">
                  <strong className="text-2xl font-black">{value}</strong>
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">{label}</span>
                </div>
              ))}
            </div>
          </aside>

          <form className="relative grid gap-5 p-7 md:p-10" onSubmit={(event) => event.preventDefault()}>
            <Link className="absolute right-5 top-5 text-zinc-400 transition hover:text-white" to="/" aria-label="Fechar">
              <i className="bi bi-x-lg" />
            </Link>

            <div className="grid grid-cols-2 border border-white/15 text-[10px] font-black uppercase tracking-[0.2em]">
              <button type="button" className="bg-black px-4 py-3 text-white">
                Entrar
              </button>
              <button type="button" onClick={() => navigate("/register")} className="px-4 py-3 text-zinc-400 transition hover:text-white">
                Criar conta
              </button>
            </div>

            <button type="button" className="flex items-center justify-center gap-3 border border-white/15 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
              <img className="h-4 w-4" src={Images.logoGoogle} alt="" />
              Entrar com Google
            </button>

            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
              <span className="h-px flex-1 bg-white/10" />
              ou
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Email
              <input
                className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/50"
                type="email"
                ref={inputEmail}
                placeholder="seu@email.com"
              />
            </label>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Senha
              <input
                className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/50"
                type="password"
                ref={inputSenha}
                placeholder="********"
              />
            </label>

            <button type="button" className="-mt-2 justify-self-end text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 transition hover:text-white">
              Esqueci minha senha
            </button>

            <button type="button" onClick={loginUser} className="bg-black px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black">
              Entrar <i className="bi bi-arrow-right ml-2" />
            </button>

            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
              <span className="h-px flex-1 bg-white/10" />
              outras opcoes
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button type="button" className="border border-white/15 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
                Apple
              </button>
              <button type="button" className="border border-white/15 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
                Facebook
              </button>
            </div>

            <p className="text-center text-[10px] font-bold text-zinc-500">
              Nao tem conta?{" "}
              <button type="button" onClick={() => navigate("/register")} className="font-black text-white">
                Criar conta gratis
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
