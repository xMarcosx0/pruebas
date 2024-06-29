function showOption(option) {
    document.getElementById('option1').style.display = 'none';
    document.getElementById('option2').style.display = 'none';
    document.getElementById('option3').style.display = 'none';

    if (option === 1) {
        document.getElementById('option1').style.display = 'block';
    } else if (option === 2) {
        document.getElementById('option2').style.display = 'block';
    } else if (option === 3) {
        document.getElementById('option3').style.display = 'block';
    }
}

function agregarUsuario() {
    var nombre = document.getElementById('nombre').value;
    var documento = document.getElementById('documento').value;
    var contrasena = document.getElementById('contrasena').value;
    var rol = document.getElementById('rol').value;

    console.log("Nombre: " + nombre + ", Documento: " + documento + ", Contraseña: " + contrasena + ", Rol: " + rol);

    document.getElementById('newUserForm').reset();

    return false;
}

