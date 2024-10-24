document.getElementById('loginArea')
.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();

    if (!email) {
        alert('Por favor, insira todos os dados');
        return;
    }

    console.log("Email:", email);

    this.reset();
});
