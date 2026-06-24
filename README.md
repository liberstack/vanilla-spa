# SPA Markdown Boilerplate

SPA vanilla JS que usa arquivos `.md` como páginas. Sem build, sem framework, sem dependências locais. O JavaScript é engrenagem — o conteúdo vive em Markdown.

---

## Estrutura

```
/
├── index.html                  # shell único da aplicação
├── style.css                   # tema dark, estilos do md-body
├── 404.html                    # fallback estático para servidor
├── config/
│   └── config.js               # source of truth: rotas, nome do site, lang
├── src/
│   ├── app.js                  # bootstrap — une config, router e ui
│   ├── router.js               # hash router (#/ → rota)
│   ├── ui.js                   # fetch + marked.parse + manipulação de DOM
│   └── 404.js                  # handler isolado de not found
└── pages/
    ├── home.md
    ├── projetos.md
    ├── contato.md
    └── legal.md
```

---

## Como funciona

1. `config.js` declara as rotas — cada uma com `path`, `label` e `file` (caminho do `.md`)
2. `app.js` injeta o handler `UI.renderPage(route)` em cada rota e inicializa o router
3. `router.js` escuta `hashchange` → resolve qual rota bate → chama o handler
4. `ui.js` faz `fetch(route.file)`, passa o texto para `marked.parse()` e injeta o HTML no `#content`

Dependência externa única: [marked.js](https://marked.js.org/) via CDN.

---

## Rodando localmente

Qualquer servidor HTTP serve. Não funciona com `file://` porque o `fetch` dos `.md` precisa de HTTP.

```bash
# opção 1 — Node
npx serve .

# opção 2 — Python
python -m http.server 3000

# opção 3 — VS Code
# Live Server extension → botão "Go Live"
```

---

## Adicionando uma página

**1. Crie o arquivo em `pages/`:**

```
pages/nova-pagina.md
```

**2. Adicione a rota em `config/config.js`:**

```js
{ path: "/nova-pagina", page: "nova-pagina", label: "Nova Página", file: "pages/nova-pagina.md" }
```

Pronto. A nav é gerada automaticamente a partir do config.

---

## Páginas no footer (sem aparecer na nav)

No `ui.js`, o `buildNav` filtra por label:

```js
.filter((r) => r.label !== "Legal")
```

Adicione o label da página que deve ficar só no footer. O link do footer fica hardcoded no `index.html`.

---

## Customizando o site

Tudo que identifica o site fica em `config/config.js`:

```js
const CONFIG = {
  site: {
    name: "Seu Nome",
    description: "Descrição do site",
    lang: "pt-BR",
  },
  routes: [ ... ],
};
```

Nome, lang e copyright do footer são injetados automaticamente no `index.html` via JS.

---

## Deploy

Funciona em qualquer host de arquivos estáticos:

- **GitHub Pages** — push na branch `main` ou `gh-pages`
- **Netlify / Vercel** — drag and drop da pasta ou conecta o repo
- **Cloudflare Pages** — idem

Nenhum passo de build necessário.

---

## Stack

- HTML · CSS · Vanilla JS
- [marked.js](https://marked.js.org/) via CDN

---

## Licença

MIT