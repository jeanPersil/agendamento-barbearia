import renderLayout from "../components/layout/renderLayout.js";
import { buildCalendar } from "../components/agenda/calendarioBuild.js";

export default function initAgenda() {
  renderLayout({
    HeaderTitle: "Agenda",
    HeaderSubtitle: "Gerencie sua agenda de clientes",
  });

  initCalendario();
}

function initCalendario() {
  // 1. PRIMEIRO: Cria a "casinha" (a div) onde o calendário vai morar
  const mainContainer = document.querySelector("main");
  if (mainContainer) {
    mainContainer.innerHTML = `
      <div class="card shadow-sm border-0 p-4 mb-4">
        <div id="calendar" style="min-height: 700px;"></div>
      </div>
    `;
  }

  // 2. Os dados simulados
  const dadosDoBanco = [
    {
      id: "1",
      title: "Degradê (Jean)",
      start: "2026-03-31T14:00:00",
      end: "2026-03-31T14:30:00",
      color: "#212529",
    },
  ];

  // 3. Instancia o calendário (Agora ele vai achar a div "calendar"!)
  const calendarInstance = buildCalendar(
    "calendar",
    dadosDoBanco,

    // O que fazer ao SELECIONAR um horário vazio (Novo Agendamento)
    (info) => {
      console.log(
        `Abrir modal de NOVO agendamento: ${info.startStr} até ${info.endStr}`,
      );
    },

    // O que fazer ao CLICAR num agendamento existente (Editar/Apagar)
    (info) => {
      console.log(`Abrir modal de DETALHES do ID: ${info.event.id}`);
    },

    // O que fazer ao ARRASTAR um agendamento (Update no banco)
    async (info) => {
      console.log(
        `Fazendo requisição silenciosa para mudar o ID ${info.event.id} para ${info.event.startStr}`,
      );
    },
  );

  // 4. Renderiza na tela
  if (calendarInstance) {
    calendarInstance.render();
  }
}
