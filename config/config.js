const CONFIG = {
  site: {
    name: "Meu Site",
    description: "Site pessoal simples e direto.",
    lang: "pt-BR",
  },

  routes: [
    { path: "/", label: "Home", file: "pages/home.html", nav: true },
    { path: "/about", label: "About", file: "pages/about.html", nav: true },
    {
      path: "/work",
      label: "Work",
      file: "pages/work.html",
      nav: true,
    },
    {
      path: "/contact",
      label: "Contact",
      file: "pages/contact.html",
      nav: true,
    },
    {
      path: "/legal",
      label: "Legal",
      file: "pages/legal.html",
      nav: false,
    },
  ],
};
