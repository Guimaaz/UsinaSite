function isUserLoggedIn() {
  return document.cookie.split("; ").some(cookie => cookie.startsWith("token="));
}

function updateNavbarForLoggedInUser() {
  const loginLink = document.getElementById("CelularLogin");
  const loginIconLink = document.getElementById("loginIconLink");
  const loginIconImage = document.getElementById("loginIconImage");
  const dashboardText = document.getElementById("dashboardText");

  if (isUserLoggedIn()) {
      loginLink.textContent = "Dashboard";
      loginLink.href = "./dashboard.html";

      loginIconImage.style.display = "none";
      dashboardText.style.display = "inline";
      loginIconLink.href = "./dashboard.html";
  }
}

document.addEventListener("DOMContentLoaded", updateNavbarForLoggedInUser);
