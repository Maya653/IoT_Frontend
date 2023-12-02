function getAll() {
    var request = new XMLHttpRequest();
    request.open('GET', "http://localhost:8000/dispositivo");
    request.open('GET', "https://iot-backen-5cc85ad97e0a.herokuapp.com//dispositivos");
    request.send();

    request.onload = (e) => {
        const response = request.responseText;

        try {
            const json = JSON.parse(response);
            console.log("status_code: " + request.status);
            
            const tbody_dispositivos = document.getElementById("tbody_dispositivos");

            // Limpia el contenido existente en tbody_dispositivos
            tbody_dispositivos.innerHTML = "";

            if (Array.isArray(json)) {
                for (let i = 0; i < json.length; i++) {
                    const dispositivo = json[i];

                    var tr = document.createElement("tr");
                    var td_nombre = document.createElement("td");

                    var td_estado = document.createElement("td");
                    var td_opciones = document.createElement("td");

                    if (dispositivo["dispositivo"]) {
                        td_nombre.innerHTML = dispositivo["dispositivo"];
                    } else {
                        td_nombre.innerHTML = "LED";
                    }

                    if (dispositivo["id"] != 2) {
                        if (dispositivo["valor"] !== undefined) {
                            if (dispositivo["valor"] === 0) {
                                td_estado.innerHTML = "Inactivo";
                            } else if (dispositivo["valor"] === 1) {
                                td_estado.innerHTML = "Activo";
                            } else {
                                td_estado.innerHTML = "Valor Incorrecto";
                            }
                        } else {
                            td_estado.innerHTML = "Valor no definido";
                        }

                        td_opciones.innerHTML = `<a href='/led?identificador=${dispositivo["id"]}'>Modificar</a>`;
                    } else {
                        if (dispositivo["valor"] !== undefined) {
                            td_estado.innerHTML = dispositivo["valor"];
                        } else {
                            td_estado.innerHTML = "Valor no definido";
                        }

                        td_opciones.innerHTML = `<a href='/potenciometro?identificador=${dispositivo["id"]}'>Ver</a>`;
                    }

                    tr.appendChild(td_nombre);
                    tr.appendChild(td_estado);
                    tr.appendChild(td_opciones);

                    tbody_dispositivos.appendChild(tr);
                }
            } else {
                console.error("El JSON no es un array:", json);
            }
        } catch (error) {
            console.error("Error al analizar JSON:", error);
        }
    };

    request.onerror = (e) => {
        console.error("Error al realizar la solicitud:", e);
    };
}
