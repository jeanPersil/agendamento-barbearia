// No seu components/alert.js
export function renderAlert(message) {
  return ` 
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${message}
    </div>
  `;
}
