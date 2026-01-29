// Simple animation for marketing quote only
document.addEventListener('DOMContentLoaded', function() {
    const quote = document.querySelector('.vision__quote');
    const container = document.querySelector('.vision__container');
    
    if (quote && container) {
        // Initial state
        quote.style.opacity = '0';
        quote.style.transform = 'translateY(20px)';
        quote.style.transition = 'all 1.5s ease-out';
        
        container.style.opacity = '0';
        container.style.transform = 'translateY(40px) scale(0.95)';
        container.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Animate container first
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0) scale(1)';
        }, 300);
        
        // Then animate quote
        setTimeout(() => {
            quote.style.opacity = '1';
            quote.style.transform = 'translateY(0)';
        }, 800);
        
        // Subtle floating animation for the glow
        const glow = document.querySelector('.vision__glow');
        if (glow) {
            glow.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
                { transform: 'translate(-10px, -10px) scale(1.1)', opacity: '0.4' },
                { transform: 'translate(0, 0) scale(1)', opacity: '0.3' }
            ], {
                duration: 4000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
        }
    }
});
