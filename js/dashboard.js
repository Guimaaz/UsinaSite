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
    window.location.href = "./Not_Authorized.html";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function loadEvents() {
  try {
    const response = await fetch('http://127.0.0.1:3333/events', {
      credentials: 'include'
    });

    const events = await response.json();

    const eventCardDiv = document.getElementById('EventCard');
    eventCardDiv.innerHTML = '';

    events.forEach((event, index) => {
      console.log(event._id);

      const cardDiv = document.createElement('div');
      cardDiv.className = `Card${index + 1}`;
      
      cardDiv.innerHTML = `
        <img id="card${index + 1}" src="${event.imageUrl}" alt="">
        <p id="cardTitle${index + 1}">${event.name}</p>
        <a href="./pages/Boletim.html" id="cardLink${index + 1}">
          <button class="efeitoButton">Saiba Mais</button>
        </a>
        <div id="cardBtns">
          <button class="editButton" data-index="${index}">Editar</button>
          <button class="deleteButton" data-id="${event._id}">Deletar</button>
        </div>
      `;
      
      eventCardDiv.appendChild(cardDiv);
    });

    document.querySelectorAll('.editButton').forEach(button => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        openModalWithEventData(events[index]);
      });
    });

    document.querySelectorAll('.deleteButton').forEach(button => {
      button.addEventListener('click', function() {
        const eventId = this.getAttribute('data-id');
        console.log('evento foda: ', eventId)
        deleteEvent(eventId);
      });
    });

  } catch (e) {
    console.log(e);
  }
}

let currentEventId = null

function openModalWithEventData(event) {
  const modal = document.getElementById('editEventModal')
  const nameInput = document.getElementById('editName')
  const contentTextarea = document.getElementById('editContent')
  const imageLinkInput = document.getElementById('editImageLink')
  const dateInput = document.getElementById('editDate')

  nameInput.value = event.name || ''
  contentTextarea.value = event.content || ''
  imageLinkInput.value = event.imageUrl || ''

  dateInput.value = formatDate(event.eventDate) || ''

  currentEventId = event._id

  modal.style.display = 'flex'
}


async function saveEditedEvent() {
  const name = document.getElementById('editName').value.trim();
  const content = document.getElementById('editContent').value.trim();
  const imageUrl = document.getElementById('editImageLink').value.trim();
  const date = document.getElementById('editDate').value.trim();

  if (!currentEventId) {
    alert('Evento não encontrado');
    console.error('Erro: currentEventId não está definido');
    return;
  }

  function formatDateToDDMMYYYY(date) {
    const [year, month, day] = date.split('-');
    return `${day}${month}${year}`;
  }

  const eventDate = formatDateToDDMMYYYY(date);

  const updatedEventData = {
    name,
    content,
    imageUrl,
    eventDate,
  };

  console.log('Dados enviados ao backend:', updatedEventData);

  try {
    const response = await fetch(`http://127.0.0.1:3333/events/update/${currentEventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEventData),
    });

    if (!response.ok) {
      throw new Error(`Erro na atualização: ${response.status}`);
    }

    const data = await response.json();
    console.log('Resposta do backend:', data);
    alert('Evento atualizado com sucesso!');

    window.location.reload()
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao atualizar o evento. Tente novamente mais tarde.');
  }
}

document.getElementById('saveEditEventBtn').addEventListener('click', saveEditedEvent)

async function deleteEvent(eventId) {
  console.log('id q chegou na funcao: ', eventId)

  if (!eventId) {
    alert('ID do evento não encontrado');
    console.error('Erro: eventId não está definido');
    return;
  }

  const confirmDeletion = confirm('Tem certeza que deseja deletar este evento? Esta ação é irreversível.');
  if (!confirmDeletion) {
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3333/events/${eventId}`, {
      method: 'DELETE',
    });

    console.log(response.statusText)

    if (!response.ok) {
      throw new Error(`Erro ao deletar evento: ${response.status}`);
    }

    const data = await response.json();
    console.log('Evento deletado com sucesso:', data);
    VanillaToasts.create({
      title: "Sucesso!",
      text: "Evento deletado com sucesso",
      type: "success",
      positionClass: "bottomRight",
      timeout: 3000,
    });

    loadEvents();
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao deletar o evento. Tente novamente mais tarde.');
  }
}

document.getElementById('closeEditEventModalBtn').addEventListener('click', () => {
  document.getElementById('editEventModal').style.display = 'none';
});

document.getElementById('cancelEditEventBtn').addEventListener('click', () => {
  document.getElementById('editEventModal').style.display = 'none';
});

async function loadNews() {
  try {
    const response = await fetch('http://127.0.0.1:3333/news', {
      credentials: 'include'
    })

    const news = await response.json()

    news.forEach(($news, index) => {
      console.log($news);
      const newsCardDiv = document.getElementById('NewsCard');
    
      const cardDiv = document.createElement('div');
      cardDiv.className = `Card${index + 1}`;
      
      cardDiv.innerHTML = `
        <img id="card${index + 1}" src="${$news.imageUrl}" alt="">
        <p id="cardTitle${index + 1}">${$news.title}</p>
        <a href="./pages/Boletim.html" id="cardLink${index + 1}">
          <button class="efeitoButton">Saiba Mais</button>
        </a>
      `;
      
      newsCardDiv.appendChild(cardDiv);
    });
    
  } catch (e) {
    console.log(e)
  }
}

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

async function logout() {
  try {
    await fetch('http://127.0.0.1:3333/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })

    window.location.href = '../index.html'
  } catch (e) {
    console.log(e)
  }
}

async function updateNavbarForLoggedInUser() {
  const loginIconLink = document.getElementById("loginOrDashboardBtn");
  const loginIconImage = document.getElementById("loginIconImage");
  const logoutText = document.getElementById("logoutText");

  if (await isUserLoggedIn()) {
    loginIconLink.href = "./pages/Logout.html";
    loginIconImage.style.display = "none";
    logoutText.onclick = logout
    logoutText.style.display = "inline";
  } else {
    loginIconLink.href = "./pages/Login.html";
    loginIconImage.style.display = "inline";
    logoutText.style.display = "none";
  }
}

updateNavbarForLoggedInUser();

document.addEventListener("DOMContentLoaded", validateOrRedirect);
document.addEventListener("DOMContentLoaded", loadEvents)
document.addEventListener("DOMContentLoaded", loadNews)