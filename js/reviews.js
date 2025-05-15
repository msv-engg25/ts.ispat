// Reviews page handling

document.addEventListener('DOMContentLoaded', function() {
    // Get the review form element
    const reviewForm = document.getElementById('review-form');
    
    // Add submit event listener to the form if it exists
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            // Prevent the default form submission
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('review-name').value,
                company: document.getElementById('review-company').value,
                email: document.getElementById('review-email').value,
                position: document.getElementById('review-position').value,
                product: document.getElementById('review-product').value,
                rating: document.querySelector('input[name="rating"]:checked')?.value || '',
                title: document.getElementById('review-title').value,
                message: document.getElementById('review-message').value
            };
            
            // Validate form data
            if (validateForm(formData)) {
                // Show loading state
                showReviewMessage('Submitting your review...', 'processing');
                
                // Simulate form submission (In a real implementation, you would send data to a server here)
                setTimeout(() => {
                    // Show success message
                    showReviewMessage('Thank you for your review! It has been submitted successfully and will be published after moderation.', 'success');
                    
                    // Reset the form
                    reviewForm.reset();
                    
                    // Hide the message after 5 seconds
                    setTimeout(() => {
                        hideReviewMessage();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Form validation function
    function validateForm(data) {
        // Check for empty fields (except image which is optional)
        for (const key in data) {
            if (data[key].trim() === '' && key !== 'images') {
                showReviewMessage('Please fill in all required fields.', 'error');
                return false;
            }
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showReviewMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        // Ensure rating is selected
        if (!data.rating) {
            showReviewMessage('Please select a rating.', 'error');
            return false;
        }
        
        return true;
    }
    
    // Function to show review submission messages
    function showReviewMessage(message, type) {
        const messageElement = document.getElementById('review-message');
        
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
    
    // Function to hide review submission messages
    function hideReviewMessage() {
        const messageElement = document.getElementById('review-message');
        
        if (messageElement) {
            messageElement.style.display = 'none';
        }
    }
    
    // Initialize dynamic image preview for review submission
    const imageInput = document.getElementById('review-image');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            // Check number of files selected
            if (this.files.length > 3) {
                showReviewMessage('You can upload a maximum of 3 images.', 'error');
                this.value = '';
                return;
            }
            
            // Validate file types
            for (let i = 0; i < this.files.length; i++) {
                const fileType = this.files[i].type;
                if (!fileType.match('image.*')) {
                    showReviewMessage('Please upload only image files.', 'error');
                    this.value = '';
                    return;
                }
                
                // Validate file size (max 2MB)
                if (this.files[i].size > 2 * 1024 * 1024) {
                    showReviewMessage('Image size should not exceed 2MB.', 'error');
                    this.value = '';
                    return;
                }
            }
        });
    }
});