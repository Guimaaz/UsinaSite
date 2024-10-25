function isUserLoggedIn() {
  return document.cookie.split("; ").some(cookie => cookie.startsWith("token="));
}

function updateNavbarForLoggedInUser() {
  const loginLink = document.getElementById("CelularLogin");
  const loginIconLink = document.getElementById("loginIconLink");
  const loginIconImage = document.getElementById("loginIconImage");
  const dashboardText = document.getElementById("dashboardText");

  if (isUserLoggedIn()) {
      // Altera o link e o texto do "Login" para "Dashboard"
      loginLink.textContent = "Dashboard";
      loginLink.href = "./dashboard.html";

      // Esconde a imagem e exibe o texto "Dashboard"
      loginIconImage.style.display = "none";
      dashboardText.style.display = "inline";
      loginIconLink.href = "./dashboard.html";
  }
}

// Atualiza a navbar ao carregar a página
document.addEventListener("DOMContentLoaded", updateNavbarForLoggedInUser);
