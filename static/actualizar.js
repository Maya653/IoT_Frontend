const apiUrl = 'https://localhost:8080';

async function actualizarDispositivo() {
    const valorInput = document.getElementById('valor').value;
  
    if (!valorInput) {
      alert('Por favor, ingrese un valor.');
      return;
    }
  
    const dispositivo = {
      nombre: 'led',  // Ingresa el nombre del dispositivo según tu lógica
      valor: valorInput
    };
  
    try {
      const response = await fetch(`${apiUrl}/dispositivo/${valorInput}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dispositivo)
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar dispositivo: ${response.statusText}`);
      }
  
      const result = await response.json();
      alert(result.mensaje);
  
      // Actualiza la lista de dispositivos después de la actualización
      obtenerDispositivos();
    } catch (error) {
      console.error(`Error en la solicitud de actualización: ${error.message}`);
    }
  }
  
  // Llama a la función para obtener dispositivos al cargar la página
  obtenerDispositivos();
  