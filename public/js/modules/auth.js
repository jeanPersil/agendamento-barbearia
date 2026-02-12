import { login } from "../api/auth.js";
import { renderAlert } from "../components/alert.js";
const form = document.getElementById("loginForm");
const alert = document.getElementById("alert");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userData = new FormData(form);

  try {
    const data = await login({
      email: userData.get("email"),
      password: userData.get("password"),
    });
    console.log("sucesso! ", data);
  } catch (error) {
    alert.innerHTML = renderAlert(error.message);
  }
});
