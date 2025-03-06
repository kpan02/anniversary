document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const timeline = document.querySelector('.timeline');
    
    // Group photos by year
    const photosByYear = {};
    photos.forEach(photo => {
        const year = '20' + photo.substring(3);
        if (!photosByYear[year]) {
            photosByYear[year] = [];
        }
        photosByYear[year].push(photo);
    });
    
    // Create timeline
    // First, create the line
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    timeline.appendChild(timelineLine);
    
    // Calculate total months and spacing
    const totalMonths = photos.length;
    const years = Object.keys(photosByYear).sort();
    
    // Create year markers and month markers
    years.forEach(year => {
        const yearIndex = photos.findIndex(photo => photo.substring(3) === year.substring(2));
        const yearPosition = (yearIndex / (totalMonths - 1)) * 100;
        
        // Create year marker
        const yearMarker = document.createElement('div');
        yearMarker.className = 'timeline-year-marker';
        yearMarker.textContent = year;
        yearMarker.style.top = `${yearPosition}%`;
        timelineLine.appendChild(yearMarker);
        
        // Create month markers for this year
        photosByYear[year].forEach((photo, monthIndex) => {
            const photoIndex = photos.indexOf(photo);
            const position = (photoIndex / (totalMonths - 1)) * 100;
            
            const monthMarker = document.createElement('div');
            monthMarker.className = 'timeline-month-marker';
            monthMarker.dataset.target = photo;
            monthMarker.style.top = `${position}%`;
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'timeline-tooltip';
            tooltip.textContent = formatDate(photo);
            monthMarker.appendChild(tooltip);
            
            // Add click event to scroll to the photo
            monthMarker.addEventListener('click', (e) => {
                e.preventDefault();
                const targetElement = document.getElementById(photo);
                
                if (targetElement) {
                    // Just scroll to the element
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            timelineLine.appendChild(monthMarker);
        });
    });
    
    // Create photo cards
    photos.forEach((photo, index) => {
        // Create elements
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.id = photo; // Add ID for scrolling
        
        const img = document.createElement('img');
        // Get the file extension by checking what's available in the images folder
        img.src = `images/${photo}.JPG`;
        img.alt = formatDate(photo);
        img.onerror = function() {
            // If JPG fails, try PNG
            this.src = `images/${photo}.PNG`;
            this.onerror = function() {
                // If PNG fails, try JPEG
                this.src = `images/${photo}.JPEG`;
                this.onerror = function() {
                    // If JPEG fails, try jpeg (lowercase)
                    this.src = `images/${photo}.jpeg`;
                    this.onerror = null;
                }
            }
        };
        
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        
        const date = document.createElement('div');
        date.className = 'photo-date';
        date.textContent = formatDate(photo);
        
        const description = document.createElement('div');
        description.className = 'photo-description';
        description.textContent = photoDescriptions[photo] || '---';
        
        // Assemble the card
        caption.appendChild(date);
        caption.appendChild(description);
        photoCard.appendChild(img);
        photoCard.appendChild(caption);
        
        // Add to gallery
        gallery.appendChild(photoCard);
    });
    
    // Simple scroll handler that updates the timeline based on scroll position
    function updateTimelineOnScroll() {
        // Calculate which photo is most visible
        const viewportHeight = window.innerHeight;
        const photoCards = document.querySelectorAll('.photo-card');
        let mostVisiblePhoto = null;
        let maxVisibility = 0;
        
        photoCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            // Calculate how much of the card is visible in the viewport
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visibility = visibleHeight > 0 ? visibleHeight / rect.height : 0;
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisiblePhoto = card.id;
            }
        });
        
        // Update the active marker
        if (mostVisiblePhoto) {
            document.querySelectorAll('.timeline-month-marker').forEach(marker => {
                if (marker.dataset.target === mostVisiblePhoto) {
                    marker.classList.add('active');
                } else {
                    marker.classList.remove('active');
                }
            });
        }
    }
    
    // Add scroll event listener - update directly during scroll
    window.addEventListener('scroll', updateTimelineOnScroll, { passive: true });
    
    // Initial update
    updateTimelineOnScroll();
}); 