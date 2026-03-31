import { editService, deletService } from "../../api/servicos.js";

export function abrirModalDetalhesServico(servico, onSuccessCallback) {
  console.log(servico);

  const modalAntigo = document.getElementById("modal-detalhes-servico");
  if (modalAntigo) modalAntigo.remove();

  const modalHTML = `
    <div class="modal fade" id="modal-detalhes-servico" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold">Editar Serviço</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body pt-2">
            
            <div class="text-center mb-4">
              <div class="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle mb-2 shadow-sm" style="width: 65px; height: 65px;">
                <i class="bi bi-scissors fs-3" style="color: #d4a017;"></i>
              </div>
              <p class="text-muted small mb-0" style="font-size: 0.75rem;">ID: ${servico.id}</p>
            </div>

            <form id="form-editar-servico">
              
              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary mb-1">Nome do Serviço</label>
                <input type="text" class="form-control bg-light" id="editServicoNome" value="${servico.nome}" required>
              </div>

              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary mb-1">Descrição</label>
                <textarea class="form-control bg-light" id="editServicoDescricao" rows="2" required>${servico.descricao}</textarea>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label small fw-semibold text-secondary mb-1">Preço (R$)</label>
                  <input type="number" step="0.01" class="form-control bg-light" id="editServicoPreco" value="${servico.preco}" required>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label class="form-label small fw-semibold text-secondary mb-1">Duração (Minutos)</label>
                  <input type="number" class="form-control bg-light" id="editServicoDuracao" value="${servico.duracaoMin}" required>
                </div>
              </div>

            </form>
          </div>

          <div class="modal-footer border-top-0 pt-0 d-flex justify-content-between">
            <button type="button" class="btn btn-outline-danger" id="btnApagarServico">
              <i class="bi bi-trash3 me-1"></i> Apagar
            </button>
            <div>
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" form="form-editar-servico" class="btn btn-dark px-4">Salvar</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modalElement = document.getElementById("modal-detalhes-servico");
  const modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();

  // --- EVENTO DE SALVAR EDIÇÃO ---
  document
    .getElementById("form-editar-servico")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSalvar = e.submitter;
      const textoOriginal = btnSalvar.innerHTML;
      btnSalvar.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Salvando...';
      btnSalvar.disabled = true;

      try {
        const dadosAtualizados = {
          id: servico.id,
          nome: document.getElementById("editServicoNome").value.trim(),
          descricao: document
            .getElementById("editServicoDescricao")
            .value.trim(),
          preco: parseFloat(document.getElementById("editServicoPreco").value),
          duracaoMin: parseInt(
            document.getElementById("editServicoDuracao").value,
            10,
          ),
        };

        await editService({
          id: dadosAtualizados.id,
          nome: dadosAtualizados.nome,
          descricao: dadosAtualizados.descricao,
          duracaoMin: dadosAtualizados.duracaoMin,
          preco: dadosAtualizados.preco,
        });

        modalInstance.hide();
        if (onSuccessCallback) onSuccessCallback();
      } catch (error) {
        alert(error.message || "Erro ao atualizar o serviço.");
        btnSalvar.innerHTML = textoOriginal;
        btnSalvar.disabled = false;
      }
    });

  const btnApagar = document.getElementById("btnApagarServico");

  if (btnApagar) {
    btnApagar.addEventListener("click", async () => {
      console.log(
        "Botão APAGAR clicado! O evento está funcionando para o serviço ID:",
        servico.id,
      );

      const confirmar = confirm(
        "Tem certeza que deseja apagar este serviço? Esta ação não pode ser desfeita.",
      );

      if (confirmar) {
        const textoOriginal = '<i class="bi bi-trash3 me-1"></i> Apagar';
        btnApagar.innerHTML =
          '<span class="spinner-border spinner-border-sm"></span>';
        btnApagar.disabled = true;

        try {
          await deletService({ id: servico.id });
          modalInstance.hide();
          if (onSuccessCallback) onSuccessCallback();
        } catch (error) {
          alert(error.message || "Erro ao apagar o serviço.");
          btnApagar.innerHTML = textoOriginal;
          btnApagar.disabled = false;
        }
      }
      console.log("Ação de apagar cancelada pelo usuário.");
    });
  }

  modalElement.addEventListener("hidden.bs.modal", () => {
    modalElement.remove();
  });
}
