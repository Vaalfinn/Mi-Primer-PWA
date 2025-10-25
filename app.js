if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker registro correctamente"))
        .catch((error) => console.log("Error a registar el Service Worker"));
}

// Cargar datos de la API simulada
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('api-data');
            container.innerHTML = `<p>${data.message}</p><p><small>Actualizado: ${data.last_updated}</small></p>`;
        })
        .catch(error => {
            console.error('No se pudieron cargar los datos:', error);
            document.getElementById('api-data').innerText = 'Error al cargar los datos. Revisa tu conexión.';
        });
});