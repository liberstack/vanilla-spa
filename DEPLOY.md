# Deploy

Instruções para publicar o vanilla-spa no GitHub Pages ou Cloudflare Pages.

---

## GitHub Pages

### 1. Criar o repositório

Crie um repositório público no GitHub. Para o site ficar em `seuusuario.github.io`, o nome do repositório deve ser exatamente `seuusuario.github.io`.

Para qualquer outro nome, o site fica em `seuusuario.github.io/nome-do-repo`.

### 2. Enviar os arquivos

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/seuusuario/nome-do-repo.git
git push -u origin main
```

### 3. Ativar o GitHub Pages

No repositório, acesse **Settings → Pages**. Em **Source**, selecione a branch `main` e a pasta `/ (root)`. Salve.

O site estará disponível em alguns minutos.

### 4. SPA e o 404.html

O GitHub Pages não redireciona rotas desconhecidas para o `index.html`. O `404.html` incluído no projeto resolve isso — o GitHub Pages serve esse arquivo para qualquer rota não encontrada e o router assume o controle.

---

## Cloudflare Pages

### 1. Acessar o dashboard

Acesse [pages.cloudflare.com](https://pages.cloudflare.com) e faça login.

### 2. Criar o projeto

Clique em **Create a project → Connect to Git**. Autorize o acesso ao GitHub e selecione o repositório.

### 3. Configurar o build

O projeto não tem build step. Configure assim:

| Campo | Valor |
|---|---|
| Framework preset | None |
| Build command | *(vazio)* |
| Build output directory | `/` |

Clique em **Save and Deploy**.

### 4. SPA no Cloudflare Pages

O Cloudflare Pages suporta SPAs nativamente quando há um `404.html` na raiz, sem configuração adicional. O arquivo já está incluído no projeto.

---

## Observações

- Qualquer alteração nos arquivos basta fazer `git push` para o deploy atualizar automaticamente.
- A pasta `assets/` com imagens deve estar incluída no repositório se utilizada.
- Não há arquivo de configuração de build necessário em nenhuma das duas plataformas.