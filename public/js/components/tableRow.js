export function createAppointmentRow(agendamento) {
  const {
    id,
    cliente,
    servico,
    profissional,
    horario,
    status,
    actions = null,
  } = agendamento;

  const statusStyles = {
    CONFIRMADO: {
      class: "bg-success-subtle text-success",
      label: "Confirmado",
    },
    PENDENTE: { class: "bg-warning-subtle text-warning", label: "Pendente" },
    CANCELADO: { class: "bg-danger-subtle text-danger", label: "Cancelado" },
    CONCLUIDO: {
      class: "bg-secondary-subtle text-secondary",
      label: "Concluído",
    },
  };

  const statusKey = status ? status.toUpperCase() : "PENDENTE";
  const style = statusStyles[statusKey] || {
    class: "bg-light text-dark",
    label: status,
  };

  const avatarUrl = cliente.foto
    ? cliente.foto
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(cliente.nome)}&background=random&color=fff`;

  return `
    <tr>
      <td class="ps-4">
        <div class="d-flex align-items-center">
          <img
            src="${avatarUrl}"
            class="avatar-sm me-2 rounded-circle object-fit-cover"
            width="32" height="32"
            alt="${cliente.nome}"
          />
          <div>
            <h6 class="mb-0 text-dark" style="font-size: 0.875rem;">${cliente.nome}</h6>
            <small class="text-muted" style="font-size: 0.75rem;">
              ${cliente.telefone || "Sem telefone"}
            </small>
          </div>
        </div>
      </td>
      
      <td class="text-muted small">${profissional}</td>
      
      <td>
        <span class="badge bg-light text-dark border fw-normal">
          ${servico}
        </span>
      </td>
      
      <td class="fw-bold text-dark">${horario}</td>
      
      <td>
        <span class="badge ${style.class} rounded-pill fw-normal">
          ${style.label}
        </span>
      </td>
      
${
  actions
    ? `
  <td class="text-end pe-4">
    <button 
      class="btn btn-sm btn-light text-muted border-0" 
      onclick="window.editarAgendamento(${id})"
      title="Editar"
    >
      <i class="bi bi-pencil"></i>
    </button>
  </td>
`
    : ""
}
    </tr>
  `;
}

export function createUserRow(user) {
  const roleBadge =
    user.tipo === "Admin"
      ? "bg-purple-subtle text-purple"
      : user.tipo === "Profissional"
        ? "bg-primary-subtle text-primary"
        : "bg-secondary-subtle text-secondary";

  const statusClass =
    user.role === true
      ? "bg-success-subtle text-success"
      : "bg-danger-subtle text-danger";

  return `
      <tr onclick="window.abrirDetalhesUsuario(${user.id})">
        <td class="ps-4">
          <div class="d-flex align-items-center">
            <img src="${user.foto}" class="avatar-sm me-3 rounded-circle" width="40" height="40" alt="${user.nome}">
            <div>
              <h6 class="mb-0 fw-bold text-dark">${user.nome}</h6>
              <small class="text-muted">ID: #${user.id}</small>
            </div>
          </div>
        </td>
        <td class="text-muted">${user.email}</td>
        <td class="text-muted">${user.telefone}</td>
        <td><span class="badge ${roleBadge} rounded-pill fw-normal">${user.tipo}</span></td>
        <td><span class="badge ${statusClass} rounded-pill fw-normal">${user.status}</span></td>
        <td class="text-end pe-4">
          <button class="btn btn-sm btn-light text-muted"><i class="bi bi-three-dots-vertical"></i></button>
        </td>
      </tr>
    `;
}
