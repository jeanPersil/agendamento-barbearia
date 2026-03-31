import { initLogin } from "./modules/auth.js";
import startDashBoard from "./modules/dashboard.js";
import startUser from "./modules/user.js";
import initAgenda from "./modules/agenda.js";
import { initServicos } from "./modules/servicos.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  switch (true) {
    case path.includes("login"):
      initLogin();
      break;

    case path.includes("dashboard"):
      startDashBoard();
      break;

    case path.includes("usuarios"):
      startUser();
      break;

    case path.includes("servicos"):
      initServicos();
      break;

    case path.includes("agenda"):
      initAgenda();
      break;

    default:
      // Opcional: O que fazer se não cair em nenhuma das rotas acima
      // console.log("Rota não encontrada ou não mapeada");
      break;
  }
});
