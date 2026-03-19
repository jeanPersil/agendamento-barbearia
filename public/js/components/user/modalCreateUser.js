export function openModalCreateUser() {
  return `
    <div id="custom-modal-create-user" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background-color: rgba(0, 0, 0, 0.6); z-index: 1050; backdrop-filter: blur(2px);">
      
      <div class="bg-white rounded-3 shadow-lg p-4 w-100 mx-3" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
        
        <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h5 class="fw-bold text-dark mb-0">Criar Novo Usuário</h5>
          <button type="button" class="btn-close" onclick="window.closeModalCreateUser()" aria-label="Close"></button>
        </div>


        <div id="alert"></div>

        <form id="form-create-user" class="needs-validation" novalidate>
          <div class="row g-3">
            
            <div class="col-md-12">
              <label for="userName" class="form-label fw-bold text-dark small mb-1">Nome Completo</label>
              <input type="text" class="form-control bg-light" name="userName" placeholder="Ex: Jean Lucas" required />
            </div>
            
            <div class="col-md-6">
              <label for="userEmail" class="form-label fw-bold text-dark small mb-1">E-mail</label>
              <input type="email" class="form-control bg-light" name="userEmail" placeholder="email@exemplo.com" required />
            </div>

            <div class="col-md-6">
              <label for="userPhone" class="form-label fw-bold text-dark small mb-1">Telefone</label>
              <input type="text" class="form-control bg-light" name="userPhone" placeholder="(00) 00000-0000" required />
            </div>

            <div class="col-md-6">
              <label for="userPassword" class="form-label fw-bold text-dark small mb-1">Senha</label>
              <input type="password" class="form-control bg-light" name="userPassword" placeholder="*******" required minlength="6" />
            </div>

            <div class="col-md-6">
              <label for="userConfirmPassword" class="form-label fw-bold text-dark small mb-1">Confirmar Senha</label>
              <input type="password" class="form-control bg-light" name="userConfirmPassword" placeholder="*******" required minlength="6" />
            </div>

            <div class="col-md-12">
              <label for="userRole" class="form-label fw-bold text-dark small mb-1">Tipo de Acesso</label>
              <select class="form-select bg-light cursor-pointer" name="userRole" required>
                <option value="CLIENTE" selected>Cliente</option>
                <option value="PROFISSIONAL">Profissional (Barbeiro)</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" class="btn btn-light" onclick="window.closeModalCreateUser()">Cancelar</button>
            <button type="submit" class="btn btn-dark d-flex align-items-center gap-2" name="btn-submit-user">
              <i class="bi bi-person-plus-fill" style="color: #d4a017;"></i>
              <span>Criar Usuário</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}
