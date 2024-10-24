document.getElementById('login').
addEventListener('submit',function(event){
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();

    const email = document.getElementById('email').value.trim();

    const password = document.getElementById('password').value.trim();

    if (!usuario || !email || !password) {
        alert('Por Favor, insira todos os dados');
        return
    }

    console.log("Usuário :", usuario)
    console.log("Email :",email)
    console.log("Password :", password)

    this.reset();
})

