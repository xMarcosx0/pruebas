document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();

  var csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvmX3NNaf5pUaXJqNDneqEz5spM7DNieQrOhfXmDQxbDJhUeVW2DToE3v-AazEGuPkGNWYajvlHDUU/pub?output=csv';

  fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
      var lines = data.split('\n');
      var users = [];

      for (var i = 1; i < lines.length; i++) {
        var parts = lines[i].split(',');
        if (parts.length === 5) {
          var user = {
            nombres: parts[0].trim(),
            apellidos: parts[1].trim(),
            edad: parseInt(parts[2].trim()),
            password: parts[3].trim(),
            rol: parts[4].trim()
          };
          users.push(user);
        }
      }

      var authenticatedUser = users.find(user => user.nombres.toLowerCase() === username.toLowerCase() && user.password === password);

      if (authenticatedUser) {
        alert('Bienvenido, ' + authenticatedUser.nombres + ' ' + authenticatedUser.apellidos + '!');

        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));

        switch (authenticatedUser.rol) {
          case 'Admin':
            window.location.href = '../Html/administrador.html';
            break;
          case 'Trabajador':
            window.location.href = '../Html/trabajador.html';
            break;
          case 'Veterinario':
            window.location.href = '../Html/veterinario.html';
            break;
          default:
            alert('No se ha definido una redirección para este usuario.');
            break;
        }
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function () {
  var currentUser = localStorage.getItem('currentUser');
  console.log(localStorage.getItem('currentUser'));

  if (currentUser) {
    var user = JSON.parse(currentUser);
    console.log('Usuario autenticado:', user.nombres, user.apellidos);

    if (user.rol === 'Admin') {
      window.location.href = '../Html/administrador.html';

    }
    if (user.rol === 'Trabajador') {
      window.location.href = '../Html/trabajador.html';

    }
    if (user.rol === 'Veterinario') {
      window.location.href = '../Html/veterinario.html';

    }
    alert('No se ha definido una redirección para este usuario.');
  }
}
);
