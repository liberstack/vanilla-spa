export default function home({ page }) {
  return `
    <section class="wrap hero">
      <h1>${page.heading}</h1>
      <p class="lead">${page.lead}</p>
      <div class="actions">
        <a class="btn" href="#/work">Ver trabalhos</a>
        <a class="btn btn--ghost" href="#/contact">Falar com a equipe</a>
      </div>
    </section>

    <section class="wrap section">
      <h2>O que fazemos</h2>
      <div class="rows">
        <article class="row">
          <h3>Diagnóstico</h3>
          <p>Mapeamos como a operação funciona hoje, onde há retrabalho e quais gargalos custam mais.</p>
        </article>
        <article class="row">
          <h3>Planejamento</h3>
          <p>Definimos prioridades, prazos e responsáveis. O plano cabe em uma página e pode ser cobrado.</p>
        </article>
        <article class="row">
          <h3>Implementação</h3>
          <p>Acompanhamos a execução junto com a sua equipe, da escolha das ferramentas à entrada em uso.</p>
        </article>
        <article class="row">
          <h3>Acompanhamento</h3>
          <p>Medimos os resultados depois da entrega e ajustamos o que não funcionou como o esperado.</p>
        </article>
      </div>
    </section>`;
}
