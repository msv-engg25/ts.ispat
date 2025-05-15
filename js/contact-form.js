// Contact form handling

document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form element
    const contactForm = document.getElementById('contact-form');
    
    // Add submit event listener to the form if it exists
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Prevent the default form submission
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                inquiryType: document.getElementById('inquiry-type').value
            };
            
            // Validate form data
            if (validateForm(formData)) {
                // Show loading state
                showFormMessage('Submitting your message...', 'processing');
                
                // Simulate form submission (In a real implementation, you would send data to a server here)
                setTimeout(() => {
                    // Show success message
                    showFormMessage('Thank you! Your message has been submitted successfully. We will contact you soon.', 'success');
                    
                    // Reset the form
                    contactForm.reset();
                    
                    // Hide the message after 5 seconds
                    setTimeout(() => {
                        hideFormMessage();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Form validation function
    function validateForm(data) {
        // Check for empty fields
        for (const key in data) {
            if (data[key].trim() === '') {
                showFormMessage('Please fill in all required fields.', 'error');
                return false;
            }
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        // Validate phone number (basic validation, can be enhanced)
        const phoneRegex = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
        if (!phoneRegex.test(data.phone)) {
            showFormMessage('Please enter a valid phone number.', 'error');
            return false;
        }
        
        return true;
    }
    
    // Function to show form messages
    function showFormMessage(message, type) {
        const messageElement = document.getElementById('form-message');
        
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.display = 'block';
            
            // Remove all existing classes
            messageElement.className = 'form-message';
            
            // Add the appropriate class based on message type
            if (type === 'success') {
                messageElement.classList.add('success');
            } else if (type === 'error') {
                messageElement.classList.add('error');
            } else if (type === 'processing') {
                messageElement.classList.add('processing');
            }
            
            // Scroll to the message
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Function to hide form messages
    function hideFormMessage() {
        const messageElement = document.getElementById('form-message');
        
        if (messageElement) {
            messageElement.style.display = 'none';
        }
    }
});