function Footer() {
  // Rodape do desktop. Colunas de links agrupados por tema.
  const columns = [
    ["Plataforma", "Cursos", "Comunidade", "Loja Fitness", "Inteligencia artificial"],
    ["Esportes", "Futebol", "Basquete", "Natacao", "Corrida", "Tenis"],
    ["Empresa", "Sobre nos", "Blog", "Carreiras", "Contato"],
    ["Legal", "Termos de uso", "Privacidade", "Cookies"],
  ];

  return (
    <footer className="hidden border-t border-white/10 bg-black px-8 py-16 text-white md:block">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-5">
        <div>
          <h2 className="text-xl font-black uppercase text-zinc-300">Sportly</h2>
          <p className="mt-6 max-w-48 text-sm font-bold leading-relaxed text-zinc-500">
            A plataforma completa para sua evolucao esportiva.
          </p>
        </div>

        {columns.map(([title, ...links]) => (
          <div key={title}>
            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{title}</h3>
            <ul className="mt-6 grid gap-4 text-sm font-black text-zinc-500">
              {links.map((link) => (
                <li key={link}>
                  <a className="transition hover:text-white" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl items-center justify-between text-xs font-black uppercase tracking-[0.12em] text-zinc-500">
        <p>2026 sportly. todos os direitos reservados.</p>
        <div className="flex gap-8">
          <a className="hover:text-white" href="#">Instagram</a>
          <a className="hover:text-white" href="#">Twitter</a>
          <a className="hover:text-white" href="#">Youtube</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
