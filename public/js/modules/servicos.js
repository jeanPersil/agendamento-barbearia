import renderLayout from "../components/layout/renderLayout.js";
import { getServices } from "../api/servicos.js";
import { createServiceRow } from "../components/table/tableRow.js";

export async function initServicos() {
  renderLayout({
    HeaderTitle: "Serviços",
    HeaderSubtitle: "Gerencie os serviços da sua barbearia",
  });
  await loadServices();
}

async function loadServices() {
  const data = await getServices();
  const servicos = data.data;

  if (!servicos || servicos.length === 0) {
    console.warn("Nenhum serviço encontrado.");
    return;
  }

  const tbody = document.getElementById("tabela-servicos");

  if (!tbody) {
    console.error("Elemento tabela-servicos não encontrado no DOM.");
    return;
  }

  tbody.innerHTML = servicos
    .map((servico) => createServiceRow(servico))
    .join("");
}
