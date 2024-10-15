document.getElementById('contact-form').addEventListener('submit', function(event) {
     
    event.preventDefault();
    
   
    const assunto = document.getElementById('assunto').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const email = document.getElementById('email').value.trim();
    const conheceu = document.getElementById('conheceu').value.trim()

    
    if (!assunto || !nome || !sobrenome || !numero || !email || !conheceu) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return; 
    }

   
    console.log("Assunto:", assunto);
    console.log("Nome:", nome);
    console.log("Sobrenome:", sobrenome);
    console.log("Número:", numero);
    console.log("Email:", email);
    console.log("Conheceu:", conheceu)

    
    alert('Mensagem enviado com sucesso!');

    
    this.reset();
});