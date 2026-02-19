import { initLogin } from "./modules/auth.js";
import { startDashBoard } from "./modules/dashboard.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("login")) {
    initLogin();
  }

  if (path.includes("dashboard")) {
    console.log("dentro do main.js");
    startDashBoard();
  }
});
