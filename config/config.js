const CONFIG = {
  site: {
    name: "Meu Site",
    description: "Site pessoal simples e direto.",
    lang: "pt-BR",
  },

  routes: [
    { path: "/", label: "Home", file: "pages/home.html", nav: true },
    { path: "/about", label: "Sobre", file: "pages/about.html", nav: true },
    {
      path: "/contact",
      label: "Contato",
      file: "pages/contact.html",
      nav: true,
    },
  ],
};
