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
      `;
      
      eventCardDiv.appendChild(cardDiv);
    });
    
  } catch (e) {
    console.log(e)
  }
}

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