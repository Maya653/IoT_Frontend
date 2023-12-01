const apiUrl = 'https://localhost:8080';

async function obtenerDispositivos() {
  const response = await fetch(`${apiUrl}/dispositivo`);
  const dispositivos = await response.json();

  const dispositivosList = document.getElementById('dispositivos-list');
  dispositivosList.innerHTML = '';

  dispositivos.forEach(dispositivo => {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${dispositivo.id}, Nombre: ${dispositivo.nombre}, Valor: ${dispositivo.valor}`;
    dispositivosList.appendChild(listItem);
  });
}
obtenerDispositivos();