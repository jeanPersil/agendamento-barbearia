import createStatCard from "../components/cards.js";
import { createAppointmentRow } from "../components/tableRow.js";

import renderHeader from "../components/layout/header.js";
import renderNavbar from "../components/layout/navBar.js";

function renderLayout() {
  renderHeader({
    title: "Seja bem vindo ao seu DashBoard",
    subtitle: "Veja como esta sua barbearia hoje",
  });
  renderNavbar();
}

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

function renderAppointments() {
  const tbody = document.getElementById("tabela-agendamentos");
  if (!tbody) return;

  const agendamentosDoDia = [
    {
      id: 1,
      cliente: { nome: "Jean Lucas", telefone: "(11) 99999-0000", foto: null },
      profissional: "Marcus Reed",
      servico: "Corte Degradê",
      horario: "14:00",
      status: "CONFIRMADO",
    },
    {
      id: 2,
      cliente: { nome: "Ana Silva", telefone: "(11) 98888-1111", foto: null },
      profissional: "Marcus Reed",
      servico: "Barba + Corte",
      horario: "15:30",
      status: "PENDENTE",
    },
    {
      id: 3,
      cliente: {
        nome: "Roberto Carlos",
        telefone: "(11) 97777-2222",
        foto: null,
      },
      profissional: "João Barbeiro",
      servico: "Pezinho",
      horario: "16:00",
      status: "CANCELADO",
    },
  ];

  tbody.innerHTML = agendamentosDoDia
    .map((agendamento) => createAppointmentRow(agendamento))
    .join("");
}

export function startDashBoard() {
  renderStats();
  renderAppointments();
  renderLayout();
}
