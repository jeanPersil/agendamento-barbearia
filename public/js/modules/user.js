import renderLayout from "../components/layout/renderLayout.js";
import createStatCard from "../components/cards.js";
import { createUserRow } from "../components/tableRow.js";
const state = {
  users: [],
  currentPage: 1,
  itemsPerPage: 8,
};

// --- DADOS MOCKADOS (Simulando o Banco de Dados) ---
const mockUsers = [
  {
    id: 1,
    nome: "Maria Silva",
    email: "maria@gmail.com",
    telefone: "(11) 99999-0001",
    role: "CLIENTE",
    bannedAt: true,
    foto: "",
  },
  {
    id: 2,
    nome: "João Souza",
    email: "joao@gmail.com",
    telefone: "(11) 99999-0002",
    tipo: "Profissional",
    status: "Ativo",
    foto: "",
  },
  {
    id: 3,
    nome: "Ana Pereira",
    email: "ana@gmail.com",
    telefone: "(11) 99999-0003",
    tipo: "Usuário",
    status: "Inativo",
    foto: "",
  },
  {
    id: 4,
    nome: "Carlos Lima",
    email: "carlos@gmail.com",
    telefone: "(11) 99999-0004",
    tipo: "Usuário",
    status: "Ativo",
    foto: "",
  },
  {
    id: 5,
    nome: "Fernanda Costa",
    email: "fernanda@gmail.com",
    telefone: "(11) 99999-0005",
    tipo: "Profissional",
    status: "Ativo",
    foto: "",
  },
  {
    id: 6,
    nome: "Lucas Almeida",
    email: "lucas@gmail.com",
    telefone: "(11) 99999-0006",
    tipo: "Usuário",
    status: "Ativo",
    foto: "",
  },
  {
    id: 7,
    nome: "Beatriz Rocha",
    email: "bia@gmail.com",
    telefone: "(11) 99999-0007",
    tipo: "Usuário",
    status: "Banido",
    foto: "",
  },
  {
    id: 8,
    nome: "Roberto Santos",
    email: "beto@gmail.com",
    telefone: "(11) 99999-0008",
    tipo: "Admin",
    status: "Ativo",
    foto: "",
  },
  {
    id: 9,
    nome: "Juliana Martins",
    email: "ju@gmail.com",
    telefone: "(11) 99999-0009",
    tipo: "Profissional",
    status: "Inativo",
    foto: "",
  },
  {
    id: 10,
    nome: "Ricardo Alves",
    email: "rick@gmail.com",
    telefone: "(11) 99999-0010",
    tipo: "Usuário",
    status: "Ativo",
    foto: "",
  },
  {
    id: 11,
    nome: "Patrícia Lima",
    email: "pati@gmail.com",
    telefone: "(11) 99999-0011",
    tipo: "Usuário",
    status: "Ativo",
    foto: "",
  },
  {
    id: 12,
    nome: "Gabriel Torres",
    email: "gabriel@gmail.com",
    telefone: "(11) 99999-0012",
    tipo: "Profissional",
    status: "Ativo",
    foto: "",
  },
];

const statsData = [
  {
    title: "Total Usuarios",
    value: "20",
    icon: "bi bi-person-plus-fill",
    color: "primary",
  },
  {
    title: "Usuarios Ativos",
    value: "7",
    icon: "bi bi-currency-dollar",
    color: "success",
  },

  {
    title: "Usuarios banidos",
    value: "10",
    icon: "bi bi-people",
    color: "info",
  },
];

export default function initUsers() {
  renderLayout({
    HeaderTitle: "Usúarios",
    HeaderSubtitle: "Gerencie todos os usuarios da sua barbearia",
  });

  renderStats();

  state.users = mockUsers;
  updateTableUI();
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

function updateTableUI() {
  const tbody = document.getElementById("tabela-usuarios");
  const paginationList = document.getElementById("pagination-list");
  const infoText = document.getElementById("pagination-info");

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const paginatedItems = state.users.slice(start, end); // Pega só os 5 itens da página atual
  const totalPages = Math.ceil(state.users.length / state.itemsPerPage);

  tbody.innerHTML = paginatedItems.map((user) => createUserRow(user)).join("");

  infoText.innerText = `Mostrando ${start + 1}-${Math.min(end, state.users.length)} de ${state.users.length} usuários`;

  let buttonsHtml = "";

  buttonsHtml += `
        <li class="page-item ${state.currentPage === 1 ? "disabled" : ""}">
            <button class="page-link" onclick="window.mudarPaginaUsers(${state.currentPage - 1})">Ant.</button>
        </li>
    `;

  for (let i = 1; i <= totalPages; i++) {
    const activeClass =
      i === state.currentPage ? "active bg-dark border-dark" : "text-dark";
    buttonsHtml += `
            <li class="page-item ${i === state.currentPage ? "active" : ""}">
                <button class="page-link ${activeClass}" onclick="window.mudarPaginaUsers(${i})">${i}</button>
            </li>
        `;
  }

  buttonsHtml += `
        <li class="page-item ${state.currentPage === totalPages ? "disabled" : ""}">
            <button class="page-link" onclick="window.mudarPaginaUsers(${state.currentPage + 1})">Próx.</button>
        </li>
    `;

  paginationList.innerHTML = buttonsHtml;
}

window.mudarPaginaUsers = function (newPage) {
  const totalPages = Math.ceil(state.users.length / state.itemsPerPage);

  if (newPage < 1 || newPage > totalPages) return;

  state.currentPage = newPage;
  updateTableUI();
};

window.abrirDetalhesUsuario = function (id) {
  console.log(`Clicou no usuário ID: ${id}`);
};
