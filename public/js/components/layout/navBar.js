export default function renderNavbar() {
  const nav = document.getElementById("navBar");
  if (!nav) return;

  const path = window.location.pathname;

  nav.innerHTML = `
    <a href="/" class="d-flex align-items-center mb-4 mb-md-0 me-md-auto text-white text-decoration-none">
      <i class="bi bi-scissors fs-3 me-2" style="color: #d4a017"></i>
      <span class="fs-5 fw-bold">Minha barbearia</span>
    </a>
    <hr style="border-color: #444" />

    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="/dashboard.html" class="nav-link ${path.includes("dashboard") ? "active" : ""}" aria-current="page">
          <i class="bi bi-grid me-2"></i> Dashboard
        </a>
      </li>
      <li>
        <a href="/agenda.html" class="nav-link ${path.includes("agenda") ? "active" : ""}">
          <i class="bi bi-calendar-event me-2"></i> Agenda
        </a>
      </li>
      <li>
        <a href="/clientes.html" class="nav-link ${path.includes("clientes") ? "active" : ""}">
          <i class="bi bi-people me-2"></i> Clientes
        </a>
      </li>
      <li>
        <a href="/financeiro.html" class="nav-link ${path.includes("financeiro") ? "active" : ""}">
          <i class="bi bi-cash-coin me-2"></i> Servicos
        </a>
      </li>
    </ul>

    <hr style="border-color: #444" />

    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
        <i class="bi bi-gear me-2"></i>
        <strong>Configurações</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">Perfil</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#" id="btn-logout">Sair</a></li>
      </ul>
    </div>
  `;
}
