let map;
let directionsService;
let directionsRenderer;
let autocomplete;

function initMap() {
    // Inicializa el mapa centrado en la dirección de la empresa
    const empresa = { lat: 37.382065898959006, lng: -5.968507768863725 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: empresa
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Inicializar autocompletado
    const input = document.getElementById('contact-address');
    autocomplete = new google.maps.places.Autocomplete(input);

    // Configurar el formulario para calcular la ruta
    const form = document.getElementById('route-form');
    form.addEventListener('contact-submit', function(event) {
        event.preventDefault();
        calculateAndDisplayRoute();
    });
}

function calculateAndDisplayRoute() {
    const address = document.getElementById('contact-address').value;
    if (!address) {
        alert('Por favor, ingresa una dirección.');
        return;
    }

    directionsService.route(
        {
            origin: address,
            destination: 'C/ Marqués del Nervión, 78, 41005 Sevilla, España',
            travelMode: google.maps.TravelMode.DRIVING
        },
        function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('No se pudo calcular la ruta: ' + status);
            }
        }
    );
}