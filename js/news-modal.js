const modal = document.getElementById("newsModal");
const openModalBtn = document.getElementById("openNewsModalBtn");
const closeModalBtn = document.getElementById("closeNewsModalBtn");
const cancelBtn = document.getElementById("cancelNewsBtn");

openModalBtn.onclick = () => (modal.style.display = "flex");
closeModalBtn.onclick = closeModal;
cancelBtn.onclick = closeModal;

function closeModal() {
  modal.style.display = "none";
  document.getElementById("newsModalForm").reset();
}

document.getElementById("saveNewsBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const content = document.getElementById("content").value;
  const imageUrl = document.getElementById("imageLink").value;

  const data = {
    title,
    content,
    imageUrl,
  };

  try {
    const response = await fetch("http://127.0.0.1:3333/news/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      VanillaToasts.create({
        title: "Sucesso",
        text: "Notícia adicionada com sucesso!",
        type: "success",
        timeout: 3000,
      });
      closeModal();
    } else {
      VanillaToasts.create({
        title: "Erro",
        text: "Erro ao adicionar a notícia. Tente novamente.",
        type: "error",
        timeout: 3000,
      });
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    VanillaToasts.create({
      title: "Erro de Conexão",
      text: "Erro na requisição. Verifique sua conexão.",
      type: "error",
      timeout: 3000,
    });
  }
});
