// Para adicionar um projeto, inclua um item neste array.
const projects = [
  {
    name: "Reestruturação de atendimento",
    meta: "Varejo · 2025",
    text: "Unificação de canais e padronização de respostas. O tempo médio de resposta caiu pela metade em quatro meses.",
  },
  {
    name: "Painel de indicadores financeiros",
    meta: "Serviços · 2024",
    text: "Consolidação de planilhas dispersas em um painel único, com atualização diária e acesso por perfil.",
  },
  {
    name: "Migração de sistemas internos",
    meta: "Indústria · 2024",
    text: "Planejamento e acompanhamento da troca de três sistemas legados, sem interrupção da produção.",
  },
  {
    name: "Manual de processos",
    meta: "Educação · 2023",
    text: "Documentação dos fluxos administrativos e treinamento das equipes para uso e manutenção do material.",
  },
];

export default function work({ page }) {
  const rows = projects
    .map(
      (p) => `
        <article class="row">
          <div>
            <h3>${p.name}</h3>
            <p class="meta">${p.meta}</p>
          </div>
          <p>${p.text}</p>
        </article>`,
    )
    .join("");

  return `
    <section class="wrap section">
      <h1>${page.heading}</h1>
      <p class="lead">${page.lead}</p>
    </section>

    <section class="wrap section">
      <div class="rows">${rows}</div>
    </section>`;
}
