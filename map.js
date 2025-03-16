document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

function initMap() {
    const map = L.map('memory-map', {zoomControl: false}).setView([36.147657691670254, -86.80337393560464], 14);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: '',
        maxZoom: 19
    }).addTo(map);

    // Add map layer control
    const baseMaps = {
        "Street": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: '',
            maxZoom: 19
        }),
        "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '',
            maxZoom: 18
        }),
        "Minimalist": L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: ''
        })
    };
    

    baseMaps["Street"].addTo(map);
    L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(map);

    // more minimalistic map
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    //     maxZoom: 19,
    //     attribution: ''
    // }).addTo(map);

    //satellite map
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //     attribution: '',
    //     maxZoom: 18
    // }).addTo(map);

    var heartIcon = L.icon({
        iconUrl: 'assets/heart emoji.png',
        iconSize: [21, 21],
        iconAnchor: [16, 16],
        popupAnchor: [-5, -12]
    });
    
    const markers = [];
    let validLocations = 0;

    photos.forEach(photoId => {
        const location = locations[photoId];
        if (!location || (location.lat === 0 || location.lng === 0)) return;
        validLocations++;
        
        const marker = L.marker([location.lat, location.lng], {
            title: formatDate(photoId),
            icon: heartIcon
        }).addTo(map);
        
        // Create popup 
        const popupContent = `
            <div class="map-info-window">
                <div class="date">${formatDate(photoId)}</div>
                <div style="text-align: center; width: 100%;">
                    <img src="images/${photoId}.JPG" 
                         onerror="if(this.src.endsWith('.JPG')){this.src='images/${photoId}.JPEG';}else if(this.src.endsWith('.JPEG')){this.src='images/${photoId}.jpeg';}else if(this.src.endsWith('.jpeg')){this.src='images/${photoId}.PNG';}" 
                         class="popup-image"
                         alt="${formatDate(photoId)}">
                </div>
                <div class="description">${photoDescriptions[photoId] || ''}</div>
            </div>
        `;
        
        // Screen size over 768px (desktop) -- max width 320px
        // Screen size under 768px (mobile) -- max width 125px
        const popupWidth = window.innerWidth < 768 ? 125 : 320;
        
        marker.bindPopup(popupContent, {
            maxWidth: popupWidth,
            minWidth: popupWidth,
            autoPan: true,
            className: 'custom-popup'
        });
        markers.push(marker);
    });
} 