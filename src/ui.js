// ui.js — tudo que toca o DOM

const UI = (() => {
  const _content = () => document.getElementById("content");
  const _navLinks = () => document.querySelectorAll("nav a");

  // Converte markdown em HTML
  function _render(markdown) {
    return marked.parse(markdown);
  }

  // Renderiza um arquivo markdown no #content
  async function renderPage(route) {
    _setLoading();
    _setActiveNav(route.path);

    try {
      const res = await fetch(route.file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();

      _content().innerHTML = `<div class="md-body">${_render(text)}</div>`;
      document.title = `${route.label} — ${CONFIG.site.name}`;
    } catch (err) {
      _content().innerHTML = `<p class="error">Erro ao carregar a página. (${err.message})</p>`;
    }
  }

  // Página 404
  function render404() {
    _content().innerHTML = `
      <div class="md-body not-found">
        <h1>404</h1>
        <p>Página não encontrada.</p>
        <a href="#/">← Voltar para home</a>
      </div>`;
    document.title = `404 — ${CONFIG.site.name}`;
    _setActiveNav(null);
  }

  // Monta a nav dinamicamente a partir do config
  function buildNav(routes) {
    const nav = document.getElementById("nav-links");
    if (!nav) return;
    nav.innerHTML = routes
      .filter((r) => r.nav !== false)
      .map((r) => `<a href="#${r.path}" data-path="${r.path}">${r.label}</a>`)
      .join("");
  }

  function _setLoading() {
    _content().innerHTML = `<p class="loading">Carregando…</p>`;
  }

  function _setActiveNav(activePath) {
    _navLinks().forEach((a) => {
      a.classList.toggle("active", a.dataset.path === activePath);
    });
  }

  return { renderPage, render404, buildNav };
})();
