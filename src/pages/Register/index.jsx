import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import * as Images from "../../assets"; // imagens (logo e fundo) usadas na tela

function Register() {
  const [forca, setForca] = useState({ largura: "0%", cor: "bg-zinc-800", texto: "Minimo 8 caracteres" });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const inputNome = useRef();
  const inputEmail = useRef();
  const inputSenha = useRef();
  const inputConfirmSenha = useRef();

  // Mede a forca da senha enquanto o usuario digita (fraca / media / boa)
  const avaliarSenha = () => {
    const senha = inputSenha.current.value;
    const pontos = [
      /[A-Z]/.test(senha),
      /[a-z]/.test(senha),
      /[0-9]/.test(senha),
      /[\W_]/.test(senha),
      senha.length >= 8,
    ].filter(Boolean).length;

    if (!senha) setForca({ largura: "0%", cor: "bg-zinc-800", texto: "Minimo 8 caracteres" });
    else if (pontos <= 2) setForca({ largura: "33%", cor: "bg-red-500", texto: "Senha fraca" });
    else if (pontos <= 4) setForca({ largura: "66%", cor: "bg-amber-500", texto: "Senha media" });
    else setForca({ largura: "100%", cor: "bg-emerald-500", texto: "Senha boa" });
  };

  // Busca na API os usuarios ja cadastrados
  async function getUsers() {
    try {
      const usersFromApi = await api.get("/usuarios");
      setUsers(usersFromApi.data);
    } catch {
      setUsers([]);
    }
  }

  // Cadastra um novo usuario, validando os campos antes de enviar
  async function postUsers() {
    if (!inputNome.current.value || !inputEmail.current.value || !inputSenha.current.value) {
      alert("Preencha todos os campos antes de cadastrar!");
      return;
    }

    if (inputSenha.current.value !== inputConfirmSenha.current.value) {
      alert("As senhas nao coincidem!");
      return;
    }

    await api.post("/usuarios", {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      senha: inputSenha.current.value,
    });

    getUsers();
    inputNome.current.value = "";
    inputEmail.current.value = "";
    inputSenha.current.value = "";
    inputConfirmSenha.current.value = "";
    setForca({ largura: "0%", cor: "bg-zinc-800", texto: "Minimo 8 caracteres" });
  }

  // Ao abrir a tela, ja carrega a lista de usuarios
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="relative min-h-[calc(100vh-3rem)] overflow-hidden bg-black px-4 py-8 text-white">
      <div className="absolute inset-0 opacity-25 blur-sm">
        <img className="h-full w-full object-cover grayscale" src={Images.imgLuvaBoxeEverlast} alt="" />
      </div>
      <div className="absolute inset-0 bg-black/80" />

      <section className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-5xl place-items-center">
        <div className="grid max-h-[86vh] w-full max-w-4xl overflow-auto border border-white/15 bg-[#101010] shadow-2xl shadow-black/60 md:grid-cols-[0.85fr_1.15fr]">
          <aside className="flex min-h-[480px] flex-col border-b border-white/10 bg-black/45 p-7 md:border-b-0 md:border-r md:p-10">
            <img className="h-6 w-fit" src={Images.logoBrancaSportly} alt="Sportly" />

            <div className="mt-16">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Comece agora</p>
              <h1 className="mt-4 max-w-xs text-3xl font-black uppercase leading-tight">
                Sua jornada comeca aqui.
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

          <form className="relative grid gap-4 p-7 md:p-10" onSubmit={(event) => event.preventDefault()}>
            <Link className="absolute right-5 top-5 text-zinc-400 transition hover:text-white" to="/" aria-label="Fechar">
              <i className="bi bi-x-lg" />
            </Link>

            <div className="grid grid-cols-2 border border-white/15 text-[10px] font-black uppercase tracking-[0.2em]">
              <button type="button" onClick={() => navigate("/login")} className="px-4 py-3 text-zinc-400 transition hover:text-white">
                Entrar
              </button>
              <button type="button" className="bg-black px-4 py-3 text-white">
                Criar conta
              </button>
            </div>

            <button type="button" className="flex items-center justify-center gap-3 border border-white/15 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
              <img className="h-4 w-4" src={Images.logoGoogle} alt="" />
              Criar conta com Google
            </button>

            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
              <span className="h-px flex-1 bg-white/10" />
              ou preencha
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Nome completo
              <input className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/50" ref={inputNome} placeholder="Seu nome" />
            </label>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Email
              <input className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/50" type="email" ref={inputEmail} placeholder="seu@email.com" />
            </label>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Senha
              <input className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/50" type="password" ref={inputSenha} onChange={avaliarSenha} placeholder="Minimo 8 caracteres" />
              <span className="h-1 overflow-hidden bg-zinc-800">
                <span className={`block h-full transition-all ${forca.cor}`} style={{ width: forca.largura }} />
              </span>
              <span className="text-[10px] font-bold normal-case tracking-normal text-zinc-600">{forca.texto}</span>
            </label>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Confirmar senha
              <input className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/50" type="password" ref={inputConfirmSenha} placeholder="Repita a senha" />
            </label>

            <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Esporte favorito
              <select className="border border-white/15 bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-white/50">
                <option>Selecione um esporte</option>
                <option>Boxe</option>
                <option>Musculacao</option>
                <option>Natacao</option>
                <option>Yoga</option>
              </select>
            </label>

            <div className="grid gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Nivel atual
              <div className="grid grid-cols-3 gap-2">
                {["Iniciante", "Intermediario", "Avancado"].map((level) => (
                  <button key={level} type="button" className="border border-white/15 px-3 py-3 text-white transition hover:bg-white hover:text-black">
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={postUsers} className="bg-black px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black">
              Criar minha conta <i className="bi bi-arrow-right ml-2" />
            </button>

            <p className="text-center text-[10px] font-bold text-zinc-500">
              Ja tem conta?{" "}
              <button type="button" onClick={() => navigate("/login")} className="font-black text-white">
                Entrar
              </button>
            </p>

            {users.length > 0 && (
              <p className="text-center text-[10px] text-zinc-600">{users.length} usuario(s) carregado(s)</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
