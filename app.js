// Scroll-triggered animation for vision section
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.vision__container');
    const quote = document.querySelector('.vision__quote');
    
    if (container && quote) {
        // Initial state - hidden
        container.style.opacity = '0';
        container.style.transform = 'translateY(60px) scale(0.98)';
        container.style.transition = 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        quote.style.opacity = '0';
        quote.style.transform = 'translateY(30px)';
        quote.style.transition = 'all 1.2s ease-out';
        
        // Intersection Observer for scroll-trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate container with breathing effect
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0) scale(1)';
                    
                    // Animate quote after container starts
                    setTimeout(() => {
                        quote.style.opacity = '1';
                        quote.style.transform = 'translateY(0)';
                    }, 600);
                    
                    // Start subtle breathing animation on container
                    setTimeout(() => {
                        container.style.animation = 'breathing 4s ease-in-out infinite';
                    }, 1800);
                    
                    // Animate the glow
                    const glow = document.querySelector('.vision__glow');
                    if (glow) {
                        glow.animate([
                            { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
                            { transform: 'translate(-8px, -8px) scale(1.15)', opacity: '0.5' },
                            { transform: 'translate(0, 0) scale(1)', opacity: '0.3' }
                        ], {
                            duration: 5000,
                            iterations: Infinity,
                            easing: 'ease-in-out'
                        });
                    }
                    
                    // Disconnect after trigger
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% visible
            rootMargin: '0px 0px -100px 0px' // Slightly offset trigger
        });
        
        observer.observe(container);
    }
    
    // Add breathing animation to styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes breathing {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.005) translateY(-2px); }
        }
    `;
    document.head.appendChild(style);
});
