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

async function me() {
  try {
    const response = await fetch('http://127.0.0.1:3333/auth/me', {
      method: 'GET',
      credentials: 'include'
    })

    const data = await response.json()
    console.log(data.user.type)
    return data.user.type
  } catch (e) {
    console.log(e)
    return false
  }
}

async function updateNavbarForLoggedInUser() {
  const loginIconLink = document.getElementById("loginOrDashboardBtn");
  const loginIconImage = document.getElementById("loginIconImage");
  const dashboardText = document.getElementById("dashboardText");
  const cartText = document.getElementById("cartText");

  if (await isUserLoggedIn()) {
    if (await me() === 'ADMIN') {
      loginIconLink.href = "./pages/DashboardIndex.html";
      loginIconImage.style.display = "none";
      dashboardText.style.display = "inline";
      cartText.style.display = "none";
    } else {
      loginIconLink.href = "./pages/Loja.html";
      loginIconImage.style.display = "none";
      cartText.style.display = "inline";
      dashboardText.style.display = "none";
    }
  } else {
    loginIconLink.href = "./pages/Login.html";
    loginIconImage.style.display = "inline";
    dashboardText.style.display = "none";
    cartText.style.display = "none";
  }
}


async function teste() {
  console.log(await me() === 'ADMIN')
}

document.addEventListener("DOMContentLoaded", updateNavbarForLoggedInUser);
document.addEventListener("DOMContentLoaded", teste);
