function FooterMobile() {
  // Rodape do mobile (mesmas colunas, layout em 2 colunas).
  const columns = [
    ["Plataforma", "Cursos", "Comunidade", "Jogo Fitness", "Inteligencia artificial"],
    ["Esportes", "Futebol", "Basquete", "Natacao", "Corrida", "Tenis"],
    ["Empresa", "Sobre nos", "Blog", "Parceiros", "Contato"],
    ["Legal", "Termos de uso", "Privacidade", "Cookies"],
  ];

  return (
    <footer className="bg-[#1a1a1a] px-5 py-10 text-white md:hidden">
      <h2 className="text-xl font-black uppercase">Sportly.</h2>
      <p className="mt-6 text-sm leading-relaxed text-zinc-500">
        A plataforma completa para sua evolucao esportiva.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-10">
        {columns.map(([title, ...links]) => (
          <div key={title}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">{title}</h3>
            <ul className="mt-5 grid gap-4 text-sm text-zinc-500">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-white/10 pt-8 text-center">
        <p className="text-sm text-zinc-500">2026 sportly. todos os direitos reservados.</p>
        <div className="mt-6 flex justify-center gap-8 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Youtube</a>
        </div>
      </div>
    </footer>
  );
}

export default FooterMobile;
