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
  // 1. Verifica se a div realmente existe no HTML antes de tentar desenhar
  const calendarEl = document.getElementById("calendar");
  
  if (!calendarEl) {
    console.error("ERRO: A div com id 'calendar' não foi encontrada no HTML.");
    return; // Para a execução para não quebrar a tela
  }

  // 2. Os dados simulados (que depois virão da sua API)
  const dadosDoBanco = [
    {
      id: "1",
      title: "Degradê (Jean)",
      start: "2026-03-31T14:00:00", // Cuidado com o fuso horário ao usar datas fixas
      end: "2026-03-31T14:30:00",
      color: "#212529",
    },
  ];

  // 3. Instancia o calendário
  const calendarInstance = buildCalendar(
    "calendar", // Passa exatamente o ID da sua div que está no HTML
    dadosDoBanco,

    // Ao SELECIONAR um horário vazio (Novo Agendamento)
    (info) => {
      console.log(`Abrir modal de NOVO agendamento: ${info.startStr} até ${info.endStr}`);
    },

    // Ao CLICAR num agendamento existente (Detalhes/Editar)
    (info) => {
      console.log(`Abrir modal de DETALHES do ID: ${info.event.id}`);
    },

    // Ao ARRASTAR um agendamento (Update no banco)
    async (info) => {
      console.log(`Nova data/hora do ID ${info.event.id}: ${info.event.startStr}`);
    }
  );

  // 4. Renderiza na tela
  if (calendarInstance) {
    calendarInstance.render();
  }
}
