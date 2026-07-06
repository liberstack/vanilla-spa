# vanilla-spa

Boilerplate para SPA estática com HTML, CSS e JavaScript vanilla. Sem frameworks, sem build step, sem dependências.

## Stack

- HTML puro para estrutura e conteúdo das páginas
- CSS com variáveis customizadas
- JavaScript vanilla com roteamento hash-based
- Deploy via GitHub Pages ou Cloudflare Pages

## Estrutura

```
config/
  config.js       ← rotas, nome do site, idioma
pages/
  home.html       ← fragmentos HTML das páginas
  about.html
  contact.html
src/
  app.js          ← ponto de entrada
  router.js       ← hash router
  ui.js           ← manipulação do DOM
404.html          ← fallback para GitHub Pages
index.html        ← shell da SPA
style.css         ← visual completo
```

## Arquitetura

O `index.html` é o shell fixo — header, nav, main e footer. O conteúdo de cada página fica em `pages/*.html` como fragmentos HTML puros, sem boilerplate. O `router.js` escuta mudanças de hash e o `ui.js` faz fetch do fragmento e injeta no `#content`.

A nav é gerada automaticamente a partir das rotas definidas no `config.js`.

## Como adicionar uma página

**1. Criar o fragmento:**

```html
<!-- pages/blog.html -->
<h1>Blog</h1>
<p>Conteúdo da página.</p>
```

**2. Registrar a rota no `config.js`:**

```js
{ path: "/blog", label: "Blog", file: "pages/blog.html", nav: true }
```

Pronto. A nav atualiza automaticamente.

## Como rodar localmente

Requer um servidor local — não abre via `file://` direto no browser.

Com VS Code, use a extensão Live Server. Pela linha de comando:

```bash
npx serve .
```

## Deploy

Veja o [DEPLOY.md](./DEPLOY.md). 