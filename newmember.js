document.addEventListener('DOMContentLoaded', function() {
    // Initialize collapsible sections
    initializeCollapsibleSections();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize animations
    initializeAnimations();
});

// Collapsible Sections Functionality
function initializeCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all sections first
            sectionHeaders.forEach(h => {
                h.classList.remove('active');
                const content = h.nextElementSibling;
                if (content) {
                    content.classList.remove('active');
                }
            });
            
            // If this section wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                const content = this.nextElementSibling;
                if (content) {
                    content.classList.add('active');
                }
            }
        });
    });
}

// Form Validation Functionality
function initializeFormValidation() {
    const form = document.getElementById('newmember-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('.submit-button');
    
    // Add real-time validation to each input
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
        // Om validering lyckas, låt formuläret skickas normalt (till PHP)
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Detta fält är obligatoriskt';
    }
    // Validate specific field types
    else if (value) {
        switch (fieldType) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Ange en giltig e-postadress';
                }
                break;
                
            case 'tel':
                const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Ange ett giltigt telefonnummer';
                }
                break;
                
            case 'text':
                if (fieldName === 'fullname') {
                    const nameRegex = /^[a-zA-ZåäöÅÄÖ\s\-]{3,}$/;
                    if (!nameRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Fullständigt namn måste innehålla minst 3 bokstäver';
                    }
                } else if (fieldName === 'level') {
                    if (value.length < 3) {
                        isValid = false;
                        errorMessage = 'Ange din ungefärliga tennisnivå';
                    }
                } else if (fieldName === 'address') {
                    if (value.length < 5) {
                        isValid = false;
                        errorMessage = 'Ange en fullständig adress';
                    }
                }
                break;
                
            case 'number':
                if (fieldName === 'birthyear') {
                    const year = parseInt(value);
                    const currentYear = new Date().getFullYear();
                    if (year < 1930 || year > (currentYear - 10)) {
                        isValid = false;
                        errorMessage = 'Ange ett giltigt födelseår';
                    }
                }
                break;
        }
    }
    
    updateFieldValidation(field, isValid, errorMessage);
    return isValid;
}

function updateFieldValidation(field, isValid, errorMessage) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (isValid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    } else {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function validateForm() {
    const form = document.getElementById('newmember-form');
    const inputs = form.querySelectorAll('input:not([type="checkbox"]), textarea');
    let isFormValid = true;
    
    // Validate regular inputs
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    // Validate checkbox group (at least one must be checked)
    const checkboxes = form.querySelectorAll('input[name="membershipFee"]');
    const isCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    const checkboxGroup = form.querySelector('.checkbox-group').closest('.form-group');
    const checkboxError = checkboxGroup.querySelector('.error-message');
    
    if (!isCheckboxChecked) {
        isFormValid = false;
        checkboxGroup.classList.add('error');
        checkboxError.textContent = 'Välj vilken avgift du har betalat';
        checkboxError.classList.add('show');
    } else {
        checkboxGroup.classList.remove('error');
        checkboxError.classList.remove('show');
    }
    
    return isFormValid;
}

function submitForm() {
    const form = document.getElementById('newmember-form');
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonIcon = submitButton.querySelector('.button-icon');
    
    // Disable button and show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Skickar...';
    buttonIcon.textContent = '⏳';
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        showSuccessMessage();
        resetForm();
        
        // Reset button
        submitButton.disabled = false;
        buttonText.textContent = 'Skicka ansökan';
        buttonIcon.textContent = '📝';
    }, 2000);
}

function showSuccessMessage() {
    let successMessage = document.querySelector('.success-message');
    
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <strong>✅ Tack för din ansökan!</strong><br>
            Vi har mottagit din medlemsansökan och kommer att kontakta dig inom kort. 
            Du kommer att få en bekräftelse via e-post med nästa steg.
        `;
        
        const form = document.getElementById('newmember-form');
        form.appendChild(successMessage);
    }
    
    successMessage.classList.add('show');
    
    // Hide success message after 8 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 8000);
}

function resetForm() {
    const form = document.getElementById('newmember-form');
    const formGroups = form.querySelectorAll('.form-group');
    
    // Reset form fields
    form.reset();
    
    // Clear validation states
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    });
}

// Animation and scroll effects
function initializeAnimations() {
    // Animate elements on scroll
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.newmember-card, .step-card, .info-block');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Simple collapsible sections - no extra transitions needed
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.step-card, .info-block');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Smooth scroll for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle membership button click
function showMembershipForm() {
    const membershipSection = document.querySelector('.membership-form-section');
    if (membershipSection) {
        membershipSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add attention effect
        membershipSection.style.animation = 'pulse 2s ease-in-out';
        setTimeout(() => {
            membershipSection.style.animation = '';
        }, 2000);
    }
}

// Utility functions
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 10) {
        value = value.substring(0, 10);
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})/, '$1');
    }
    
    input.value = value;
}

// Add phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.showMembershipForm = showMembershipForm;
window.smoothScroll = smoothScroll;