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

// Gallery Filter Functionality
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Video Play Functionality
document.querySelectorAll('.video-play-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const videoItem = button.closest('.gallery-item');
        const videoSrc = videoItem.querySelector('video').getAttribute('src');
        const modal = document.querySelector('.video-modal');
        const modalVideo = modal.querySelector('video');
        
        modalVideo.setAttribute('src', videoSrc);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Pause all other videos in gallery
        document.querySelectorAll('.gallery-video').forEach(vid => {
            vid.pause();
        });
    });
});

// Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.querySelector('.video-modal');
    const modalVideo = modal.querySelector('video');
    
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.querySelector('.video-modal');
    if (e.target === modal) {
        const modalVideo = modal.querySelector('video');
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Auto-play gallery videos on hover
document.querySelectorAll('.gallery-video').forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Testimonials slider functionality
const testimonialSlider = document.querySelector('.testimonials-slider');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

testimonialSlider.addEventListener('mousedown', dragStart);
testimonialSlider.addEventListener('touchstart', dragStart);
testimonialSlider.addEventListener('mouseup', dragEnd);
testimonialSlider.addEventListener('mouseleave', dragEnd);
testimonialSlider.addEventListener('touchend', dragEnd);
testimonialSlider.addEventListener('mousemove', drag);
testimonialSlider.addEventListener('touchmove', drag);

function dragStart(e) {
    if (e.type === 'touchstart') {
        startPos = e.touches[0].clientX;
    } else {
        startPos = e.clientX;
        e.preventDefault();
    }
    isDragging = true;
    testimonialSlider.style.cursor = 'grabbing';
    testimonialSlider.style.scrollBehavior = 'auto';
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = currentPosition - startPos;
    testimonialSlider.scrollLeft = testimonialSlider.scrollLeft - diff;
    startPos = currentPosition;
}

function dragEnd() {
    isDragging = false;
    testimonialSlider.style.cursor = 'grab';
    testimonialSlider.style.scrollBehavior = 'smooth';
}

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