const newsModal = document.getElementById("newsModal");
const openNewsModalBtn = document.getElementById("openNewsModalBtn");
const closeNewsModalBtn = document.getElementById("closeNewsModalBtn");
const cancelNewsBtn = document.getElementById("cancelNewsBtn");

openNewsModalBtn.onclick = () => (newsModal.style.display = "flex");
closeNewsModalBtn.onclick = closeModal;
cancelNewsBtn.onclick = closeModal;

function closeModal() {
  newsModal.style.display = "none";
  document.getElementById("newsModalForm").reset();
}

document.getElementById("saveNewsBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("newsContent").value;
  const imageUrl = document.getElementById("newsImageLink").value;

  const data = {
    title,
    content,
    imageUrl,
  };

  console.log(data)

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
