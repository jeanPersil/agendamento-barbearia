import renderLayout from "../components/layout/renderLayout.js";
import createStatCard from "../components/cards.js";
import { createUserRow } from "../components/tableRow.js";
import { getAllUsers } from "../api/user.js";

import { createPagination } from "../components/pagination.js";
import {
  renderTableLoading,
  renderTableError,
  renderTableEmpty,
} from "../components/tableHelper.js";

const state = {
  users: [],
  currentPage: 1,
  itemsPerPage: 7,
  totalPages: 1,
  totalItems: 0,
};

let statsData = [
  {
    title: "Total Usuários",
    value: "-",
    icon: "bi bi-people-fill",
    color: "primary",
  },
  {
    title: "Usuários Ativos (Pág)",
    value: "-",
    icon: "bi bi-check-circle-fill",
    color: "success",
  },
  {
    title: "Usuários Banidos (Pág)",
    value: "-",
    icon: "bi bi-slash-circle",
    color: "info",
  },
];

export default function initUsers() {
  renderLayout({
    HeaderTitle: "Usuários",
    HeaderSubtitle: "Gerencie todos os usuários da sua barbearia",
  });

  renderStats();
  fetchData();
}

async function fetchData() {
  renderTableLoading("tabela-usuarios", 6);

  try {
    const { users, meta } = await getAllUsers({
      page: state.currentPage,
      limit: state.itemsPerPage,
    });

    state.users = users;
    state.totalPages = meta.totalPages;
    state.totalItems = meta.totalItems;

    calculateStats();
    renderStats();
    updateTableUI();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    renderTableError("tabela-usuarios", "Erro ao conectar com o servidor.", 6);
  }
}

function updateTableUI() {
  const tbody = document.getElementById("tabela-usuarios");
  const paginationList = document.getElementById("pagination-list");
  const infoText = document.getElementById("pagination-info");

  if (state.users.length === 0) {
    renderTableEmpty("tabela-usuarios", "Nenhum usuário encontrado.", 6);
  } else {
    tbody.innerHTML = state.users.map((user) => createUserRow(user)).join("");
  }

  const start = (state.currentPage - 1) * state.itemsPerPage + 1;
  const end = start + state.users.length - 1;

  if (infoText) {
    infoText.innerText =
      state.totalItems > 0
        ? `Mostrando ${start}-${end} de ${state.totalItems} usuários`
        : "Sem dados";
  }

  if (paginationList) {
    paginationList.innerHTML = createPagination({
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      functionName: "mudarPaginaUsers",
    });
  }
}

function calculateStats() {
  const activeCount = state.users.filter(
    (u) => u.status === "Ativo" || u.status === "active",
  ).length;
  const bannedCount = state.users.filter(
    (u) => u.status === "Banido" || u.status === "banned",
  ).length;

  statsData[0].value = state.totalItems.toString();
  statsData[1].value = activeCount.toString();
  statsData[2].value = bannedCount.toString();
}

function renderStats() {
  const container = document.getElementById("stats-container");
  if (!container) return;

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

window.mudarPaginaUsers = function (newPage) {
  if (newPage < 1 || newPage > state.totalPages) return;
  state.currentPage = newPage;
  fetchData();
};

window.abrirDetalhesUsuario = function (id) {
  console.log(`Clicou no usuário ID: ${id}`);
};
