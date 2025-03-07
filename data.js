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

// Define photo descriptions
const photoDescriptions = {
    'sep21': 'Luke\'s 32 Bridge',
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
    'oct22': 'dummy',
    'nov22': 'CRF Audition @ EBI Basement',
    'dec22': 'Last picture of entire Scum Gang',
    'jan23': 'Redemption for the Eclairs',
    'feb23': 'LNYF 2023',
    'mar23': 'Right after we formed our EBI suite',
    'apr23': 'sorry john',
    'may23': 'Our first dinner in 20&G,' + '\n' + 'a Kevin Pan masterclass',
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
    'jul24': 'Long distance... Our first LDR facetime (technically from May but whatever)',
    'aug24': 'Sunset @ Hanalei Bay',
    'sep24': 'Starting our new post-grad lives: \nYour first time visiting me in NYC',
    'oct24': 'Bagels @ Sheep Meadow',
    'nov24': 'My 22nd birthday @ The Edge',
    'dec24': 'Our first Christmas "together"',
    'jan25': 'Long distance yet again :\')',
    'feb25': 'How could my day be bad when I\'m with you',
    'mar25': 'Happy One Year :)'
};

// List of photos in chronological order
const photos = [
    'sep21', 'oct21', 'nov21', 'dec21',
    'jan22', 'feb22', 'mar22', 'apr22', 'may22', 'jun22', 'jul22', 'aug22', 'sep22', 'oct22', 'nov22', 'dec22',
    'jan23', 'feb23', 'mar23', 'apr23', 'may23', 'jun23', 'jul23', 'aug23', 'sep23', 'oct23', 'nov23', 'dec23',
    'jan24', 'feb24', 'mar24', 'apr24', 'may24', 'jun24', 'jul24', 'aug24', 'sep24', 'oct24', 'nov24', 'dec24',
    'jan25', 'feb25', 'mar25'
];

// Custom emojis for each month
const monthEmojis = {
    'sep21': '🤠',
    'oct21': '💛',
    'nov21': '🤵',
    'dec21': '🥜',
    'jan22': '🍽️',
    'feb22': '🎭',
    'mar22': '🍀',
    'apr22': '🤍',
    'may22': '🔥',
    'jun22': '🗺️',
    'jul22': '🌺',
    'aug22': '3️⃣',
    'sep22': '🏈',
    'oct22': '🐒',
    'nov22': '🎀',
    'dec22': '🍦',
    'jan23': '🥧',
    'feb23': '🧧',
    'mar23': '🅿️',
    'apr23': '🛋️',
    'may23': '🥟',
    'jun23': '🐈‍',
    'jul23': '🎆',
    'aug23': '4️⃣',
    'sep23': '👷',
    'oct23': '🎃',
    'nov23': '🦧',
    'dec23': '🌮',
    'jan24': '🤢',
    'feb24': '🐘',
    'mar24': '💐',
    'apr24': '❤️',
    'may24': '🎓',
    'jun24': '🎉',
    'jul24': '📲',
    'aug24': '🏝️',
    'sep24': '🗽',
    'oct24': '🥯',
    'nov24': '🏙️',
    'dec24': '🎄',
    'jan25': '🌎',
    'feb25': '🛥️',
    'mar25': '💌',
};

// Function to format the date
function formatDate(filename) {
    const month = filename.substring(0, 3);
    const year = filename.substring(3);
    return `${monthNames[month]} 20${year}`;
} 