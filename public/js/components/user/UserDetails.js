import { editUser, banirUser } from "../../api/user.js";

export function abrirModalDetalhesUsuario(user, onSuccessCallback) {
  // 1. Remove modal antigo
  const modalAntigo = document.getElementById("modal-detalhes-usuario");
  if (modalAntigo) modalAntigo.remove();

  // 2. Área de Banimento
  const isBanned = user.bannedAt !== null;
  let banAreaHTML = "";

  if (isBanned) {
    banAreaHTML = `
      <div class="alert alert-danger mt-4 mb-0 border-0 shadow-sm">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-exclamation-octagon-fill fs-5 me-2"></i>
          <strong>Usuário Banido</strong>
        </div>
        <p class="mb-2 small"><strong>Motivo:</strong> ${user.bannedReason || "Nenhum motivo registrado."}</p>
        <button type="button" class="btn btn-sm btn-danger w-100" id="btnDesbanir">
          <i class="bi bi-arrow-counterclockwise me-1"></i> Remover Banimento
        </button>
      </div>
    `;
  } else {
    banAreaHTML = `
      <div class="mt-4 pt-3 border-top">
        <button type="button" class="btn btn-sm btn-outline-danger w-100" id="btnBanir">
          <i class="bi bi-slash-circle me-1"></i> Banir Usuário
        </button>
      </div>
    `;
  }

  // 3. Constrói o HTML (Agora com o campo editEmail)
  const modalHTML = `
    <div class="modal fade" id="modal-detalhes-usuario" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold">Editar Usuário</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body pt-2">
            <div class="text-center mb-4">
              <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&background=random&color=fff&size=80" class="rounded-circle shadow-sm mb-2" alt="${user.nome}">
              <p class="text-muted small mb-0" style="font-size: 0.75rem;">ID: ${user.id}</p>
            </div>

            <form id="form-editar-usuario">
              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary mb-1">Nome Completo</label>
                <input type="text" class="form-control bg-light" id="editNome" value="${user.nome}" required>
              </div>

              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary mb-1">E-mail</label>
                <input type="email" class="form-control bg-light" id="editEmail" value="${user.email}" required>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label small fw-semibold text-secondary mb-1">Telefone</label>
                  <input type="text" class="form-control bg-light" id="editTelefone" value="${user.telefone || ""}">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label small fw-semibold text-secondary mb-1">Tipo de Conta</label>
                  <select class="form-select bg-light" id="editRole">
                    <option value="CLIENTE" ${user.role === "CLIENTE" ? "selected" : ""}>Cliente</option>
                    <option value="PROFISSIONAL" ${user.role === "PROFISSIONAL" ? "selected" : ""}>Profissional</option>
                    <option value="ADMIN" ${user.role === "ADMIN" ? "selected" : ""}>Administrador</option>
                  </select>
                </div>
              </div>

              ${banAreaHTML}
            </form>
          </div>

          <div class="modal-footer border-top-0 pt-0">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" form="form-editar-usuario" class="btn btn-dark px-4">Salvar Alterações</button>
          </div>

        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modalElement = document.getElementById("modal-detalhes-usuario");
  const modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();

  document
    .getElementById("form-editar-usuario")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const btnSalvar = e.submitter;
      const textoOriginal = btnSalvar.innerHTML;
      btnSalvar.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Salvando...';
      btnSalvar.disabled = true;

      try {
        const dadosAtualizados = {
          nomeUsuario: document.getElementById("editNome").value,
          emailUsuario: document.getElementById("editEmail").value,
          telefoneUsuario: document.getElementById("editTelefone").value,
          roleUsuario: document.getElementById("editRole").value,
        };

        console.log("Enviando para a API:", dadosAtualizados);

        await editUser({
          id: user.id,
          email: dadosAtualizados.emailUsuario,
          nome: dadosAtualizados.nomeUsuario,
          telefone: dadosAtualizados.telefoneUsuario,
          tipo: dadosAtualizados.roleUsuario,
        });

        modalInstance.hide();
        if (onSuccessCallback) onSuccessCallback();
      } catch (error) {
        alert(error);
        btnSalvar.innerHTML = textoOriginal;
        btnSalvar.disabled = false;
      }
    });

  const btnBanir = document.getElementById("btnBanir");
  if (btnBanir) {
    btnBanir.addEventListener("click", async () => {
      const motivoDoBanimento = prompt(
        "Qual o motivo do banimento deste usuário?",
      );
      if (motivoDoBanimento !== null) {
        try {
          await banirUser({ id: user.id, motivo: motivoDoBanimento });
          modalInstance.hide();
          if (onSuccessCallback) onSuccessCallback();
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
    });
  }

  const btnDesbanir = document.getElementById("btnDesbanir");
  if (btnDesbanir) {
    btnDesbanir.addEventListener("click", async () => {
      const confirmar = confirm(
        "Tem certeza que deseja reativar o acesso deste usuário?",
      );
      if (confirmar) {
        try {
          console.log(`Desbanindo usuário ${user.id}`);
          modalInstance.hide();
          if (onSuccessCallback) onSuccessCallback();
        } catch (error) {
          alert("Erro ao reativar usuário.");
        }
      }
    });
  }

  modalElement.addEventListener("hidden.bs.modal", () => {
    modalElement.remove();
  });
}
