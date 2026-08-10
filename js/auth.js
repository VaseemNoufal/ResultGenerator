/*
  Frontend demo authentication.
  IMPORTANT: this is NOT secure authentication because the password is
  visible in the browser source. Use a real backend/auth provider for production.
*/
const APP_CREDENTIALS = {
  username: "admin",
  password: "mubashirfaizal"
};

function setLoggedIn() {
  localStorage.setItem("resultPosterLoggedIn", "true");
}

function isLoggedIn() {
  return localStorage.getItem("resultPosterLoggedIn") === "true";
}

function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("resultPosterLoggedIn");
  window.location.href = "index.html";
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (username === APP_CREDENTIALS.username && password === APP_CREDENTIALS.password) {
      setLoggedIn();
      message.textContent = "Login successful. Redirecting…";
      message.className = "form-message success";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 250);
    } else {
      message.textContent = "Incorrect username or password.";
      message.className = "form-message error";
    }
  });
}
