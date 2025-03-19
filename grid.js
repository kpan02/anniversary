document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('photo-grid');
    const columnSlider = document.getElementById('column-count');
    const columnValue = document.getElementById('column-value');
    
    function initPhotoGrid() {
        let gridContent = '';
        
        photos.forEach(photoId => {
            gridContent += `
                <div class="grid-item">
                    <img src="images/${photoId}.JPG" 
                         onerror="if(this.src.endsWith('.JPG')){this.src='images/${photoId}.JPEG';}else if(this.src.endsWith('.JPEG')){this.src='images/${photoId}.jpeg';}else if(this.src.endsWith('.jpeg')){this.src='images/${photoId}.PNG';}" 
                         alt="${formatDate(photoId)}"
                         loading="lazy">
                </div>
            `;
        });
        gridContainer.innerHTML = gridContent;
    }
    
    function updateColumnCount() {
        const columns = columnSlider.value;
        columnValue.textContent = columns;
        gridContainer.style.columnCount = columns;
    }
    
    columnSlider.addEventListener('input', updateColumnCount);
    initPhotoGrid();
    updateColumnCount(); 
});