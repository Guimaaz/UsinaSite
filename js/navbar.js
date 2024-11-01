async function isUserLoggedIn() {
  try {
    const response = await fetch('http://127.0.0.1:3333/auth/verify', {
      method: 'GET',
      credentials: 'include'
    })

    const data = await response.json()
    return data.loggedIn
  } catch (e) {
    console.log(e)
    return false
  }
}

async function updateNavbarForLoggedInUser() {
  const loginLink = document.getElementById("CelularLogin");
  const loginIconLink = document.getElementById("loginIconLink");
  const loginIconImage = document.getElementById("loginIconImage");
  const dashboardText = document.getElementById("dashboardText");

  if (await isUserLoggedIn()) {
      loginLink.textContent = "Dashboard";
      loginLink.href = "./dashboard.html";

      loginIconImage.style.display = "none";
      dashboardText.style.display = "inline";
      loginIconLink.href = "./dashboard.html";
  }
}

document.addEventListener("DOMContentLoaded", updateNavbarForLoggedInUser);
