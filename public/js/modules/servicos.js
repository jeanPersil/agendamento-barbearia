import renderLayout from "../components/layout/renderLayout.js";
import { createServiceRow } from "../components/table/tableRow.js";
import { getServices, createService } from "../api/servicos.js";
import { openModalCreateService } from "../components/servico/modalCreateServico.js";
import { renderAlert } from "../components/common/alert.js";
import { abrirModalDetalhesServico } from "../components/servico/modalDetalheServico.js";

import { createPagination } from "../components/common/pagination.js";
import {
  renderTableLoading,
  renderTableError,
  renderTableEmpty,
} from "../components/table/tableHelper.js";

const state = {
  servicos: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  totalItems: 0,
};

export function initServicos() {
  renderLayout({
    HeaderTitle: "Serviços",
    HeaderSubtitle: "Gerencie os serviços da sua barbearia",
  });

  fetchData();
  modalCriarServico();
}

async function fetchData() {
  renderTableLoading("tabela-servicos", 5);

  try {
    const response = await getServices({
      page: state.currentPage,
      limit: state.itemsPerPage,
    });

    state.servicos = response.data;
    state.totalPages = response.meta.totalPages;

    state.totalItems = response.meta.totalItens;

    updateTableUI();
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    renderTableError("tabela-servicos", "Erro ao conectar com o servidor.", 5);
  }
}

function updateTableUI() {
  const tbody = document.getElementById("tabela-servicos");
  const paginationList = document.getElementById("pagination-list");
  const infoText = document.getElementById("pagination-info");

  if (state.servicos.length === 0) {
    renderTableEmpty("tabela-servicos", "Nenhum serviço encontrado.", 5);
  } else {
    tbody.innerHTML = state.servicos
      .map((servico) => createServiceRow(servico))
      .join("");
  }

  const start = (state.currentPage - 1) * state.itemsPerPage + 1;
  const end = start + state.servicos.length - 1;

  if (infoText) {
    infoText.innerText =
      state.totalItems > 0
        ? `Mostrando ${start}-${end} de ${state.totalItems} serviços`
        : "Sem dados";
  }

  if (paginationList) {
    paginationList.innerHTML = createPagination({
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      functionName: "mudarPaginaServicos",
    });
  }
}

window.mudarPaginaServicos = function (newPage) {
  if (newPage < 1 || newPage > state.totalPages) return;

  state.currentPage = newPage;
  fetchData();
};

export function modalCriarServico() {
  const buttonCreate = document.getElementById("buttonCreateService");

  if (!buttonCreate) return;

  buttonCreate.addEventListener("click", () => {
    document.body.insertAdjacentHTML("beforeend", openModalCreateService());

    window.closeModalCreateService = function () {
      const modal = document.getElementById("custom-modal-create-service");
      if (modal) {
        modal.remove();
      }
    };

    const form = document.getElementById("form-create-service");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const newService = new FormData(form);

        await createService({
          nome: newService.get("serviceName"),
          descricao: newService.get("serviceDescription"),
          preco: Number(newService.get("servicePrice")),
          duracao: Number(newService.get("serviceDuration")),
        });

        window.closeModalCreateService();

        window.location.reload();
      } catch (error) {
        const alertDiv = document.getElementById("alert-service");
        if (alertDiv) {
          alertDiv.innerHTML = renderAlert(
            error.message || "Erro ao criar o serviço.",
          );
        }
      }
    });
  });
}

window.abrirDetalhesServico = function (id) {
  const servico = state.servicos.find((s) => s.id === id);

  if (!servico) {
    console.error("Serviço não encontrado!");
    return;
  }

  abrirModalDetalhesServico(servico, fetchData);
};
