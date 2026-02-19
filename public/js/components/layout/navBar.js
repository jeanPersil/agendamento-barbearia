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
        <a href="/dashboard" class="nav-link ${path.includes("dashboard") ? "active" : ""}" aria-current="page">
          <i class="bi bi-grid me-2"></i> Dashboard
        </a>
      </li>
      <li>
        <a href="/agenda" class="nav-link ${path.includes("agenda") ? "active" : ""}">
          <i class="bi bi-calendar-event me-2"></i> Agenda
        </a>
      </li>
      <li>
        <a href="/usuarios" class="nav-link ${path.includes("usuarios") ? "active" : ""}">
          <i class="bi bi-people me-2"></i> Usuarios
        </a>
      </li>
      <li>
        <a href="/servicos" class="nav-link ${path.includes("servicos") ? "active" : ""}">
          <i class="bi bi-cash-coin me-2"></i> Servicos
        </a>
      </li>
    </ul>

    <hr style="border-color: #444" />


    <a href="#" 
       id="btn-logout" 
       class="d-flex align-items-center text-white text-decoration-none px-2 py-1 rounded hover-effect"
       style="transition: background 0.3s;"
    >
      <i class="bi bi-box-arrow-right me-2 text-danger"></i>
      <strong>Sair</strong>
    </a>
  `;
}
