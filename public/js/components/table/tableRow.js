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
  const isBanned = user.bannedAt !== null;
  const statusLabel = isBanned ? "Banido" : "Ativo";
  const statusClass = isBanned
    ? "bg-danger-subtle text-danger"
    : "bg-success-subtle text-success";

  const userRole = user.role || "Desconhecido";

  let roleBadgeColor = "bg-secondary-subtle text-secondary";

  if (userRole === "ADMIN") {
    roleBadgeColor = "bg-dark text-white";
  } else if (userRole === "BARBEIRO" || userRole === "PROFISSIONAL") {
    roleBadgeColor = "bg-primary-subtle text-primary";
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&background=random&color=fff`;

  return `
    <tr onclick="window.abrirDetalhesUsuario('${user.id}')" style="cursor: pointer;">
      <td class="ps-4">
        <div class="d-flex align-items-center">
          <img src="${avatarUrl}" class="avatar-sm me-3 rounded-circle" width="40" height="40" alt="${user.nome}">
          <div>
            <h6 class="mb-0 fw-bold text-dark">${user.nome}</h6>
            <small class="text-muted" style="font-size: 0.75rem;">ID: ...${user.id.slice(-4)}</small>
          </div>
        </div>
      </td>
      
      <td class="text-muted">${user.email}</td>
      <td class="text-muted">${user.telefone}</td>
      
      <td>
        <span class="badge ${roleBadgeColor} rounded-pill fw-normal">
            ${userRole}
        </span>
      </td>
      
      <td>
        <span class="badge ${statusClass} rounded-pill fw-normal">
            ${statusLabel}
        </span>
      </td>
    
    </tr>
  `;
}

export function createServiceRow(servico) {
  return `
    <tr onclick="window.abrirDetalhesServico('${servico.id}')" style="cursor: pointer;" class="table-hover-row">
      
      <td class="ps-4 py-3 align-middle">
        <div class="fw-bold text-dark">${servico.nome}</div>
        <div class="text-muted small text-truncate" style="max-width: 250px;">
          ${servico.descricao}
        </div>
      </td>

      <td class="py-3 align-middle text-secondary">
        <i class="bi bi-clock me-1"></i> ${servico.duracaoMin} min
      </td>

      <td class="py-3 align-middle fw-semibold text-success">
        R$ ${Number(servico.preco).toFixed(2).replace(".", ",")}
      </td>

    </tr>
  `;
}
