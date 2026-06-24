const CONFIG = {
  site: {
    name: "MD-driven JavaScript SPA",
    description: "Portfolio e projetos pessoais",
    lang: "pt-BR",
  },

  // Cada rota mapeia um hash para um arquivo .md dentro de pages/
  routes: [
    { path: "/", page: "home", label: "Home", file: "pages/home.md" },
    {
      path: "/projetos",
      page: "projetos",
      label: "Projetos",
      file: "pages/projetos.md",
    },
    {
      path: "/contato",
      page: "contato",
      label: "Contato",
      file: "pages/contato.md",
    },
    {
      path: "/legal",
      page: "legal",
      label: "Legal",
      file: "pages/legal.md",
      nav: false, // fica no footer, não na nav principal
    },
  ],

  // Rota usada quando nenhuma bate
  notFound: {
    page: "404",
    label: "Página não encontrada",
  },
};
