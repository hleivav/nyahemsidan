// Förslagslådan Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('suggestion-form');
    const submitButton = form.querySelector('.submit-button');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            suggestion: formData.get('suggestion')
        };
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            showSuccessMessage();
            form.reset();
            resetButtonState();
        }, 2000);
    });
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        
        // Clear previous error states
        clearErrors();
        
        // Validate name
        if (!data.name || data.name.trim().length < 2) {
            showFieldError('name', 'Namn måste vara minst 2 tecken långt');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showFieldError('email', 'Ange en giltig e-postadress');
            isValid = false;
        }
        
        // Validate subject
        if (!data.subject || data.subject.trim().length < 5) {
            showFieldError('subject', 'Rubrik måste vara minst 5 tecken lång');
            isValid = false;
        }
        
        // Validate suggestion
        if (!data.suggestion || data.suggestion.trim().length < 10) {
            showFieldError('suggestion', 'Förslaget måste vara minst 10 tecken långt');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show field error
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        // Add error class
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    // Clear all errors
    function clearErrors() {
        const errorFields = form.querySelectorAll('.error');
        const errorMessages = form.querySelectorAll('.error-message');
        
        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(message => message.remove());
    }
    
    // Show loading state
    function showLoadingState() {
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="loading-spinner"></span>
            Skickar...
        `;
        submitButton.classList.add('loading');
    }
    
    // Reset button state
    function resetButtonState() {
        submitButton.disabled = false;
        submitButton.innerHTML = `
            <span class="button-icon">📨</span>
            Skicka
        `;
        submitButton.classList.remove('loading');
    }
    
    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✅</span>
                <h4>Tack för ditt förslag!</h4>
                <p>Vi har tagit emot ditt förslag och kommer att granska det. Du kan förvänta dig svar inom några dagar.</p>
            </div>
        `;
        
        // Insert before form
        form.parentNode.insertBefore(successDiv, form);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove after 8 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 8000);
    }
    
    // Input field enhancements
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.classList.contains('error') && this.value.trim()) {
                this.classList.remove('error');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
    
    // Character counter for textarea
    const suggestionTextarea = document.getElementById('suggestion');
    const maxLength = 1000;
    
    // Create character counter
    const counterDiv = document.createElement('div');
    counterDiv.className = 'character-counter';
    suggestionTextarea.parentNode.appendChild(counterDiv);
    
    function updateCharacterCount() {
        const currentLength = suggestionTextarea.value.length;
        counterDiv.textContent = `${currentLength}/${maxLength} tecken`;
        
        if (currentLength > maxLength * 0.9) {
            counterDiv.classList.add('warning');
        } else {
            counterDiv.classList.remove('warning');
        }
        
        if (currentLength > maxLength) {
            counterDiv.classList.add('exceeded');
            suggestionTextarea.value = suggestionTextarea.value.substring(0, maxLength);
        } else {
            counterDiv.classList.remove('exceeded');
        }
    }
    
    suggestionTextarea.addEventListener('input', updateCharacterCount);
    updateCharacterCount(); // Initial count
});

// Add CSS for dynamic elements
const additionalStyles = `
    <style>
    .form-group.focused label {
        color: #3b82f6;
        transform: translateY(-2px);
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 5px 15px rgba(239, 68, 68, 0.2);
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeIn 0.3s ease;
    }
    
    .submit-button.loading {
        background: #9ca3af;
        cursor: not-allowed;
    }
    
    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .success-message {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        animation: slideInDown 0.5s ease-out;
    }
    
    .success-content {
        text-align: center;
    }
    
    .success-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
    }
    
    .success-content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
    }
    
    .success-content p {
        margin: 0;
        opacity: 0.9;
    }
    
    .character-counter {
        text-align: right;
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.5rem;
    }
    
    .character-counter.warning {
        color: #f59e0b;
    }
    
    .character-counter.exceeded {
        color: #ef4444;
        font-weight: 600;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);