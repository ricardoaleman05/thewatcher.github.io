// Para cargar las noticias desde el archivo JSON utilizando AJAX:

document.addEventListener('DOMContentLoaded', function() {
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            let newsContainer = document.getElementById('news-container');
            data.forEach(news => {
                let newsItem = document.createElement('div');
                newsItem.innerHTML = `<h3>${news.title}</h3><img src="${news.image}"/><p>${news.content}</p>`;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});

// Validación del formulario y cálculo del presupuesto

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('budget-form');
    const totalElement = document.getElementById('total');
    
    form.addEventListener('input', function() {
        const producto = document.getElementById('producto').value;
        const plazo = parseInt(document.getElementById('plazo').value) || 0;
        const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked'))
            .map(extra => extra.value);

        if (plazo > 10) {
            alert('El plazo no puede ser mayor a 10 meses.');
            document.getElementById('plazo').value = 10; // valor máximo permitido
        }
        
            let total = calcularPresupuesto(producto, plazo, extras);
        totalElement.textContent = total + ' USD';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validarFormulario()) {
            alert('Formulario enviado correctamente.');
            form.reset();
            totalElement.textContent = '';
        }
    });
});

function calcularPresupuesto(producto, plazo, extras) {
    let basePrice = 0;
    if (producto === 'producto1') basePrice = 120;
    else if (producto === 'producto2') basePrice = 155;
    else if (producto === 'producto3') basePrice = 265;
    else if (producto === 'producto4') basePrice = 125;
    else if (producto === 'producto5') basePrice = 115;
    else if (producto === 'producto6') basePrice = 325;
    else if (producto === 'producto7') basePrice = 164;
    else if (producto === 'producto8') basePrice = 224;

    let total = basePrice;
    total -= plazo * 3;
    extras.forEach(extra => total += 35);
    return total;
}

function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const condiciones = document.getElementById('condiciones').checked;

    const nombreValido = /^[A-Za-z\s]{1,15}$/.test(nombre);
    const apellidosValido = /^[A-Za-z\s]{1,40}$/.test(apellidos);
    const telefonoValido = /^\d{9}$/.test(telefono);
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nombreValido) {
        alert('Nombre debe contener solo letras y tener una longitud máxima de 15 caracteres.');
        return false;
    }
    if (!apellidosValido) {
        alert('Apellidos deben contener solo letras y tener una longitud máxima de 40 caracteres.');
        return false;
    }
    if (!telefonoValido) {
        alert('Teléfono debe contener solo números y tener una longitud de 9 dígitos.');
        return false;
    }
    if (!emailValido) {
        alert('Correo electrónico debe cumplir con el formato estándar.');
        return false;
    }
    if (!condiciones) {
        alert('Debe aceptar las condiciones de privacidad.');
        return false;
    }

    return true;
}
