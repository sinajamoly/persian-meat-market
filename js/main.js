// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    const languageSwitcher = document.getElementById('language-switcher');

    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    // Product category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product');

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                // Show/hide products based on category
                products.forEach(product => {
                    if (category === 'all' || product.getAttribute('data-category') === category) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // In a real application, you would send this data to a server
            // For now, we'll just log it to the console and show an alert
            console.log('Form submitted:', { name, email, phone, message });

            const thankYouMessage = currentLanguage === 'fa' ? 'با تشکر از پیام شما! به زودی با شما تماس خواهیم گرفت.' : 'Thank you for your message! We will get back to you soon.';
            alert(thankYouMessage);

            // Reset the form
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Product Gallery Functionality
    initProductGalleries();
});

// Function to initialize all product galleries
function initProductGalleries() {
    const galleries = document.querySelectorAll('.product-gallery');

    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        const productId = gallery.getAttribute('data-product-id');

        if (images.length > 1) {
            // Create navigation dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'gallery-nav';

            // Create prev/next arrows
            const prevArrow = document.createElement('div');
            prevArrow.className = 'gallery-arrow gallery-prev';
            prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';

            const nextArrow = document.createElement('div');
            nextArrow.className = 'gallery-arrow gallery-next';
            nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';

            // Add arrows to gallery
            gallery.appendChild(prevArrow);
            gallery.appendChild(nextArrow);

            // Create dots for each image
            images.forEach((img, index) => {
                const dot = document.createElement('div');
                dot.className = 'gallery-dot';
                if (index === 0) {
                    dot.classList.add('active');
                    img.classList.add('active');
                }

                dot.addEventListener('click', () => {
                    // Remove active class from all images and dots
                    images.forEach(image => image.classList.remove('active'));
                    dotsContainer.querySelectorAll('.gallery-dot').forEach(d => d.classList.remove('active'));

                    // Add active class to current image and dot
                    img.classList.add('active');
                    dot.classList.add('active');
                });

                dotsContainer.appendChild(dot);
            });

            gallery.appendChild(dotsContainer);

            // Add event listeners to arrows
            let currentIndex = 0;

            prevArrow.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateGallery();
            });

            nextArrow.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateGallery();
            });

            // Auto-rotate images every 5 seconds
            let intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateGallery();
            }, 5000);

            // Pause rotation on hover
            gallery.addEventListener('mouseenter', () => {
                clearInterval(intervalId);
            });

            gallery.addEventListener('mouseleave', () => {
                intervalId = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateGallery();
                }, 5000);
            });

            function updateGallery() {
                // Remove active class from all images and dots
                images.forEach(image => image.classList.remove('active'));
                dotsContainer.querySelectorAll('.gallery-dot').forEach(d => d.classList.remove('active'));

                // Add active class to current image and dot
                images[currentIndex].classList.add('active');
                dotsContainer.querySelectorAll('.gallery-dot')[currentIndex].classList.add('active');
            }
        } else if (images.length === 1) {
            // If there's only one image, make it visible
            images[0].classList.add('active');
        }
    });
}
