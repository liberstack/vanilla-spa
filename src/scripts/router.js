// Hash router mínimo.
// Rotas vêm do pages.json. Cada rota pode ter um módulo em src/pages/<module>.js
// com `export default ({ site, page, pages }) => string` e, opcionalmente,
// `export function mount(outlet, ctx)` para ligar eventos depois do render.
// Sem "module" na rota, usa a view padrão (heading + lead).

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

export function getPath() {
  const raw = location.hash.slice(1).split("?")[0];
  const path = raw.startsWith("/") ? raw : "/" + raw;
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function defaultView({ page }) {
  return `
    <section class="wrap section">
      <h1>${page.heading ?? page.title}</h1>
      ${page.lead ? `<p class="lead">${page.lead}</p>` : ""}
    </section>`;
}

function notFoundView(path) {
  return `
    <section class="wrap section">
      <h1>Página não encontrada</h1>
      <p class="lead">O endereço <code>#${esc(path)}</code> não existe neste site.</p>
      <div class="actions"><a class="btn" href="#/">Voltar ao início</a></div>
    </section>`;
}

function errorView() {
  return `
    <section class="wrap section">
      <h1>Erro ao carregar a página</h1>
      <p class="lead">Recarregue a página. Se persistir, tente novamente mais tarde.</p>
    </section>`;
}

function setMeta(title, description) {
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.setAttribute("content", description);
}

export function startRouter({ site, pages, outlet, onNavigate }) {
  const byPath = new Map(pages.map((p) => [p.path, p]));
  let token = 0;
  let first = true;

  async function render() {
    const current = ++token;
    const path = getPath();
    const page = byPath.get(path);
    const ctx = { site, page, pages };
    let html;
    let mod = null;

    try {
      if (!page) {
        html = notFoundView(path);
        setMeta(`Página não encontrada — ${site.name}`);
      } else {
        mod = page.module ? await import(`../pages/${page.module}.js`) : null;
        html = await (mod ? mod.default(ctx) : defaultView(ctx));
        setMeta(`${page.title} — ${site.name}`, page.description);
      }
    } catch (err) {
      console.error(err);
      html = errorView();
      mod = null;
    }

    if (current !== token) return; // navegação mais nova assumiu

    outlet.innerHTML = html;
    if (mod && typeof mod.mount === "function") mod.mount(outlet, ctx);

    window.scrollTo(0, 0);
    if (!first) outlet.focus({ preventScroll: true });
    first = false;

    if (onNavigate) onNavigate(path);
  }

  window.addEventListener("hashchange", render);
  return render();
}
