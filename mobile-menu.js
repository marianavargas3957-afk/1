document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    document.querySelector('.hamburger').addEventListener('click', function() {
        const nav = document.querySelector('.header .nav');
        nav.classList.toggle('is-open');
    });

    // Close mobile menu if resized to desktop
    window.addEventListener('resize', function() {
        const nav = document.querySelector('.header .nav');
        if (window.innerWidth > 768) {
            nav.classList.remove('is-open');
        }
    });
});