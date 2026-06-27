// router.js — escuta mudanças de hash e despacha para o handler certo

const Router = (() => {
  let _routes = [];
  let _notFound = null;

  function init(routes, notFoundHandler) {
    _routes = routes;
    _notFound = notFoundHandler;
    window.addEventListener("hashchange", _resolve);
    _resolve();
  }

  function _currentPath() {
    return window.location.hash.replace(/^#/, "") || "/";
  }

  function _resolve() {
    const path = _currentPath();
    const route = _routes.find((r) => r.path === path);
    if (route) {
      route.handler(route);
    } else {
      _notFound && _notFound();
    }
  }

  function navigate(path) {
    window.location.hash = path;
  }

  return { init, navigate };
})();
