# vanilla-spa

Uma SPA (Single Page Application) feita apenas com HTML, CSS e JavaScript puro. Sem framework, sem bundler, sem etapa de build. O projeto também serve como tutorial: o código é pequeno o bastante para ser lido inteiro e organizado em camadas para mostrar como separar responsabilidades sem depender de ferramentas externas.

---

## Sumário

- [vanilla-spa](#vanilla-spa)
  - [Sumário](#sumário)
  - [O que você vai aprender](#o-que-você-vai-aprender)
  - [Como rodar](#como-rodar)
  - [Estrutura de pastas](#estrutura-de-pastas)
  - [A arquitetura em camadas](#a-arquitetura-em-camadas)
    - [Camada 1: Dados (`config.js`)](#camada-1-dados-configjs)
    - [Camada 2: Navegação (`router.js`)](#camada-2-navegação-routerjs)
    - [Camada 3: Visão (`ui.js`)](#camada-3-visão-uijs)
    - [Camada 4: Composição (`main.js`)](#camada-4-composição-mainjs)
  - [Fluxo de uma navegação](#fluxo-de-uma-navegação)
  - [Passo a passo: adicionando uma página](#passo-a-passo-adicionando-uma-página)
  - [Por que a ordem dos scripts importa](#por-que-a-ordem-dos-scripts-importa)
  - [Decisões de projeto](#decisões-de-projeto)
  - [Limitações conhecidas](#limitações-conhecidas)
  - [Próximos passos](#próximos-passos)
  - [Licença](#licença)

---

## O que você vai aprender

- Como funciona um **roteador por hash** (`#/rota`) na prática.
- Como carregar páginas (fragmentos HTML) sob demanda com `fetch`.
- Como separar **dados**, **navegação**, **interface** e **inicialização** em módulos independentes.
- Como usar o **padrão módulo (IIFE)** para criar escopo sem `import`/`export`.
- Como adicionar uma página nova mexendo em poucos lugares.

---

## Como rodar

O projeto usa `fetch` para carregar as páginas, e navegadores bloqueiam `fetch` em arquivos abertos via `file://`. Por isso é necessário um servidor local.

```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node
npx serve .

# Opção 3: extensão Live Server do VS Code
```

Depois acesse `http://localhost:8000`.

---

## Estrutura de pastas

```
vanilla-spa/
├── index.html              # Casca (shell) da aplicação
├── README.md
└── src/
    ├── assets/             # Imagens, fontes, ícones
    ├── pages/              # Conteúdo de cada rota (fragmentos HTML)
    │   ├── home.html
    │   ├── about.html
    │   ├── work.html
    │   ├── contact.html
    │   └── legal.html
    ├── scripts/            # Lógica, dividida por camada
    │   ├── config.js       # Camada de dados
    │   ├── ui.js           # Camada de visão
    │   ├── router.js       # Camada de navegação
    │   └── main.js         # Camada de composição (ponto de entrada)
    └── styles/
        └── style.css
```

Cada pasta tem **uma responsabilidade**:

| Pasta            | Responsabilidade                               |
| ---------------- | ---------------------------------------------- |
| `index.html`     | Esqueleto fixo: header, `<main>`, footer       |
| `src/pages/`     | Conteúdo variável de cada rota                 |
| `src/scripts/`   | Comportamento                                  |
| `src/styles/`    | Aparência                                      |
| `src/assets/`    | Arquivos estáticos                             |

---

## A arquitetura em camadas

O código JavaScript é dividido em quatro camadas. Cada arquivo tem um papel claro e **conhece o mínimo possível sobre os outros**.

```
┌─────────────────────────────────────────────┐
│  main.js     COMPOSIÇÃO                     │
│  Liga as peças. Não tem lógica própria.     │
└───────────────┬─────────────┬───────────────┘
                │             │
        ┌───────▼──────┐ ┌────▼─────────┐
        │  router.js   │ │    ui.js     │
        │  NAVEGAÇÃO   │ │    VISÃO     │
        │  Lê a URL e  │ │  Toca o DOM  │
        │  escolhe a   │ │  e carrega   │
        │  rota        │ │  as páginas  │
        └───────┬──────┘ └────┬─────────┘
                │             │
        ┌───────▼─────────────▼───────────┐
        │  config.js     DADOS            │
        │  Nome do site e lista de rotas  │
        └─────────────────────────────────┘
```

### Camada 1: Dados (`config.js`)

A fonte única de verdade. Define o nome do site e a **tabela de rotas**.

```js
const CONFIG = {
  site: { name: "Meu Site", lang: "pt-BR" },
  routes: [
    { path: "/about", label: "About", file: "src/pages/about.html", nav: true },
    // ...
  ],
};
```

Cada rota tem:

| Campo   | Significado                                         |
| ------- | --------------------------------------------------- |
| `path`  | O que aparece depois do `#` na URL                  |
| `label` | Texto exibido no menu e no título da aba            |
| `file`  | Fragmento HTML que será carregado                   |
| `nav`   | Se `false`, a rota existe mas não aparece no menu   |

Regra da camada: **só dados, nenhuma lógica**.

### Camada 2: Navegação (`router.js`)

Responde a uma única pergunta: **"qual rota corresponde à URL atual?"**

- Escuta o evento `hashchange`.
- Lê `window.location.hash` e remove o `#`.
- Procura a rota correspondente e chama seu `handler`.
- Se não encontrar, chama o handler de 404.

O roteador **não sabe nada sobre DOM, HTML ou `fetch`**. Ele recebe as rotas e os handlers de fora (injeção de dependência). Por isso poderia ser reutilizado em qualquer outro projeto.

### Camada 3: Visão (`ui.js`)

Tudo que toca o DOM vive aqui, e só aqui:

| Função         | O que faz                                                 |
| -------------- | --------------------------------------------------------- |
| `buildNav`     | Gera os links do menu a partir das rotas                  |
| `renderPage`   | Mostra "Carregando…", faz `fetch` da página e injeta o HTML |
| `render404`    | Exibe a tela de página não encontrada                     |

As funções que começam com `_` (como `_setLoading` e `_setActiveNav`) são **privadas**: não são exportadas no `return` do módulo.

### Camada 4: Composição (`main.js`)

O ponto de entrada. Ele apenas **conecta** as camadas:

```js
(function init() {
  UI.buildNav(CONFIG.routes);

  const routes = CONFIG.routes.map((r) => ({
    ...r,
    handler: (route) => UI.renderPage(route),
  }));

  Router.init(routes, () => UI.render404());
})();
```

Observe que é aqui, e somente aqui, que o roteador "descobre" que deve chamar a UI. Essa é a cola entre as camadas.

---

## Fluxo de uma navegação

O que acontece quando o usuário clica em **About**:

```
1. Clique em <a href="#/about">
        │
        ▼
2. O navegador muda a URL para /#/about
   (sem recarregar a página)
        │
        ▼
3. Evento "hashchange" dispara
        │
        ▼
4. Router._resolve()
   └─ lê "/about"
   └─ encontra a rota em CONFIG.routes
   └─ chama route.handler(route)
        │
        ▼
5. UI.renderPage(route)
   └─ mostra "Carregando…"
   └─ marca o link ativo no menu
   └─ fetch("src/pages/about.html")
   └─ injeta o HTML dentro de <main id="content">
   └─ atualiza document.title
```

Se qualquer etapa do `fetch` falhar, o `catch` exibe uma mensagem de erro em vez de quebrar a página.

---

## Passo a passo: adicionando uma página

Exemplo: criar a página **Blog**.

**1. Crie o fragmento HTML** em `src/pages/blog.html`. Não inclua `<html>` nem `<body>`, apenas o conteúdo:

```html
<h1>Blog</h1>
<p>Meus textos ficam aqui.</p>
```

**2. Registre a rota** em `src/scripts/config.js`:

```js
{ path: "/blog", label: "Blog", file: "src/pages/blog.html", nav: true },
```

**3. Pronto.** O menu, o roteamento e o carregamento passam a funcionar sem tocar em `router.js`, `ui.js` ou `main.js`.

Esse é o benefício da arquitetura em camadas: adicionar conteúdo exige mudar **apenas a camada de dados**.

---

## Por que a ordem dos scripts importa

No `index.html`:

```html
<script src="src/scripts/config.js"></script>
<script src="src/scripts/ui.js"></script>
<script src="src/scripts/router.js"></script>
<script src="src/scripts/main.js"></script>
```

Sem `import`/`export`, cada arquivo cria uma **variável global** (`CONFIG`, `UI`, `Router`). Um script só consegue usar o que já foi declarado antes dele.

```
config.js  →  declara CONFIG
ui.js      →  declara UI      (usa CONFIG em tempo de execução)
router.js  →  declara Router
main.js    →  usa os três; por isso vem por último
```

A ordem segue a direção das dependências: **da base para o topo**.

---

## Decisões de projeto

**Hash router em vez de History API.** URLs como `/#/about` funcionam em qualquer hospedagem estática (GitHub Pages, Cloudflare Pages, etc.) sem configurar redirecionamentos no servidor.

**Padrão módulo (IIFE).** `const UI = (() => { ... })()` cria um escopo privado e expõe apenas a API pública. Dá encapsulamento sem precisar de ES Modules.

**Páginas como arquivos HTML separados.** Conteúdo e comportamento ficam em lugares diferentes. Editar um texto não exige abrir JavaScript.

**Rotas declarativas.** A lista de rotas é um dado, não código. Isso permite gerar o menu e o roteador a partir da mesma fonte.

**Sem build.** O que você escreve é o que o navegador executa. Fácil de depurar, fácil de publicar.

---

## Limitações conhecidas

- **Requer servidor.** Não funciona abrindo o `index.html` direto do disco.
- **SEO limitado.** O conteúdo é carregado via JavaScript, então buscadores que não executam JS verão uma página vazia.
- **Sem cache de páginas.** Cada navegação refaz o `fetch` (o cache HTTP do navegador ameniza isso).
- **Globais.** `CONFIG`, `UI` e `Router` ficam no escopo global. Em projetos maiores, vale migrar para ES Modules.
- **Scripts dentro das páginas.** Tags `<script>` inseridas via `innerHTML` não são executadas.

---

## Próximos passos

Sugestões de evolução, em ordem crescente de dificuldade:

1. Adicionar **rotas com parâmetros** (`/blog/:slug`).
2. Implementar **cache em memória** das páginas já carregadas.
3. Migrar para **ES Modules** (`import`/`export`) e eliminar as globais.
4. Adicionar **transições** entre páginas.
5. Trocar o hash router pela **History API** (exige configurar fallback no servidor).

---

## Licença

Defina a licença do projeto aqui.