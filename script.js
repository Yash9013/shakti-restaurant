/* ===================================
   SHAKTI RESTAURANT — Interactions
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');

    const handleNavScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    let overlay = null;

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeNav);
    }
    createOverlay();

    function openNav() {
        navLinks.classList.add('active');
        navToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // --- Mobile sticky bar ---
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    
    const handleStickyBar = () => {
        if (window.innerWidth <= 640) {
            if (window.scrollY > 500) {
                mobileStickyBar.classList.add('visible');
            } else {
                mobileStickyBar.classList.remove('visible');
            }
        }
    };
    window.addEventListener('scroll', handleStickyBar, { passive: true });
    handleStickyBar();

    // --- Scroll animations with Intersection Observer ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Hero particles (subtle floating dots) ---
    const particlesContainer = document.getElementById('heroParticles');
    
    function createParticles() {
        const count = window.innerWidth < 640 ? 15 : 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.15 + 0.05;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(230, 126, 34, ${opacity});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: particleFloat ${duration}s ${delay}s infinite ease-in-out;
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // Add particle animation keyframes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particleFloat {
            0%, 100% { 
                transform: translate(0, 0) scale(1);
                opacity: 0.5;
            }
            25% { 
                transform: translate(20px, -30px) scale(1.2);
                opacity: 1;
            }
            50% { 
                transform: translate(-10px, -50px) scale(0.8);
                opacity: 0.7;
            }
            75% { 
                transform: translate(15px, -20px) scale(1.1);
                opacity: 0.9;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // --- Counter animation for stats ---
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const text = counter.textContent;
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const target = parseInt(match[1]);
                        const suffix = text.replace(match[1], '');
                        let current = 0;
                        const increment = target / 40;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.textContent = Math.floor(current) + suffix;
                        }, 30);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // --- Gallery hover effect on touch ---
    if ('ontouchstart' in window) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('touchstart', () => {
                document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('touch-active'));
                item.classList.add('touch-active');
            });
        });

        const touchStyle = document.createElement('style');
        touchStyle.textContent = `
            .gallery-item.touch-active .gallery-overlay {
                opacity: 1;
            }
            .gallery-item.touch-active img {
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(touchStyle);
    }

    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (navLink) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLink.style.color = '';
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // Active link style
    const activeLinkStyle = document.createElement('style');
    activeLinkStyle.textContent = `
        .navbar.scrolled .nav-links a.active-link:not(.nav-cta) {
            color: var(--primary) !important;
        }
        .navbar.scrolled .nav-links a.active-link:not(.nav-cta)::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeLinkStyle);

});
