document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic'
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Visitor Counter Logic
    const counterElement = document.getElementById('visitor-count');
    if (counterElement) {
        let visits = localStorage.getItem('n2_visits');
        
        if (!visits) {
            visits = 500; // Start from a realistic number
        } else {
            visits = parseInt(visits) + 1;
        }
        
        localStorage.setItem('n2_visits', visits);
        
        // Animate counter
        const target = visits;
        const duration = 2000; // ms
        const start = 0;
        const increment = target / (duration / 16); 
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counterElement.innerText = target.toString().padStart(5, '0');
                clearInterval(timer);
            } else {
                counterElement.innerText = Math.floor(current).toString().padStart(5, '0');
            }
        }, 16);
    }

    // Page Transitions
    const transitionOverlay = document.getElementById('page-transition');
    
    // Initial Reveal (Slide Up)
    setTimeout(() => {
        transitionOverlay.classList.remove('translate-y-0');
        transitionOverlay.classList.add('-translate-y-full');
    }, 500); // Small delay to ensure load is clean

    // Intercept Links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            
            // Only intercept internal links that are not anchors
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http')) {
                e.preventDefault();
                
                // Show Overlay (Slide Down)
                transitionOverlay.classList.remove('-translate-y-full');
                transitionOverlay.classList.add('translate-y-0');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 700); // Match CSS duration
            }
        });
    });
});
