document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    
    // Define photo descriptions
    const photoDescriptions = {
        'sep21': '',
        'oct21': '',
        'nov21': '',
        'dec21': '',
        'jan22': '',
        'feb22': '',
        'mar22': '',
        'apr22': '',
        'may22': '',
        'jun22': '',
        'jul22': '',
        'aug22': '',
        'sep22': '',
        'oct22': '',
        'nov22': '',
        'dec22': '',
        'jan23': '',
        'feb23': '',
        'mar23': '',
        'apr23': '',
        'may23': '',
        'jun23': '',
        'jul23': '',
        'aug23': '',
        'sep23': '',
        'oct23': '',
        'nov23': '',
        'dec23': '',
        'jan24': '',
        'feb24': '',
        'mar24': '',
        'apr24': '',
        'may24': '',
        'jun24': '',
        'jul24': '',
        'aug24': '',
        'sep24': '',
        'oct24': '',
        'nov24': '',
        'dec24': '',
        'jan25': '',
        'feb25': '',
        'mar25': ''
    };
    
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
    
    // Create photo cards
    photos.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        
        const img = document.createElement('img');
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
        
        caption.appendChild(date);
        caption.appendChild(description);
        photoCard.appendChild(img);
        photoCard.appendChild(caption);
        gallery.appendChild(photoCard);
    });
}); 