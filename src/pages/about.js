export default function about({ page }) {
  return `
    <section class="wrap section">
      <h1>${page.heading}</h1>
      <p class="lead">${page.lead}</p>
    </section>

    <section class="wrap section">
      <h2>Como trabalhamos</h2>
      <div class="prose">
        <p>Começamos entendendo o problema antes de propor qualquer solução. Cada projeto tem um escopo escrito, um responsável de cada lado e entregas parciais com data.</p>
        <p>Não vendemos pacotes fechados. O trabalho é dimensionado conforme a necessidade do cliente e revisto a cada etapa.</p>
      </div>
    </section>

    <section class="wrap section">
      <h2>Princípios</h2>
      <div class="rows">
        <article class="row">
          <h3>Clareza</h3>
          <p>Escopo, prazo e custo ficam por escrito desde o início.</p>
        </article>
        <article class="row">
          <h3>Prazo</h3>
          <p>Combinamos datas realistas e avisamos cedo quando algo muda.</p>
        </article>
        <article class="row">
          <h3>Responsabilidade</h3>
          <p>Assumimos o resultado da nossa parte e documentamos o que entregamos.</p>
        </article>
      </div>
    </section>`;
}
