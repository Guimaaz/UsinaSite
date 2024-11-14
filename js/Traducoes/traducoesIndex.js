
const content = {
    "pt-BR": {
        "Coleções": "Coleções",
        "História": "História",
        "Nos Apoie": "Nos Apoie",
        "Loja": "Loja",
        "Eventos": "Eventos",
        "Noticias": "Notícias",
        "Boletim": "Boletim",
        "Fale conosco": "Fale conosco",
        "Apoiadores": "Apoiadores",
        "Galeria": "Galeria",
        "Fotos": "Fotos",
        "Vídeos": "Vídeos",
        "Login": "Login",
        "Dashboard": "Dashboard",
        "O Coletivo": "O Coletivo",
        "Quem Somos": "Quem Somos",
        "Nossas Intenções": "Nossas Intenções",
        "GT Cultura": "GT Cultura",
        "GT Meio-Ambiente": "GT Meio-Ambiente",
        "Ajudar": "Ajudar",
        "Saiba Mais": "Saiba Mais"
    },
    "en-US": {
        "Coleções": "Collections",
        "História": "History",
        "Nos Apoie": "Support Us",
        "Loja": "Store",
        "Eventos": "Events",
        "Noticias": "News",
        "Boletim": "Newsletter",
        "Fale conosco": "Contact Us",
        "Apoiadores": "Supporters",
        "Galeria": "Gallery",
        "Fotos": "Photos",
        "Vídeos": "Videos",
        "Login": "Login",
        "Dashboard": "Dashboard",
        "O Coletivo": "The Collective",
        "Quem Somos": "Who We Are",
        "Nossas Intenções": "Our Intentions",
        "GT Cultura": "Culture GT",
        "GT Meio-Ambiente": "Environment GT",
        "Ajudar": "Help",
        "Saiba Mais": "Learn More"
    }
};

let currentLanguage = "pt-BR";


document.querySelectorAll("[id^='ancora'], .efeitoButton, h1, h2, h3, p").forEach(el => {
  if (!el.dataset.originalText) {
    el.dataset.originalText = el.textContent.trim();
  }
});

function toggleLanguage() {
  currentLanguage = currentLanguage === "pt-BR" ? "en-US" : "pt-BR";

  document.getElementById("languageButton").textContent = currentLanguage === "pt-BR" ? "Translate in english" : "Translate in portuguese";

  document.querySelectorAll("[id^='ancora'], .efeitoButton, h1, h2, h3, p").forEach(el => {
    const originalText = el.dataset.originalText;
    const translatedText = content[currentLanguage][originalText];

    if (translatedText) {
      el.textContent = translatedText;
    } else {
      el.textContent = originalText; 
    }
  });
}
