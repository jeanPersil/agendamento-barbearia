import renderLayout from "../components/layout/renderLayout.js";
import createStatCard from "../components/cards.js";
import { createUserRow } from "../components/tableRow.js";
import { getAllUsers, createUser } from "../api/user.js";
import { renderAlert } from "../components/alert.js";

import { createPagination } from "../components/pagination.js";
import {
  renderTableLoading,
  renderTableError,
  renderTableEmpty,
} from "../components/tableHelper.js";

import { openModalCreateUser } from "../components/modalCreateUser.js";

const state = {
  users: [],
  currentPage: 1,
  itemsPerPage: 7,
  totalPages: 1,
  totalItems: 0,
  filters: {
    nome: "",
    tipo: "",
    status: "",
  },
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

  fetchData();
  modalCriarUsuario();
  filterUser();
}

async function fetchData() {
  renderTableLoading("tabela-usuarios", 6);

  try {
    const { users, meta } = await getAllUsers({
      page: state.currentPage,
      limit: state.itemsPerPage,
      nome: state.filters.nome || undefined,
      tipo: state.filters.tipo || undefined,
      status: state.filters.status || undefined,
    });

    console.log(users);

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
    (user) => user.bannedAt === null,
  ).length;

  const bannedCount = state.users.filter(
    (user) => user.bannedAt != null,
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

function modalCriarUsuario() {
  document.getElementById("buttonCreateUser").addEventListener("click", () => {
    document.body.insertAdjacentHTML("beforeend", openModalCreateUser());

    window.closeModalCreateUser = function () {
      const modal = document.getElementById("custom-modal-create-user");
      if (modal) {
        modal.remove();
      }
    };

    const form = document.getElementById("form-create-user");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const newUser = new FormData(form);

        await createUser({
          nome: newUser.get("userName"),
          email: newUser.get("userEmail"),
          senha: newUser.get("userPassword"),
          confirmarSenha: newUser.get("userConfirmPassword"),
          role: newUser.get("userRole"),
          telefone: newUser.get("userPhone"),
        });

        window.closeModalCreateUser();
        window.location.reload();
      } catch (error) {
        console.log("Caiu no catch!", error);
        document.getElementById("alert").innerHTML = renderAlert(error.message);
      }
    });
  });
}

window.mudarPaginaUsers = function (newPage) {
  if (newPage < 1 || newPage > state.totalPages) return;
  state.currentPage = newPage;
  fetchData();
};

window.abrirDetalhesUsuario = function (id) {
  console.log(`Clicou no usuário ID: ${id}`);
};

function filterUser() {
  const buttonFilter = document.getElementById("filterUser");
  const txtSearch = document.getElementById("txtSearch");
  const activeFilter = document.getElementById("filtro-tipo");
  const statsFilter = document.getElementById("filtro-status");

  buttonFilter.addEventListener("click", () => {
    state.filters.nome = txtSearch.value.trim();
    state.filters.tipo = activeFilter.value;
    state.filters.status = statsFilter.value;

    state.currentPage = 1;

    fetchData();
  });

  txtSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      buttonFilter.click();
    }
  });
}
