async function validateUserPermission() {
  try {
    const response = await fetch('http://127.0.0.1:3333/auth/me', {
      method: 'GET',
      credentials: 'include'
    })
  
    const data = await response.json()
    const userType = data.user.type

    return userType === 'ADMIN' ? true : false
  } catch (e) {
    console.log(e)
    return false
  }
}

async function validateOrRedirect() {
  if (!await validateUserPermission()) {
    window.location.href = "../index.html";
  }
}

document.addEventListener("DOMContentLoaded", validateOrRedirect);