// app.js — ponto de entrada, une config + router + ui

(function init() {
  // Monta a nav a partir do config
  UI.buildNav(CONFIG.routes);

  // Injeta o handler em cada rota
  const routes = CONFIG.routes.map((r) => ({
    ...r,
    handler: (route) => UI.renderPage(route),
  }));

  // Inicializa o router (404 inline, sem dependência de 404.js)
  Router.init(routes, () => UI.render404());
})();
