// Dynamic topbar behavior
document.addEventListener('DOMContentLoaded', function() {
    const topbar = document.querySelector('.topbar');
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let scrollThreshold = 50; // When to fix the topbar
    let hideThreshold = 300; // When to hide the topbar
    
    if (topbar) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Phase 1: Topbar starts absolute (at top of content)
            if (currentScrollY < scrollThreshold) {
                topbar.classList.remove('topbar--fixed', 'topbar--hidden');
                document.body.classList.remove('has-fixed-topbar');
            }
            // Phase 2: Fix topbar to top with smooth animation
            else if (currentScrollY >= scrollThreshold && currentScrollY < hideThreshold) {
                if (!topbar.classList.contains('topbar--fixed')) {
                    topbar.classList.add('topbar--fixed');
                    document.body.classList.add('has-fixed-topbar');
                }
                topbar.classList.remove('topbar--hidden');
            }
            // Phase 3: Hide topbar when scrolling further down
            else if (currentScrollY >= hideThreshold) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down - hide
                    topbar.classList.add('topbar--hidden');
                } else {
                    // Scrolling up - show
                    topbar.classList.remove('topbar--hidden');
                }
            }
            
            // Show topbar when scrolling near top
            if (currentScrollY < hideThreshold + 100) {
                topbar.classList.remove('topbar--hidden');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
    
    // Scroll-triggered animation for vision section
    const container = document.querySelector('.vision__container');
    const quote = document.querySelector('.vision__quote');
    
    if (container && quote) {
        // Initial state - hidden
        container.style.opacity = '0';
        container.style.transform = 'translateY(60px) scale(0.98)';
        container.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        quote.style.opacity = '0';
        quote.style.transform = 'translateY(30px)';
        quote.style.transition = 'all 0.6s ease-out';
        
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
                    }, 300);
                    
                    // Start subtle breathing animation on container
                    setTimeout(() => {
                        container.style.animation = 'breathing 2.5s ease-in-out infinite';
                    }, 800);
                    
                    // Animate the glow
                    const glow = document.querySelector('.vision__glow');
                    if (glow) {
                        glow.animate([
                            { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
                            { transform: 'translate(-8px, -8px) scale(1.15)', opacity: '0.5' },
                            { transform: 'translate(0, 0) scale(1)', opacity: '0.3' }
                        ], {
                            duration: 3000,
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
