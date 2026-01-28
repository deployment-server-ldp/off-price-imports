// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const slides = document.querySelectorAll('.slide');
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

// --- Sticky Header & Active Link on Scroll ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        header.style.padding = '0'; // Optional: shrink header
    } else {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
    }

    // Active link update based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Hero Slider ---
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, slideInterval);

// --- Product Filtering ---
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // optional: add fade in animation
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- Smooth Scroll (Pollyfill-ish behavior if needed, generally CSS scroll-behavior: smooth handles it) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});
