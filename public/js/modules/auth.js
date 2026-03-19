import { login } from "../api/auth.js";
import { renderAlert } from "../components/common/alert.js";

function initLogin() {
  const form = document.getElementById("loginForm");
  const alertContainer = document.getElementById("alert");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userData = new FormData(form);
    try {
      const data = await login({
        email: userData.get("email"),
        password: userData.get("password"),
      });

      window.localStorage.setItem("userId", data.user.id);
      window.localStorage.setItem("userEmail", data.user.email);
      window.localStorage.setItem("userName", data.user.name);
      window.localStorage.setItem("userRole", data.user.role);

      window.location.href = data.user.page;
    } catch (error) {
      alertContainer.innerHTML = renderAlert(error.message);
    }
  });
}

export { initLogin };
