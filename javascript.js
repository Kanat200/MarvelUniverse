// ===== WAIT FOR DOM TO BE READY =====
document.addEventListener('DOMContentLoaded', function() {
    
// ===== NAVIGATION SMOOTH SCROLL & ACTIVE LINK =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero-section');
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

// Smooth scroll
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
            if (burger) burger.classList.remove('active');
        });
    });
}

// Active nav link on scroll
if (navbar && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Navbar background on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Burger menu toggle
if (burger && navMenu) {
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// ===== ANIMATED PARTICLES BACKGROUND =====
const particlesBg = document.getElementById('particles');
if (particlesBg) {
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'white';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        particlesBg.appendChild(particle);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// ===== HEROES FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const heroCardsFilter = document.querySelectorAll('.hero-card');

if (filterButtons.length > 0 && heroCardsFilter.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            heroCardsFilter.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// ===== DEFENDERS AUDIO CONTROL =====
const audioButtons = document.querySelectorAll('.audio-btn');
let currentlyPlaying = null;

if (audioButtons.length > 0) {
    audioButtons.forEach(button => {
        button.addEventListener('click', () => {
            const heroName = button.getAttribute('data-hero');
            const audio = document.getElementById(`audio-${heroName}`);
            const icon = button.querySelector('.audio-icon');
            const text = button.querySelector('.audio-text');

            // Check if elements exist
            if (!audio || !icon || !text) {
                console.error('Audio elements not found for:', heroName);
                return;
            }

            // If this audio is currently playing, stop it
            if (currentlyPlaying === audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
                button.classList.remove('playing');
                icon.textContent = '▶️';
                text.textContent = 'Play Theme';
                currentlyPlaying = null;
                return;
            }

            // Stop currently playing audio (if different)
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
                const prevButton = document.querySelector(`[data-hero="${currentlyPlaying.id.replace('audio-', '')}"]`);
                if (prevButton) {
                    prevButton.classList.remove('playing');
                    const prevIcon = prevButton.querySelector('.audio-icon');
                    const prevText = prevButton.querySelector('.audio-text');
                    if (prevIcon) prevIcon.textContent = '▶️';
                    if (prevText) prevText.textContent = 'Play Theme';
                }
            }

            // Play current audio
            audio.play().then(() => {
                button.classList.add('playing');
                icon.textContent = '⏸️';
                text.textContent = 'Stop';
                currentlyPlaying = audio;
            }).catch(error => {
                console.error('Error playing audio:', error);
                button.classList.remove('playing');
                icon.textContent = '▶️';
                text.textContent = 'Play Theme';
            });

            // Reset button when audio ends
            audio.addEventListener('ended', () => {
                button.classList.remove('playing');
                icon.textContent = '▶️';
                text.textContent = 'Play Theme';
                currentlyPlaying = null;
            }, { once: true }); // Use once: true to prevent multiple listeners
        });
    });
}

// ===== QUIZ LOGIC =====
const quizQuestions = [
    {
        question: 'What is your superpower?',
        options: [
            { text: 'Incredible strength', hero: 'hulk' },
            { text: 'Technological genius', hero: 'ironman' },
            { text: 'Leadership qualities', hero: 'cap' },
            { text: 'Magic and mysticism', hero: 'strange' }
        ]
    },
    {
        question: 'Where do you prefer to fight?',
        options: [
            { text: 'On city streets', hero: 'daredevil' },
            { text: 'In a high-tech laboratory', hero: 'ironman' },
            { text: 'On the battlefield', hero: 'cap' },
            { text: 'In space', hero: 'thor' }
        ]
    },
    {
        question: 'What weapon would you choose?',
        options: [
            { text: 'My fists', hero: 'hulk' },
            { text: 'High-tech armor', hero: 'ironman' },
            { text: 'A shield', hero: 'cap' },
            { text: 'A god\'s hammer', hero: 'thor' }
        ]
    },
    {
        question: 'How do you feel about teamwork?',
        options: [
            { text: 'I prefer to act alone', hero: 'daredevil' },
            { text: 'I love being a leader', hero: 'cap' },
            { text: 'I work in a team, but my own way', hero: 'ironman' },
            { text: 'Team is family', hero: 'fantastic' }
        ]
    },
    {
        question: 'What motivates you?',
        options: [
            { text: 'Protecting the innocent', hero: 'cap' },
            { text: 'Revenge for the past', hero: 'daredevil' },
            { text: 'Science and progress', hero: 'ironman' },
            { text: 'Honor and glory', hero: 'thor' }
        ]
    }
];

const heroResults = {
    ironman: {
        icon: '🦾',
        name: 'Iron Man',
        description: 'You are a genius inventor and innovator! Like Tony Stark, you rely on your intellect and technology to solve problems. You are not afraid to take risks and are always ready to improve yourself.'
    },
    cap: {
        icon: '🛡️',
        name: 'Captain America',
        description: 'You are a born leader with unwavering moral principles! Like Steve Rogers, you always make the right choice and inspire others by your example.'
    },
    thor: {
        icon: '⚡',
        name: 'Thor',
        description: 'You are a noble warrior with mighty strength! Like Thor, you fight for honor and justice, protecting those who cannot protect themselves.'
    },
    hulk: {
        icon: '💚',
        name: 'Hulk',
        description: 'Incredible strength lies within you! Like Bruce Banner, you can be calm and intellectual, but when it comes to protecting loved ones, you are invincible.'
    },
    daredevil: {
        icon: '👊',
        name: 'Daredevil',
        description: 'You are a fighter for justice! Like Matt Murdock, you don\'t let obstacles stop you and always protect the weak.'
    },
    strange: {
        icon: '🧙',
        name: 'Doctor Strange',
        description: 'You are a master of the mystic arts! Like Stephen Strange, you use knowledge and magic to protect reality.'
    },
    fantastic: {
        icon: '🔬',
        name: 'Mr. Fantastic',
        description: 'You are a brilliant scientist and researcher! Like Reed Richards, you use science to solve impossible problems.'
    }
};

let currentQuestion = 0;
let answers = [];

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    document.getElementById('quizQuestion').textContent = question.question;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option.text;
        optionDiv.addEventListener('click', () => selectOption(index, option.hero));
        optionsContainer.appendChild(optionDiv);
    });
}

