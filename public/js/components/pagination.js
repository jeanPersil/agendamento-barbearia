export function createPagination({ currentPage, totalPages, functionName }) {
  let buttonsHtml = "";

  buttonsHtml += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <button class="page-link" onclick="window.${functionName}(${currentPage - 1})">Ant.</button>
    </li>`;

  for (let i = 1; i <= totalPages; i++) {
    const activeClass =
      i === currentPage ? "active bg-dark border-dark" : "text-dark";
    buttonsHtml += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <button class="page-link ${activeClass}" onclick="window.${functionName}(${i})">${i}</button>
      </li>`;
  }

  // Botão Próximo
  buttonsHtml += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <button class="page-link" onclick="window.${functionName}(${currentPage + 1})">Próx.</button>
    </li>`;

  return buttonsHtml;
}
