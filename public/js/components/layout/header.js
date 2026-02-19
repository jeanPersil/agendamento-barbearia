export default function renderHeader(title, subtitle) {
  const header = document.getElementById("header");

  if (!header) return;

  const defaultPhoto = "/assets/imgs/userIcon.png";

  const fullName = localStorage.getItem("userName") || "Visitante";
  const userPhoto = localStorage.getItem("userAvatar") || defaultPhoto;
  const userRole = localStorage.getItem("userRole");

  header.innerHTML = `
    <div class="container-fluid bg-white border-bottom py-3 px-4">
      <div class="d-flex align-items-center justify-content-between">
        
        <div>
          <h2 class="mb-0 fw-bold text-dark fs-3">
            ${title}
          </h2>
          <p class="text-muted small mb-0 mt-1">
            ${subtitle}
          </p>
        </div>

        <div class="d-flex align-items-center gap-3">
          
          <div class="vr text-secondary d-none d-md-block" style="height: 35px; opacity: 0.2;"></div>

          <div class="d-flex align-items-center gap-3 ps-2">
            <div class="text-end d-none d-sm-block line-height-sm">
              <p class="mb-0 fw-bold text-dark">${fullName}</p>
              <p class="mb-0 text-muted" style="font-size: 0.8rem;">${userRole}</p>
            </div>
            
            <img src="${userPhoto}" 
                 onerror="this.onerror=null; this.src='${defaultPhoto}';"
                 class="rounded-circle object-fit-cover border border-2" 
                 style="border-color: #D4A017 !important; cursor: pointer;"
                 width="50" height="50" 
                 alt="Foto de perfil"
                 id="user-avatar"
            >
          </div>

        </div>
      </div>
    </div>
  `;
}
