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

// Animate gallery images when in viewport
const galleryGrid = document.querySelector('.gallery-grid');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Optional: Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust this to trigger animation sooner/later
});

if (galleryGrid) {
    observer.observe(galleryGrid);
}


// Form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just show an alert
    alert('Thank you for your message! We will contact you soon.');
    this.reset();
});
