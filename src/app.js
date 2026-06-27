// app.js — ponto de entrada, une config + router + ui

(function init() {
  UI.buildNav(CONFIG.routes);

  const routes = CONFIG.routes.map((r) => ({
    ...r,
    handler: (route) => UI.renderPage(route),
  }));

  Router.init(routes, () => UI.render404());
})();
