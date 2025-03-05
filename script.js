document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const timeline = document.querySelector('.timeline');
    
    // Define photo descriptions
    const photoDescriptions = {
        'sep21': 'Luke\'s',
        'oct21': 'scum gang scum gang scum gang',
        'nov21': 'MLC Formal & My 19th Birthday',
        'dec21': 'peanuts fr',
        'jan22': 'Cara\'s Birthday Dinner',
        'feb22': 'Mardi Gras @ Lambda House',
        'mar22': 'St. Fratty\'s',
        'apr22': 'We Heart Jeef',
        'may22': 'The Eclairs Incident',
        'jun22': 'Island Girl',
        'jul22': 'I was genuinely curious',
        'aug22': 'Back to School! Year 3',
        'sep22': 'Tailgate Season',
        'oct22': 'tubbington',
        'nov22': 'CRF Audition @ EBI Basement',
        'dec22': 'The last picture of entire Scum Gang',
        'jan23': 'Redemption for the Eclairs',
        'feb23': 'LNYF 2023',
        'mar23': 'Right after we formed our EBI suite',
        'apr23': 'sorry john',
        'may23': 'Our first dinner in 20&G, a Kevin Pan masterclass',
        'jun23': 'NONO',
        'jul23': 'July 4th with scummer',
        'aug23': 'Back to school for our last year',
        'sep23': 'I miss dinners at Roth',
        'oct23': 'Lewis Hamilton and 3 princesses',
        'nov23': '@ Wesley\'s floor mat',
        'dec23': 'Scum Gang @ Velvet Taco',
        'jan24': 'stank',
        'feb24': 'Elephant in the room.....',
        'mar24': 'Finally made it out the friendzone. Our first public photo @ VIVID showcase.',
        'apr24': 'Senior Prom',
        'may24': 'We made it!',
        'jun24': 'Happy 21st :)',
        'jul24': 'Long Distance... Our first LDR facetime (technically from May but whatever)',
        'aug24': 'Sunset @ Hanalei Bay',
        'sep24': 'Starting our new post-grad lives: your first time visiting me in NYC',
        'oct24': 'Your second visit. Bagels @ Sheep Meadow',
        'nov24': 'My 22nd birthday @ The Edge',
        'dec24': 'Our first Christmas "together"',
        'jan25': 'Long distance yet again :\')',
        'feb25': 'Our first Valentine\'s Day together',
        'mar25': 'Happy One Year :)'
    };
    
    // Define month names
    const monthNames = {
        'jan': 'January',
        'feb': 'February',
        'mar': 'March',
        'apr': 'April',
        'may': 'May',
        'jun': 'June',
        'jul': 'July',
        'aug': 'August',
        'sep': 'September',
        'oct': 'October',
        'nov': 'November',
        'dec': 'December'
    };
    
    // Function to format the date
    function formatDate(filename) {
        const month = filename.substring(0, 3);
        const year = filename.substring(3);
        return `${monthNames[month]} 20${year}`;
    }
    
    // List of photos in chronological order
    const photos = [
        'sep21', 'oct21', 'nov21', 'dec21',
        'jan22', 'feb22', 'mar22', 'apr22', 'may22', 'jun22', 'jul22', 'aug22', 'sep22', 'oct22', 'nov22', 'dec22',
        'jan23', 'feb23', 'mar23', 'apr23', 'may23', 'jun23', 'jul23', 'aug23', 'sep23', 'oct23', 'nov23', 'dec23',
        'jan24', 'feb24', 'mar24', 'apr24', 'may24', 'jun24', 'jul24', 'aug24', 'sep24', 'oct24', 'nov24', 'dec24',
        'jan25', 'feb25', 'mar25'
    ];
    
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