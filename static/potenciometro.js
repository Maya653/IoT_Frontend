// Obtén el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const dispositivoId = urlParams.get('identificador');
//const baseUrl = "http://localhost:8000/dispositivo";
const baseUrl = "https://iot-backen-5cc85ad97e0a.herokuapp.com//dispositivo";

// Función para obtener un solo registro por su ID
function getDispositivoById(dispositivoId) {
    fetch(`${baseUrl}/${dispositivoId}`)
        .then(response => response.json())
        .then(dispositivo => {
            // Ahora puedes mostrar los datos del registro en la página "ver.html"
            const detalle = document.getElementById("detalle");
            detalle.innerHTML = `
                <p>Dispositivo: ${dispositivo.dispositivo}</p>
                <p>Valor del sensor: ${dispositivo.valor}</p>
            `;
        })
        .catch(error => console.error("Error al realizar la solicitud:", error));
}

// Llama a la función para obtener y mostrar el registro
getDispositivoById(dispositivoId);
