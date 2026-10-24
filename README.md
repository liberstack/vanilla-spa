# SPA Hash Router

Boilerplate para criar uma **Single-Page Application (SPA)** com HTML, CSS e JavaScript vanilla. Sem frameworks, dependências ou etapa de build.

## Tecnologias

- HTML5
- CSS3
- JavaScript vanilla
- Hash-based routing
- Fetch API

## Estrutura

```text
spa-hashrouter/
├── index.html
├── style.css
├── js/
│   ├── main.js
│   ├── router.js
│   └── ui.js
├── pages/
│   ├── home.html
│   ├── about.html
│   └── contact.html
├── assets/
└── README.md
```

## Como funciona

O `index.html` funciona como o shell principal da aplicação, mantendo a estrutura compartilhada entre as páginas.

O roteador utiliza a URL com hash para identificar a rota atual. O conteúdo correspondente é carregado dinamicamente com `fetch()` a partir dos fragmentos HTML armazenados em `pages/` e inserido no documento sem recarregar a página inteira.

### Módulos JavaScript

- **`main.js`** — inicialização da aplicação.
- **`router.js`** — gerenciamento das rotas e da navegação.
- **`ui.js`** — carregamento e atualização do conteúdo no DOM.

Os arquivos HTML em `pages/` contêm apenas o conteúdo específico de cada página.

## Adicionar uma página

1. Crie um fragmento HTML dentro de `pages/`, por exemplo, `blog.html`:

```html
<h1>Blog</h1>
<p>Conteúdo da página.</p>
```

2. Registre a nova rota na configuração utilizada pelo roteador, seguindo o formato já adotado pelo projeto.

3. Se a navegação for gerada automaticamente, configure o rótulo e a visibilidade da nova rota conforme necessário.

## Executar localmente

A aplicação precisa ser servida por um servidor HTTP para que o `fetch()` consiga carregar os fragmentos HTML.

Você pode utilizar a extensão **Live Server** no VS Code ou qualquer servidor HTTP estático.

Não é necessário instalar dependências npm ou executar uma etapa de build.

## Deploy

Compatível com hospedagem estática, como:

- GitHub Pages
- Cloudflare Pages

Consulte as configurações da plataforma escolhida para publicar a aplicação.

## Objetivo

Demonstrar uma implementação simples de roteamento SPA com JavaScript vanilla, carregamento dinâmico de fragmentos HTML e separação de responsabilidades em módulos.

