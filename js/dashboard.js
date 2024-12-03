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

function formatDateToDDMMYYYY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

async function loadEvents() {
  try {
    const response = await fetch('http://127.0.0.1:3333/events', {
      credentials: 'include'
    })

    const events = await response.json() // é um array de eventos

    events.forEach((event, index) => {
      console.log(event);
      const eventCardDiv = document.getElementById('EventCard');
    
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
          <button class="deleteButton">Deletar</button>
        </div>
      `;
      
      eventCardDiv.appendChild(cardDiv);
    });

    document.querySelectorAll('.editButton').forEach(button => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-index')
        console.log(events[index])
        openModalWithEventData(events[index])
      })
    })
    
  } catch (e) {
    console.log(e)
  }
}

let currentEventId = null

function openModalWithEventData(event) {
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

function saveEditedEvent() {
  const name = document.getElementById('editName').value
  const content = document.getElementById('editContent').value
  const imageLink = document.getElementById('editImageLink').value
  const date = document.getElementById('editDate').value

  if(!currentEventId) {
    alert('Evento não encontrado')
    return
  }

  const updatedEventData = {
    name,
    content,
    imageUrl,
    eventDate: formatDateToDDMMYYYY(date)
  }
}

document.getElementById('saveEditEventBtn').addEventListener('click', saveEditedEvent)

document.getElementById('closeEditEventModalBtn').addEventListener('click', () => {
  document.getElementById('editEventModal').style.display = 'none';
});

// Fecha o modal ao clicar no botão "Cancelar"
document.getElementById('cancelEditEventBtn').addEventListener('click', () => {
  document.getElementById('editEventModal').style.display = 'none';
});

async function loadNews() {
  try {
    const response = await fetch('http://127.0.0.1:3333/news', {
      credentials: 'include'
    })

    const news = await response.json() // é um array de eventos

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

document.addEventListener("DOMContentLoaded", validateOrRedirect);
document.addEventListener("DOMContentLoaded", loadEvents)
document.addEventListener("DOMContentLoaded", loadNews)