// Memory Map JavaScript using Leaflet

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

function initMap() {
    // Create a new Leaflet map centered on a default location
    const map = L.map('memory-map').setView([39.8283, -98.5795], 4); // Center of US as default
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
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
            title: formatDate(photoId)
        }).addTo(map);
        
        // Create popup content
        const popupContent = `
            <div class="map-info-window">
                <img src="images/${photoId}.JPG" onerror="this.onerror=null; this.src='images/${photoId}.PNG'" alt="${formatDate(photoId)}">
                <div class="date">${formatDate(photoId)}</div>
                <div class="description">${photoDescriptions[photoId] || ''}</div>
                <div class="emoji">${monthEmojis[photoId] || '❤️'}</div>
            </div>
        `;
        
        // Add popup to marker
        marker.bindPopup(popupContent, {
            maxWidth: 250
        });
        
        // Store marker for bounding
        markers.push(marker);
    });
    
    // If we have valid locations, fit the map to show all markers
    if (validLocations > 0) {
        // Create a bounds object
        const group = new L.featureGroup(markers);
        
        // Fit the map to the bounds
        map.fitBounds(group.getBounds().pad(0.1)); // Add 10% padding around the bounds
        
        // Limit max zoom
        if (map.getZoom() > 12) {
            map.setZoom(12);
        }
    }
} 