import { getStoredUser, loginUser } from "./shared.js";

if (getStoredUser()) {
  window.location.replace("index.html");
}

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const loginMessage = document.getElementById("login-message");

  loginMessage.textContent = "";

  try {
    await loginUser(email, password);
    window.location.replace("index.html");
  } catch (error) {
    loginMessage.textContent = error.message;
  }
});
