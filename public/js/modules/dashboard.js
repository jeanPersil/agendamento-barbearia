import createStatCard from "../components/common/cards.js";
import createAppointmentItem from "../components/itemAgendamento.js";
import renderLayout from "../components/layout/renderLayout.js";

function renderStats() {
  const container = document.getElementById("stats-container");

  if (!container) return;

  const statsData = [
    {
      title: "Novos Usuários ( ultimos 7 dias )",
      value: "12",
      icon: "bi bi-person-plus-fill",
      color: "primary",
    },
    {
      title: "Receita Mensal",
      value: "R$ 1.450,00",
      icon: "bi bi-currency-dollar",
      color: "success",
    },
    {
      title: "Agendamentos Hoje",
      value: "8",
      icon: "bi bi-calendar-check",
      color: "info",
    },
  ];

  container.innerHTML = statsData
    .map((stat) =>
      createStatCard({
        title: stat.title,
        value: stat.value,
        iconClass: stat.icon,
        colorTheme: stat.color,
      }),
    )
    .join("");
}

function renderTimeline() {
  const container = document.getElementById("agenda-timeline");
  if (!container) return;

  const agendaData = [
    {
      id: 1,
      horario: "09:00",
      cliente: { nome: "João S." },
      servico: "Corte",
      status: "FEITO",
    },
    {
      id: 2,
      horario: "09:45",
      cliente: { nome: "Daniel C." },
      servico: "Barba",
      status: "FEITO",
    },
    {
      id: 3,
      horario: "10:30",
      cliente: { nome: "Alex O." },
      servico: "Corte + Barba",
      status: "AGORA",
    },
    {
      id: 4,
      horario: "11:15",
      cliente: { nome: "Rafael S." },
      servico: "Corte",
      status: "PENDENTE",
    },
    {
      id: 5,
      horario: "13:30",
      cliente: { nome: "Nathan L." },
      servico: "Corte + Barba",
      status: "PENDENTE",
    },
  ];

  container.innerHTML = agendaData
    .map((item) => createAppointmentItem(item))
    .join("");
}

export default function startDashBoard() {
  renderStats();
  renderTimeline();
  renderLayout({
    HeaderTitle: "Seja bem vindo ao seu DashBoard",
    HeaderSubtitle: "Veja como esta sua barbearia hoje",
  });
}
