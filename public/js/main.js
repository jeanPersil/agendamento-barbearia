import { initLogin } from "./modules/auth.js";
import startDashBoard from "./modules/dashboard.js";
import startUser from "./modules/user.js";
import { initServicos } from "./modules/servicos.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("login")) {
    initLogin();
  }

  if (path.includes("dashboard")) {
    startDashBoard();
  }

  if (path.includes("usuarios")) {
    startUser();
  }

  if (path.includes("servicos")) {
    initServicos();
  }
});