function selectOption(index, hero) {
    answers.push(hero);
    
    const options = document.querySelectorAll('.quiz-option');
    options[index].classList.add('selected');

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function showResult() {
    // Count hero occurrences
    const heroCount = {};
    answers.forEach(hero => {
        heroCount[hero] = (heroCount[hero] || 0) + 1;
    });

    // Find most common hero
    let maxCount = 0;
    let resultHero = 'ironman';
    for (const hero in heroCount) {
        if (heroCount[hero] > maxCount) {
            maxCount = heroCount[hero];
            resultHero = hero;
        }
    }

    const result = heroResults[resultHero];
    
    document.getElementById('quizContent').style.display = 'none';
    const resultDiv = document.getElementById('quizResult');
    resultDiv.classList.remove('hidden');
    
    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultName').textContent = result.name;
    document.getElementById('resultDescription').textContent = result.description;
}

window.restartQuiz = function() {
    currentQuestion = 0;
    answers = [];
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').classList.add('hidden');
    loadQuestion();
};

// Initialize quiz
loadQuestion();

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.hero-card, .team-block, .timeline-item, .defender-card');
if (animatedElements.length > 0) {
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===== HERO MODAL FUNCTIONALITY =====
// Make functions global so they can be called from HTML onclick
window.openHeroModal = function(heroName, heroImage) {
    const modal = document.getElementById('heroModal');
    const modalImage = document.getElementById('modalHeroImage');
    const modalName = document.getElementById('modalHeroName');
    
    if (!modal || !modalImage || !modalName) {
        console.error('Modal elements not found!');
        return;
    }
    
    modalImage.src = heroImage;
    modalImage.onerror = function() {
        console.error('Image not found:', heroImage);
        this.src = 'assets/images/placeholder.jpg'; // Fallback image
    };
    modalName.textContent = heroName;
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
};

window.closeHeroModal = function() {
    const modal = document.getElementById('heroModal');
    if (modal) {
        modal.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
};

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeHeroModal();
    }
});

// Add click event to all hero cards
function initHeroCards() {
    const heroCards = document.querySelectorAll('.hero-card');
    console.log('Found hero cards:', heroCards.length); // Debug log
    
    heroCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent event bubbling
            e.stopPropagation();
            
            // Get hero name from card (check both front and back)
            const heroNameElement = card.querySelector('.hero-name') || card.querySelector('.card-back h3');
            const heroName = heroNameElement ? heroNameElement.textContent : 'Unknown Hero';
            
            // Get image path from data attribute or use default path
            const heroImageName = card.getAttribute('data-hero-image') || 
                                 heroName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
            const heroImage = `assets/images/${heroImageName}.jpg`;
            
            console.log('Opening modal for:', heroName, heroImage); // Debug log
            window.openHeroModal(heroName, heroImage);
        });
    });
}

// Initialize hero cards
initHeroCards();

}); // End of DOMContentLoaded

