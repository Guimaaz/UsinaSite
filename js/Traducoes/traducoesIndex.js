const content = {
    "pt-BR": {
        "Translate to english": "Translate to english",
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
        "Saiba Mais": "Saiba Mais",
        "Assine nosso abaixo-assinado e junte-se a nós na luta por mudanças significativas! ✍️": "Assine nosso abaixo-assinado e junte-se a nós na luta por mudanças significativas! ✍️",
        "Mensagem 2": "Mensagem 2",
        "Mensagem 3": "Mensagem 3",
        "O Coletivo Usina Eco-Cultural surgiu do descontentamento de moradores próximos à região do Ipiranga e do antigo Incinerador Vergueiro, que foi deixado ao abandono por mais de 20 anos. Arquitetos, urbanistas, ativistas, artistas e ambientalistas e pessoas de diversas profissões decidiram, desde 2019, se unir e discutir propostas de transformação e melhorias não apenas para o Incinerador, mas para a região como um todo. O coletivo é plural, multipartidário e horizontal.": "O Coletivo Usina Eco-Cultural surgiu do descontentamento de moradores próximos à região do Ipiranga e do antigo Incinerador Vergueiro, que foi deixado ao abandono por mais de 20 anos. Arquitetos, urbanistas, ativistas, artistas e ambientalistas e pessoas de diversas profissões decidiram, desde 2019, se unir e discutir propostas de transformação e melhorias não apenas para o Incinerador, mas para a região como um todo. O coletivo é plural, multipartidário e horizontal.",
        "A proposta do movimento é readequar o espaço do que foi o Incinerador Vergueiro, transformando-o em um centro de cultura e estudos sobre o meio ambiente, mantendo viva a memória do que foi aquele espaço e proporcionando um local para reflexão sobre a cidade justa e democrática que desejamos no futuro.": "A proposta do movimento é readequar o espaço do que foi o Incinerador Vergueiro, transformando-o em um centro de cultura e estudos sobre o meio ambiente, mantendo viva a memória do que foi aquele espaço e proporcionando um local para reflexão sobre a cidade justa e democrática que desejamos no futuro.",
        "O que o Coletivo da Usina Eco-Cultural quer: (Polo Cultural, Museu do Meio Ambiente, Mercado de Alimentação Orgânica e Programa Ruas Abertas na frente da Usina)": "O que o Coletivo da Usina Eco-Cultural quer: (Polo Cultural, Museu do Meio Ambiente, Mercado de Alimentação Orgânica e Programa Ruas Abertas na frente da Usina)"
    
        
    },
    "en-US": {
        "Translate to english": "Translate to Portuguese",
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
        "Saiba Mais": "Learn More",
        "Assine nosso abaixo-assinado e junte-se a nós na luta por mudanças significativas! ✍️": "Sign our petition and join us in the fight for meaningful change! ✍️",
        "Mensagem 2": "message 2",
        "Mensagem 3": "message 3",
        "O Coletivo Usina Eco-Cultural surgiu do descontentamento de moradores próximos à região do Ipiranga e do antigo Incinerador Vergueiro, que foi deixado ao abandono por mais de 20 anos. Arquitetos, urbanistas, ativistas, artistas e ambientalistas e pessoas de diversas profissões decidiram, desde 2019, se unir e discutir propostas de transformação e melhorias não apenas para o Incinerador, mas para a região como um todo. O coletivo é plural, multipartidário e horizontal.": "The Coletivo Usina Eco-Cultural emerged from the discontent of residents close to the Ipiranga region and the old Incinerador Vergueiro, which was left abandoned for more than 20 years. Architects, urban planners, activists, artists and environmentalists and people from different professions decided, since 2019, come together and discuss proposals for transformation and improvements not only for Incinerador, but for the region as a whole. The collective is plural, multi-party and horizontal.",
        "A proposta do movimento é readequar o espaço do que foi o Incinerador Vergueiro, transformando-o em um centro de cultura e estudos sobre o meio ambiente, mantendo viva a memória do que foi aquele espaço e proporcionando um local para reflexão sobre a cidade justa e democrática que desejamos no futuro.": "The movement's proposal is to redesign the space that was the Incinerador Vergueiro, transforming it into a center for culture and environmental studies, keeping alive the memory of what that space was and providing a place for reflection on the just and democratic city we desire for the future.",
        "O que o Coletivo da Usina Eco-Cultural quer: (Polo Cultural, Museu do Meio Ambiente, Mercado de Alimentação Orgânica e Programa Ruas Abertas na frente da Usina)": "The Usina Eco-Cultural Collective's goals: (Cultural Hub, Environmental Museum, Organic Food Market, and Open Streets Program in front of the Usina)"
    }
};

let currentLanguage = "pt-BR";

// Salva o texto original em cada span e segura para traduzir dps
document.querySelectorAll(".textoTraduzir").forEach(el => {
    if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent.trim().replace(/\s+/g, ' ');
    }
});

function toggleLanguage() {
    currentLanguage = currentLanguage === "pt-BR" ? "en-US" : "pt-BR";
    const languageButton = document.getElementById("languageButton");
    if (languageButton) {
        languageButton.textContent = currentLanguage === "pt-BR" ? "Translate to English" : "Translate to Portuguese";
    }

    // traduz e altera a estrutura somente doq ta dentro da classe span, mantendo imagens (bgl dificl de fazer viu)
    document.querySelectorAll(".textoTraduzir").forEach(el => {
        const originalText = el.dataset.originalText;
        const translatedText = content[currentLanguage][originalText];
        el.textContent = translatedText || originalText;
    });
}
