// You can add custom JS for interactive styles here
// Example: Change navbar color on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0,0,0,0.9)';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.7)';
    }
});
