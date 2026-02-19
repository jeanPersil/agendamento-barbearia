export default function createAppointmentItem(agendamento) {
  const { id, cliente, servico, horario, status } = agendamento;

  let dotClass = "timeline-dot";
  let nameStyle = "fw-bold text-dark";
  let statusBadge = "";
  let cardClass = "appointment-card";

  const statusKey = status ? status.toUpperCase() : "PENDENTE";

  if (statusKey === "CONCLUIDO" || statusKey === "FEITO") {
    dotClass += " done";
    nameStyle = "text-muted text-decoration-line-through";
    statusBadge = `<small class="text-success fw-bold text-uppercase" style="font-size: 0.7rem;">Feito</small>`;
  } else if (statusKey === "EM_ANDAMENTO" || statusKey === "AGORA") {
    dotClass += " current";
    cardClass += " active";
    statusBadge = `<span class="badge bg-warning text-dark fw-bold" style="font-size: 0.7rem;">AGORA</span>`;
  }

  return `
    <div class="timeline-item">
      <div class="${dotClass}"></div>

      <div class="${cardClass}">
        <div class="d-flex justify-content-between align-items-start">
          
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="fw-bold text-dark">${horario}</span>
              ${statusKey === "CONCLUIDO" ? statusBadge : ""} </div>
            
            <h6 class="${nameStyle} mb-0">${cliente.nome}</h6>
            <small class="text-muted">${servico}</small>
          </div>

          <div>
            ${statusKey === "EM_ANDAMENTO" || statusKey === "AGORA" ? statusBadge : ""}
          </div>

        </div>
      </div>
    </div>
  `;
}
