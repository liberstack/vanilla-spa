export default function contact({ site, page }) {
  return `
    <section class="wrap section">
      <h1>${page.heading}</h1>
      <p class="lead">${page.lead}</p>
    </section>

    <section class="wrap section">
      <div class="rows">
        <article class="row"><h3>E-mail</h3><p><a href="mailto:${site.email}">${site.email}</a></p></article>
        <article class="row"><h3>Telefone</h3><p>${site.phone}</p></article>
        <article class="row"><h3>Endereço</h3><p>${site.address}</p></article>
      </div>
    </section>

    <section class="wrap section">
      <h2>Enviar mensagem</h2>
      <form class="form" id="contact-form">
        <label>Nome
          <input type="text" name="name" autocomplete="name" required>
        </label>
        <label>E-mail
          <input type="email" name="email" autocomplete="email" required>
        </label>
        <label>Mensagem
          <textarea name="message" required></textarea>
        </label>
        <div class="actions">
          <button class="btn" type="submit">Enviar mensagem</button>
        </div>
        <p class="status" id="contact-status" role="status"></p>
      </form>
    </section>`;
}

// Site estático não tem backend: o envio abre o app de e-mail do visitante.
// Para envio real, troque por um serviço de formulário (Formspree, Web3Forms etc.).
export function mount(outlet, { site }) {
  const form = outlet.querySelector("#contact-form");
  const status = outlet.querySelector("#contact-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = `Contato pelo site — ${data.get("name")}`;
    const body = `${data.get("message")}\n\nNome: ${data.get("name")}\nE-mail: ${data.get("email")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Abrindo o seu aplicativo de e-mail…";
  });
}
