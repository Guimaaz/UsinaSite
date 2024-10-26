function isUserLoggedIn() {
    return document.cookie.split('; ').some(cookie => cookie.startsWith("token="))
}

if(isUserLoggedIn()) {
    window.location.href = './Dashboard.html'
}

document.getElementById("loginArea").addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = document.getElementById("submit");
    const buttonText = document.getElementById("button-text");
    const spinner = document.getElementById("spinner");
    
    submitButton.disabled = true;
    buttonText.style.display = "none";
    spinner.style.display = "inline-block";

    const username = document.getElementById("usuario").value;
    const password = document.getElementById("senha").value;

    try {
        const response = await fetch("http://localhost:3333/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            document.cookie = `token=${data.token}; max-age=86400; path=/;`;
            showToast("Login realizado com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000)
        } else {
            showToast(data.message || "Erro no login. Verifique suas credenciais.", "error");
        }
    } catch (error) {
        console.error("Erro:", error);
        showToast("Erro de conexão com o servidor.", "error");
    } finally {
        submitButton.disabled = false;
        buttonText.style.display = "inline";
        spinner.style.display = "none";
    }
});


function showToast(message, type) {
    VanillaToasts.create({
        text: message,
        type: type === "success" ? "success" : "error",
        timeout: 6000,
        positionClass: "bottomRight"
    });
}
