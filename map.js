// Memory Map JavaScript using Leaflet

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

function initMap() {
    // Create a new Leaflet map centered on a default location
    const map = L.map('memory-map').setView([36.143966838385715, -86.80263765874552], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var heartIcon = L.icon({
        iconUrl: 'assets/heart emoji.png',
        iconSize: [21, 21],
        iconAnchor: [16, 16],
        popupAnchor: [0, -35]
    });
    
    // Keep track of all markers for bounding
    const markers = [];
    let validLocations = 0;
    
    // Add markers for each photo location
    photos.forEach(photoId => {
        const location = locations[photoId];
        
        // Skip if no valid coordinates
        if (!location || (location.lat === 0 || location.lng === 0)) return;
        
        validLocations++;
        
        // Create marker
        const marker = L.marker([location.lat, location.lng], {
            title: formatDate(photoId),
            icon: heartIcon
        }).addTo(map);
        
        // Create popup 
        const popupContent = `
            <div class="map-info-window">
                <img src="images/${photoId}.JPG" onerror="this.onerror=null; this.src='images/${photoId}.PNG'" alt="${formatDate(photoId)}">
                <div class="date">${formatDate(photoId)}</div>
                <div class="description">${photoDescriptions[photoId] || ''}</div>
                <div class="emoji">${monthEmojis[photoId] || '❤️'}</div>
            </div>
        `;
        marker.bindPopup(popupContent, {
            maxWidth: 300
        });
        markers.push(marker);
    });
} 