const modal = document.getElementById("eventModal");
const openModalBtn = document.getElementById("openEventModalBtn");
const closeModalBtn = document.getElementById("closeEventModalBtn");
const cancelBtn = document.getElementById("cancelEventBtn");

openModalBtn.onclick = () => (modal.style.display = "flex");
closeModalBtn.onclick = closeModal;
cancelBtn.onclick = closeModal;

function closeModal() {
  modal.style.display = "none";
  document.getElementById("eventModalForm").reset();
}

function formatDateToDDMMYYYY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

document.getElementById("saveEventBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const content = document.getElementById("content").value;
  const imageUrl = document.getElementById("imageLink").value;
  const eventDateRaw = document.getElementById("date").value;
  const eventDate = formatDateToDDMMYYYY(eventDateRaw);

  const data = {
    name,
    content,
    imageUrl,
    eventDate,
  };

  try {
    const response = await fetch("http://127.0.0.1:3333/events/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      VanillaToasts.create({
        title: "Sucesso",
        text: "Evento adicionado com sucesso!",
        type: "success",
        timeout: 3000,
      });
      closeModal();
    } else {
      VanillaToasts.create({
        title: "Erro",
        text: "Erro ao adicionar o evento. Tente novamente.",
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
