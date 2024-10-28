
var map = L.map('map').setView([39.50, -98.35], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

const coordinates = []
 for (let i = 0; i < 3; i++) {
    const lat = getRandomInRange(30,35,3);
    const lon = getRandomInRange(-90,-100,3);
    coordinates.push({lat, lon});
 }

async function getMarker(){
    for(let x = 0; x < coordinates.length; x++) {
        const {lat: latitude, lon: longitude} = coordinates[x];
        await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en')
            .then(response => response.json())
            .then(data => {
                const marker = L.marker([latitude, longitude]).addTo(map);
                document.getElementById(`marker${x + 1}`).innerHTML += ` Latitude: ${latitude}, Longtitude: ${longitude}
                <br> Locality: ${data.locality}<br>`
            });
    }
    map.fitBounds(coordinates.map(coord => [coord.lat, coord.lon]));
}
window.onload = getMarker;