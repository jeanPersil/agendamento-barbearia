export function openModalCreateService() {
  return `
    <div id="custom-modal-create-service" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background-color: rgba(0, 0, 0, 0.6); z-index: 1050; backdrop-filter: blur(2px);">
      
      <div class="bg-white rounded-3 shadow-lg p-4 w-100 mx-3" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
        
        <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h5 class="fw-bold text-dark mb-0">Criar Novo Serviço</h5>
          <button type="button" class="btn-close" onclick="window.closeModalCreateService()" aria-label="Close"></button>
        </div>

        <div id="alert-service"></div>

        <form id="form-create-service" class="needs-validation" novalidate>
          <div class="row g-3">
            
            <div class="col-md-12">
              <label for="serviceName" class="form-label fw-bold text-dark small mb-1">Nome do Serviço</label>
              <input type="text" class="form-control bg-light" name="serviceName" placeholder="Ex: Corte Degrade + Barba" required />
            </div>
            
            <div class="col-md-12">
              <label for="serviceDescription" class="form-label fw-bold text-dark small mb-1">Descrição</label>
              <textarea class="form-control bg-light" name="serviceDescription" rows="2" placeholder="Descreva brevemente o serviço..." required></textarea>
            </div>

            <div class="col-md-6">
              <label for="servicePrice" class="form-label fw-bold text-dark small mb-1">Preço (R$)</label>
              <input type="number" step="0.01" min="0" class="form-control bg-light" name="servicePrice" placeholder="0.00" required />
            </div>

            <div class="col-md-6">
              <label for="serviceDuration" class="form-label fw-bold text-dark small mb-1">Duração (em minutos)</label>
              <input type="number" min="1" class="form-control bg-light" name="serviceDuration" placeholder="Ex: 45" required />
            </div>

          </div>

          <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" class="btn btn-light" onclick="window.closeModalCreateService()">Cancelar</button>
            <button type="submit" class="btn btn-dark d-flex align-items-center gap-2" name="btn-submit-service">
              <i class="bi bi-scissors" style="color: #d4a017;"></i>
              <span>Criar Serviço</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}