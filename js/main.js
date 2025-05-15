// Main JavaScript file for TSISPAT website

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Initialize product filtering
    initFilters();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Header scroll effect
    initHeaderScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length && dots.length) {
        // Set active slide on dot click
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                setActiveSlide(index);
            });
        });

        // Auto-play slider
        let currentSlide = 0;
        const slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            setActiveSlide(currentSlide);
        }, 5000);

        // Set active slide function
        function setActiveSlide(index) {
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    // Only animate counters if they exist and IntersectionObserver is supported
    if (counters.length && 'IntersectionObserver' in window) {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.innerText);
                    let count = 0;
                    const increment = Math.ceil(countTo / 50);
                    const interval = setInterval(() => {
                        count += increment;
                        if (count >= countTo) {
                            target.innerText = countTo;
                            clearInterval(interval);
                        } else {
                            target.innerText = count;
                        }
                    }, 30);
                    observer.unobserve(target);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// Product/Testimonial Filtering
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Get all items to filter
                const isProductPage = document.querySelector('.products-grid');
                const isReviewsPage = document.querySelector('.testimonials-grid');
                
                if (isProductPage) {
                    filterItems('.product-item', filterValue);
                } else if (isReviewsPage) {
                    filterItems('.testimonial-card', filterValue);
                }
            });
        });
    }
}

// Filter items function
function filterItems(itemSelector, filterValue) {
    const items = document.querySelectorAll(itemSelector);
    
    items.forEach(item => {
        if (filterValue === 'all') {
            item.style.display = 'grid';
        } else {
            if (item.getAttribute('data-category') === filterValue) {
                item.style.display = 'grid';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#' or if it's not an anchor link
            if (href === '#' || !document.querySelector(href)) {
                return;
            }
            
            e.preventDefault();
            
            const offsetTop = document.querySelector(href).offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}