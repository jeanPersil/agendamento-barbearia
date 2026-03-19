export default function createStatCard({
  title,
  value,
  iconClass,
  colorTheme = "primary",
}) {
  return `
    <div class="col-md-4">
      <div class="card card-stat shadow-sm p-3 h-100">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <p class="text-muted small mb-1">${title}</p>
            <h3 class="fw-bold mb-0">${value}</h3>
          </div>
          
          <div class="icon-box bg-${colorTheme}-subtle text-${colorTheme}">
            <i class="${iconClass}" style="${colorTheme === "primary" ? "color: #d4a017;" : ""}"></i>
          </div>
        </div>
      </div>
    </div>
  `;
}
