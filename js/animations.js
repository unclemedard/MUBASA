/**
 * MUBASA JavaScript Animations
 * Enhanced animations: slide-ins, slide-outs, rotations, transformations
 * 
 * @author Alpher Technologies Uganda
 * @description Add dynamic JS animations to MUBASA website
 */

(function() {
    'use strict';

    // Animation Configuration
    const ANIMATION_CONFIG = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
        once: true
    };

    /**
     * Initialize all animations on page load
     */
    function init() {
        initScrollAnimations();
        initHoverAnimations();
        initStaggeredAnimations();
        initCounterAnimations();
        initParallaxEffects();
        initNavbarAnimations();
        initCardAnimations();
        initGalleryFilterAnimations();
        initRevealAnimations();
        initMobileMenuAnimations();
        initFormInputAnimations();
        initScrollProgressAnimations();
        initScrollToTop();
        initSimpleAnimations();
    }

    /**
     * Scroll-triggered animations using IntersectionObserver
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: ANIMATION_CONFIG.threshold,
            rootMargin: ANIMATION_CONFIG.rootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'fadeInUp';
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate-' + animationType);
                        element.classList.add('animated');
                    }, delay * 100);

                    if (ANIMATION_CONFIG.once) {
                        observer.unobserve(element);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });

        // Also observe elements with existing animate class for enhanced effects
        document.querySelectorAll('.animate, .slide-in, .scale-in, .rotate-in, .reveal').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Hover-triggered animations for cards and interactive elements
     */
    function initHoverAnimations() {
        // Card hover animations
        document.querySelectorAll('.card, .leader-card, .blog-card, .gallery-item, .value-card').forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', function(e) {
                this.classList.remove('hovered');
            });
        });

        // Button bounce on hover
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Image zoom on hover
        document.querySelectorAll('.leader-image img, .gallery-item img, .about-image-main img').forEach(img => {
            const parent = img.closest('.leader-image, .gallery-item, .about-image-main');
            if (parent) {
                parent.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                });
                parent.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });
            }
        });
    }

    /**
     * Staggered animations for grid items
     */
    function initStaggeredAnimations() {
        const grids = document.querySelectorAll('.grid-2, .grid-3, .grid-4, .values-grid, .blog-grid, .gallery-grid, .stats-grid');
        
        grids.forEach((grid, gridIndex) => {
            const items = grid.querySelectorAll(':scope > article, :scope > div, :scope > .card, :scope > .gallery-item');
            
            items.forEach((item, index) => {
                // Add staggered delay
                item.style.setProperty('--stagger-delay', index * 0.1 + 's');
                item.classList.add('stagger-item');
            });
        });
    }

    /**
     * Number counter animations for stats
     */
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-box .number, .number[data-count]');
        
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.count) || 100;
                    const duration = parseInt(element.dataset.duration) || 2000;
                    const prefix = element.dataset.prefix || '';
                    const suffix = element.dataset.suffix || '+';
                    
                    animateCounter(element, target, duration, prefix, suffix);
                    counterObserver.unobserve(element);
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    /**
     * Animate counter from 0 to target value
     */
    function animateCounter(element, target, duration, prefix = '', suffix = '+') {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = prefix + target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = prefix + Math.floor(start) + suffix;
            }
        }, 16);
    }

    /**
     * Parallax scroll effects
     */
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }

    /**
     * Navbar scroll animations
     */
    function initNavbarAnimations() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled', 'slide-down');
                navbar.classList.remove('slide-up');
            } else {
                navbar.classList.remove('scrolled', 'slide-down');
                navbar.classList.add('slide-up');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * Card flip and 3D animations
     */
    function initCardAnimations() {
        // Flip card animation on click
        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
        });

        // 3D tilt effect on mousemove
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    /**
     * Gallery filter animations
     */
    function initGalleryFilterAnimations() {
        const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
        
        if (filterBtns.length === 0 || galleryItems.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter items with animation
                const filter = this.textContent.toLowerCase();
                
                galleryItems.forEach((item, index) => {
                    item.classList.add('hiding');
                    
                    setTimeout(() => {
                        if (filter === 'all' || item.classList.contains(filter)) {
                            item.classList.remove('hidden', 'hiding');
                            item.classList.add('showing');
                        } else {
                            item.classList.add('hidden');
                            item.classList.remove('showing');
                        }
                    }, index * 50);
                });
            });
        });
    }

    /**
     * Reveal animations on scroll
     */
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /**
     * Mobile menu slide animations
     */
    function initMobileMenuAnimations() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (!mobileToggle || !navLinks) return;

        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded) {
                navLinks.classList.add('active');
                navLinks.classList.add('opening');
                navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
                
                setTimeout(() => {
                    navLinks.classList.remove('opening');
                    navLinks.classList.add('open');
                }, 300);
            } else {
                navLinks.classList.remove('active');
                navLinks.classList.remove('open');
                navLinks.style.maxHeight = '0';
            }
            
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Animate hamburger
            this.classList.toggle('open');
        });
    }

    /**
     * Form input focus animations
     */
    function initFormInputAnimations() {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    /**
     * Scroll progress indicator
     */
    function initScrollProgressAnimations() {
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        
        if (!progressBar && document.querySelector('.hero, .page-banner')) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }

        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }

    /**
     * Scroll to top button functionality
     */
    function initScrollToTop() {
        const scrollTopBtn = document.getElementById('scrollTop');
        if (!scrollTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Simple animation observer for .animate elements
     */
    function initSimpleAnimations() {
        const animateElements = document.querySelectorAll('.animate');
        if (animateElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => observer.observe(el));
    }

    /**
     * Smooth scroll to element
     */
    function smoothScrollTo(targetSelector) {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Add animation class dynamically
     */
    function addAnimation(element, animationType, delay = 0) {
        element.classList.add('animate');
        element.dataset.animation = animationType;
        element.dataset.delay = delay;
    }

    /**
     * Remove animation class
     */
    function removeAnimation(element) {
        element.classList.remove('animate', 'animated');
    }

    /**
     * Trigger animation manually
     */
    function triggerAnimation(element, animationType) {
        element.classList.remove('animated');
        
        setTimeout(() => {
            element.classList.add('animate-' + animationType);
            element.classList.add('animated');
        }, 10);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export functions for external use
    window.MUBASAAnimations = {
        init,
        smoothScrollTo,
        addAnimation,
        removeAnimation,
        triggerAnimation,
        animateCounter
    };

})();
