export function renderTableLoading(tbodyId, colSpan = 6) {
  const tbody = document.getElementById(tbodyId);
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="${colSpan}" class="text-center py-5">
          <div class="spinner-border text-warning" role="status"></div>
          <span class="ms-2">Carregando...</span>
        </td>
      </tr>`;
  }
}

export function renderTableError(tbodyId, message = "Erro ao carregar dados.", colSpan = 6) {
  const tbody = document.getElementById(tbodyId);
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="${colSpan}" class="text-center py-4 text-danger">
           ${message} <br> <button class="btn btn-sm btn-outline-danger mt-2" onclick="location.reload()">Tentar novamente</button>
        </td>
      </tr>`;
  }
}

export function renderTableEmpty(tbodyId, message = "Nenhum registro encontrado.", colSpan = 6) {
    const tbody = document.getElementById(tbodyId);
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="${colSpan}" class="text-center py-4 text-muted">${message}</td></tr>`;
    }
}