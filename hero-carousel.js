document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.hero-carousel .carousel-image');
    const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');
    if (carouselImages.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let autoSlideIntervalId; // Variable to hold the interval ID

    function showSlide(index) {
        // Remove active class from all images and indicators
        carouselImages.forEach(img => img.classList.remove('active'));
        carouselIndicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to the current slide and indicator
        carouselImages[index].classList.add('active');
        carouselIndicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselImages.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        clearInterval(autoSlideIntervalId); // Clear any existing interval
        autoSlideIntervalId = setInterval(nextSlide, slideInterval);
    }

    showSlide(currentSlide); // Initial display
    startAutoSlide(); // Start automatic rotation

    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide(); // Reset interval on manual interaction
        });
    });
});