// Simple animation for marketing quote only
document.addEventListener('DOMContentLoaded', function() {
    const quote = document.querySelector('.vision__quote');
    if (quote) {
        quote.style.opacity = '0';
        quote.style.transform = 'translateY(20px)';
        quote.style.transition = 'all 1.5s ease-out';
        
        setTimeout(() => {
            quote.style.opacity = '1';
            quote.style.transform = 'translateY(0)';
        }, 500);
    }
});
