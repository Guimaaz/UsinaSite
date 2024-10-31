document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginArea");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evita o recarregamento da página
  
      const email = document.getElementById("email").value;
      const submitButton = document.getElementById("submit");
      
      // Desabilita o botão e exibe um indicador de carregamento
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
  
      try {
        const response = await fetch("http://localhost:3333/auth/update-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          VanillaToasts.create({
            title: "Sucesso",
            text: data.message || "E-mail de recuperação enviado com sucesso.",
            type: "success",
            timeout: 4000,
          });
        } else {
          VanillaToasts.create({
            title: "Erro",
            text: data.error || "Ocorreu um problema ao enviar o e-mail.",
            type: "error",
            timeout: 4000,
          });
        }
      } catch (error) {
        VanillaToasts.create({
          title: "Erro",
          text: "Erro de conexão com o servidor.",
          type: "error",
          timeout: 4000,
        });
      } finally {
        // Reabilita o botão e restaura o texto original
        submitButton.disabled = false;
        submitButton.textContent = "Recuperar senha";
      }
    });
  });
  