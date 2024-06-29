


document.getElementById('form-mensajes').addEventListener('submit', function(event) {
    event.preventDefault();

    var mensaje = document.getElementById('mensaje').value.trim();

    if (mensaje === '') {
        alert('Por favor, escribe un mensaje.');
        return;
    }

    alert('Mensaje enviado con éxito.');
});


document.getElementById('form-generar-reportes').addEventListener('submit', function(event) {
    event.preventDefault();

    var fechaInicio = document.getElementById('fecha-inicio').value.trim();
    var fechaFin = document.getElementById('fecha-fin').value.trim();

    if (fechaInicio === '' || fechaFin === '') {
        alert('Por favor, completa todas las fechas.');
        return;
    }

    alert('Reporte generado correctamente.');
});

document.getElementById('form-exportar-reportes').addEventListener('submit', function(event) {
    event.preventDefault();

    var formato = document.getElementById('formato').value;

    if (formato === '') {
        alert('Por favor, selecciona un formato de exportación.');
        return;
    }

    alert('Reporte exportado correctamente en formato ' + formato + '.');
});


document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault();

    var mensajeContacto = document.getElementById('mensaje-contacto').value.trim();

    if (mensajeContacto === '') {
        alert('Por favor, escribe un mensaje de contacto.');
        return;
    }

    var contacto = document.getElementById('contacto').value;
    var tipoContacto = (contacto === 'trabajadores') ? 'Trabajadores' : 'Administrador';

    alert('Mensaje enviado a ' + tipoContacto + ' con éxito.');
});

  document.getElementById('form2').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
  
    var registroFecha = document.getElementById('registro_fecha').value.trim();
    var diagnostico = document.getElementById('diagnostico').value.trim();
    var tratamientoPrescrito = document.getElementById('tratamiento_prescrito').value.trim();
    var inicioTratamiento = document.getElementById('inicio_tratamiento').value.trim();
    var finTratamiento = document.getElementById('fin_tratamiento').value.trim();
    var resultadoTratamiento = document.getElementById('resultado_tratamiento').value.trim();
    
   
    if (registroFecha === ''  || diagnostico === '' || tratamientoPrescrito === '' || inicioTratamiento === '' || finTratamiento === '' || resultadoTratamiento === '') {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
   
    var documentos = document.getElementById('adjuntar_documentos').files;
    var adjuntos = [];
    for (var i = 0; i < documentos.length; i++) {
        adjuntos.push(documentos[i].name); 
    }
  
  
    var formData = {
        "registro_fecha": registroFecha,
        "diagnostico": diagnostico,
        "tratamiento_prescrito": tratamientoPrescrito,
        "inicio_tratamiento": inicioTratamiento,
        "fin_tratamiento": finTratamiento,
        "resultado_tratamiento": resultadoTratamiento,
        "adjuntar_documentos": adjuntos
    };
  
  
    var jsonData = JSON.stringify(formData, null, 2); 
  
  
    document.getElementById('json-output2').textContent = jsonData;
  });
  
  
  
  
  function ocultar() {
    var div =document.getElementById('b1');
    div.style.display='none';
    
  }
  function mostrar() {
    div =document.getElementById('b1');
    div.style.display='';
    
  }


  document.addEventListener('DOMContentLoaded', function() {

    fetch('/paginaweb/Json/tablas.json')
        .then(response => response.json())
        .then(data => {
      
            renderizarTablaResumenSalud(data.resumenSalud);

            renderizarTablaNotificaciones(data.notificaciones);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});


function renderizarTablaResumenSalud(data) {
    var tabla = document.createElement('table');
    var thead = tabla.createTHead();
    var tbody = tabla.createTBody();

    var headers = ['ID del Lote', 'Número de Aves', 'Estado de Salud', 'Observaciones'];
    var headerRow = thead.insertRow();
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });


    data.forEach(function(item) {
        var row = tbody.insertRow();
        row.innerHTML = `<td>${item.idLote}</td><td>${item.numAves}</td><td>${item.estadoSalud}</td><td>${item.observaciones}</td>`;
    });


    var resumenSaludSection = document.getElementById('resumen-salud');
    resumenSaludSection.innerHTML = '';


    resumenSaludSection.appendChild(tabla);
}


function renderizarTablaNotificaciones(data) {
    var tabla = document.createElement('table');
    var thead = tabla.createTHead();
    var tbody = tabla.createTBody();


    var headers = ['Fecha', 'Notificación', 'Prioridad'];
    var headerRow = thead.insertRow();
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });


    data.forEach(function(item) {
        var row = tbody.insertRow();
        row.innerHTML = `<td>${item.fecha}</td><td>${item.notificacion}</td><td>${item.prioridad}</td>`;
    });

   
    var notificacionesSection = document.getElementById('notificaciones');
    notificacionesSection.innerHTML = '';

  
    notificacionesSection.appendChild(tabla);
}
document.addEventListener('DOMContentLoaded', function() {
   
    var tablaHistorial = document.getElementById('historial-reciente');

  
    if (tablaHistorial) {
       
        var tbody = tablaHistorial.getElementsByTagName('tbody')[0];

     
        fetch('/paginaweb/Json/tablas.json')
            .then(response => response.json())
            .then(data => {
          
                data.historial.forEach(item => {
                    var row = tbody.insertRow();
                    row.innerHTML = `<td>${item.idLote}</td><td>${item.fecha}</td><td>${item.diagnostico}</td><td>${item.tratamiento}</td>`;
                });
            })
            .catch(error => console.error('Error al cargar el archivo JSON:', error));
    } else {
        console.error('No se encontró la tabla con id "tabla-historial" en el documento.');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('/paginaweb/Json/tablas.json')
        .then(response => response.json())
        .then(data => {
            console.log('Datos JSON cargados:', data); // Añade esta línea para depuración
            if (data && data.reportes) {
                renderizarTablaReportes(data.reportes);
            } else {
                console.error('No se encontraron reportes en el JSON.');
            }
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

function renderizarTablaReportes(data) {
    var tabla = document.getElementById('reportes-recientes').getElementsByTagName('tbody')[0];
    
    data.forEach(function(item) {
        var row = tabla.insertRow();
        row.innerHTML = `<td>${item.fecha_generacion}</td><td>${item.periodo}</td><td>${item.formato}</td>`;
    });
}




  
  
  
  
  
  
  
  
