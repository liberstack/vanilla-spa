import { startRouter } from "./router.js";

const outlet = document.getElementById("app");
const nav = document.getElementById("nav");

function buildNav(pages) {
  nav.innerHTML = pages
    .filter((p) => p.nav)
    .map(
      (p) =>
        `<li><a href="#${p.path}" data-path="${p.path}">${p.label}</a></li>`,
    )
    .join("");
}

function markActive(path) {
  nav.querySelectorAll("a").forEach((a) => {
    if (a.dataset.path === path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

async function init() {
  try {
    const res = await fetch(new URL("./data.json", import.meta.url));
    if (!res.ok) throw new Error(`data.json: HTTP ${res.status}`);
    const { site, pages } = await res.json();

    document
      .querySelectorAll("[data-site-name]")
      .forEach((el) => (el.textContent = site.name));
    document.getElementById("year").textContent = new Date().getFullYear();
    const mail = document.getElementById("foot-email");
    mail.textContent = site.email;
    mail.href = `mailto:${site.email}`;

    buildNav(pages);

    // O link "pular para o conteúdo" não pode mexer no hash (quebraria o router).
    document.querySelector(".skip").addEventListener("click", (e) => {
      e.preventDefault();
      outlet.focus();
    });

    await startRouter({ site, pages, outlet, onNavigate: markActive });
  } catch (err) {
    console.error(err);
    outlet.innerHTML =
      '<section class="wrap section"><h1>Erro ao carregar o site</h1><p class="lead">Não foi possível ler o pages.json. Se estiver rodando local, use um servidor (ex.: Live Server), não file://.</p></section>';
  }
}

init();
