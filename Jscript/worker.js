function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('main section');
    secciones.forEach(seccion => {
        if (seccion.id === seccionId) {
            seccion.classList.remove('hidden');
        } else {
            seccion.classList.add('hidden');
        }
    });
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "../Html/login.html";
}