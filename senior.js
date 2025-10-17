// Senior JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializePage();
    
    // Initialize contact form
    initializeContactForm();
});

function initializePage() {
    // Set up scroll animations
    setupScrollAnimations();
}

// Scroll animations
function setupScrollAnimations() {
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
    
    // Observe cards for animation
    const cards = document.querySelectorAll('.senior-card, .schedule-card, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Enhanced floating racket animations with mouse interaction
document.addEventListener('mousemove', function(e) {
    const rackets = document.querySelectorAll('.floating-ball');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    rackets.forEach((racket, index) => {
        const speed = (index + 1) * 0.015;
        const x = mouseX * 15 * speed;
        const y = mouseY * 15 * speed;
        const rotation = (mouseX - 0.5) * 20 * speed;
        
        racket.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    });
});

// Add click effects to contact buttons
document.querySelectorAll('.contact-phone').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(37, 99, 235, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .contact-phone {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Contact Form Functionality
function initializeContactForm() {
    const form = document.getElementById('senior-contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('.submit-button');
    const successMessage = document.getElementById('success-message');
    
    // Real-time validation
    nameInput.addEventListener('input', () => validateName());
    emailInput.addEventListener('input', () => validateEmail());
    messageInput.addEventListener('input', () => validateMessage());
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    function validateName() {
        const name = nameInput.value.trim();
        const nameGroup = nameInput.closest('.form-group');
        const errorElement = document.getElementById('name-error');
        
        if (name.length < 3) {
            showError(nameGroup, errorElement, 'Namnet måste innehålla minst 3 bokstäver');
            return false;
        } else {
            showSuccess(nameGroup, errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailGroup = emailInput.closest('.form-group');
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailGroup, errorElement, 'E-postadress krävs');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailGroup, errorElement, 'Ange en giltig e-postadress');
            return false;
        } else {
            showSuccess(emailGroup, errorElement);
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        const messageGroup = messageInput.closest('.form-group');
        const errorElement = document.getElementById('message-error');
        
        if (!message) {
            showError(messageGroup, errorElement, 'Meddelande krävs');
            return false;
        } else if (message.length < 10) {
            showError(messageGroup, errorElement, 'Meddelandet måste vara minst 10 tecken');
            return false;
        } else {
            showSuccess(messageGroup, errorElement);
            return true;
        }
    }
    
    function showError(group, errorElement, message) {
        group.classList.remove('success');
        group.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function showSuccess(group, errorElement) {
        group.classList.remove('error');
        group.classList.add('success');
        errorElement.classList.remove('show');
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="button-icon">⏳</span> Skickar...';
            
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                to: 'seniortest@sjtk.se',
                subject: 'Meddelande från seniorverksamhet på SJTK.se'
            };
            
            // Simulate sending (replace with actual email service)
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                form.reset();
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error', 'success');
                });
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = '<span class="button-icon">📧</span> Skicka meddelande';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
                // In real implementation, you would send the email here
                console.log('Form data to send:', formData);
                
            }, 2000);
        }
    }
}