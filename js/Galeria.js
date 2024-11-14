function toggleGaleria(event) {
    event.preventDefault();
    const opcoes = document.querySelector('.opcoes-galeria');
    opcoes.style.display = opcoes.style.display === 'none' ? 'block' : 'none';
}