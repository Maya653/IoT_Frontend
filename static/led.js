// Obtén el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const dispositivo = urlParams.get('identificador');
//const baseUrl = "http://localhost:8000/dispositivo";
const baseUrl = "https://iot-backen-5cc85ad97e0a.herokuapp.com/dispositivo"

// Función para obtener un solo registro por su ID
function getDispositivoById(dispositivo) {
    fetch(`${baseUrl}/${dispositivo}`)
        .then(response => response.json())
        .then(dispositivo_e => {
            console.log(dispositivo_e);

            // Ahora puedes mostrar los datos del registro en la página "ver.html" como valores predeterminados en campos de entrada
            const identificador = document.getElementById("identificador");
            const nombre = document.getElementById("nombre");

            identificador.value = dispositivo_e.id;
            nombre.value = dispositivo_e.nombre;
            if (dispositivo_e.valor === 0) {
                document.getElementById("status").checked = false;
            } else if (dispositivo_e.valor === 1) {
                document.getElementById("status").checked = true;
            }
        })
        .catch(error => console.error("Error al realizar la solicitud:", error));
}

// Llama a la función para obtener y mostrar el registro
getDispositivoById(dispositivo);

function updateData(id, nombre, valor) {
    const url = `${baseUrl}/${id}`;
    const data = {
        id: id,
        nombre: nombre,
        valor: valor
    };

    console.log(JSON.stringify(data));

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(responseText => {
        alert(responseText);
        window.location.href = '/';
    })
    .catch(error => console.error("Error al realizar la solicitud:", error));
}
