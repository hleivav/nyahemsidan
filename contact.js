// Contact slideshow functionality
let currentSlideIndex = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    startAutoSlide();
});

function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Ensure first slide is active
    if (slides.length > 0) {
        slides[0].classList.add('active');
        indicators[0].classList.add('active');
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Pause auto-slideshow on hover
    const slideshowContainer = document.getElementById('slideshow');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
        slideshowContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide and indicator
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calculate new slide index
    currentSlideIndex += direction;
    
    // Handle wraparound
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Add active class to new slide and indicator
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // Add slide animation
    slides[currentSlideIndex].style.animation = 'slideIn 0.5s ease-in-out';
    
    // Reset auto-slide timer
    resetAutoSlide();
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0 || index < 1 || index > slides.length) return;
    
    // Remove active class from current slide and indicator
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Set new slide index (convert from 1-based to 0-based)
    currentSlideIndex = index - 1;
    
    // Add active class to new slide and indicator
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // Add slide animation
    slides[currentSlideIndex].style.animation = 'slideIn 0.5s ease-in-out';
    
    // Reset auto-slide timer
    resetAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous slide
            changeSlide(-1);
        } else {
            // Swipe left - go to next slide
            changeSlide(1);
        }
    }
}

// Animation observer for slide content
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe contact card for animation
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.style.opacity = '0';
        contactCard.style.transform = 'translateY(30px)';
        contactCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactCard);
    }
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAnimations, 100);
});

// Add hover effects to contact details
document.addEventListener('DOMContentLoaded', function() {
    const detailItems = document.querySelectorAll('.detail-item');
    
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add click-to-copy functionality for email addresses
document.addEventListener('DOMContentLoaded', function() {
    const emailElements = document.querySelectorAll('.detail-item');
    
    emailElements.forEach(item => {
        const text = item.textContent;
        if (text.includes('@')) {
            item.style.cursor = 'pointer';
            item.title = 'Klicka för att kopiera e-postadress';
            
            item.addEventListener('click', function() {
                const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                if (email) {
                    navigator.clipboard.writeText(email[0]).then(() => {
                        // Show feedback
                        const originalBg = this.style.backgroundColor;
                        this.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                        this.style.transition = 'background-color 0.3s ease';
                        
                        setTimeout(() => {
                            this.style.backgroundColor = originalBg;
                        }, 1000);
                    });
                }
            });
        }
    });
});

// Export functions for global access
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;