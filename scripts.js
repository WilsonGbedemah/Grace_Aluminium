// Banner functionality
const banner = document.querySelector(".banner");
const now = new Date();
const dayOfWeek = now.getDay();

// Show banner on weekdays
if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    banner.style.display = "block";
}

// Close banner functionality
document.querySelector('.close-banner')?.addEventListener('click', () => {
    banner.style.display = "none";
});

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-content, .services-grid, .products-grid, .testimonials, .location-content, .contact-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.about-content, .services-grid, .products-grid, .testimonials, .location-content, .contact-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
});

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);

// Mobile menu functionality
const mobileMenuCheckbox = document.getElementById('mobile-menu-checkbox');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

mobileMenuToggle.addEventListener('click', () => {
    if (mobileMenuCheckbox.checked) {
        mobileMenu.style.right = '-100%';
        mobileMenuOverlay.style.display = 'none';
    } else {
        mobileMenu.style.right = '0';
        mobileMenuOverlay.style.display = 'block';
    }
});

mobileMenuOverlay.addEventListener('click', () => {
    mobileMenuCheckbox.checked = false;
    mobileMenu.style.right = '-100%';
    mobileMenuOverlay.style.display = 'none';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenuCheckbox.checked) {
                mobileMenuCheckbox.checked = false;
                mobileMenu.style.right = '-100%';
                mobileMenuOverlay.style.display = 'none';
            }
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just show an alert
    alert('Thank you for your message! We will contact you soon.');
    this.reset();
});
