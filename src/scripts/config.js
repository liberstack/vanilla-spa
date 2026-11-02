const CONFIG = {
  site: {
    name: "Meu Site",
    description: "Site pessoal simples e direto.",
    lang: "pt-BR",
  },

  routes: [
    { path: "/", label: "Home", file: "src/pages/home.html", nav: true },
    { path: "/about", label: "About", file: "src/pages/about.html", nav: true },
    {
      path: "/work",
      label: "Work",
      file: "src/pages/work.html",
      nav: true,
    },
    {
      path: "/contact",
      label: "Contact",
      file: "src/pages/contact.html",
      nav: true,
    },
    {
      path: "/legal",
      label: "Legal",
      file: "src/pages/legal.html",
      nav: false,
    },
  ],
};
