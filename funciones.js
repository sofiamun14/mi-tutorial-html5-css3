document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("leerContenido").addEventListener("click", function () {
        let contenido = document.getElementById("editable").innerText;
        alert(contenido);
    });
});

document.querySelectorAll('section').forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'scale(1.1)'; // Aumenta ligeramente el tamaño
        section.style.transition = 'transform 0.3s ease-in-out';
    });
    
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'scale(1)'; // Vuelve al tamaño normal
    });
});



