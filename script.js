/* ========================================
   DOCUMENT READY / INITIALIZATION
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

const STACKLY_LOADER_NAV_DELAY = 450;

function initializeApp() {
    setupLoadingScreen();
    setupAOSAnimations();
    setupHeaderOffset();
    setupMobileNavigation();
    setupMobileAuthLinks();
    setupStickyHeader();
    setupSmoothScrolling();
    setupActiveNavigation();
    setupAnimatedCounters();
    setupBackToTop();
    setupTestimonialSlider();
    setupContactForm();
    setupLanguageSelector();
}

function setupMobileAuthLinks() {
    const navMenu = document.getElementById('navMenu');
    const headerControls = document.querySelector('.header-controls');

    if (!navMenu || !headerControls) {
        return;
    }

    const loginLink = headerControls.querySelector('.btn-login');
    const registerLink = headerControls.querySelector('.btn-register');

    if (!loginLink || !registerLink || navMenu.querySelector('.nav-auth-item')) {
        return;
    }

    const authLinks = [
        { href: loginLink.getAttribute('href') || 'login.html', label: loginLink.textContent.trim() || 'Login' },
        { href: registerLink.getAttribute('href') || 'signup.html', label: registerLink.textContent.trim() || 'Register' }
    ];

    authLinks.forEach(link => {
        const li = document.createElement('li');
        li.className = 'nav-auth-item';

        const anchor = document.createElement('a');
        anchor.className = 'nav-link';
        anchor.href = link.href;
        anchor.textContent = link.label;

        li.appendChild(anchor);
        navMenu.appendChild(li);
    });
}

function setupLoadingScreen() {
    if (document.body.dataset.stacklyNoLoader === 'true') {
        return;
    }

    const loader = document.getElementById('stacklyPageLoader') || createLoadingScreen();
    const hideAfterLoad = () => {
        window.setTimeout(() => hideLoadingScreen(loader), STACKLY_LOADER_NAV_DELAY + 250);
    };

    if (document.readyState === 'complete') {
        hideAfterLoad();
    } else {
        window.addEventListener('load', hideAfterLoad, { once: true });
    }
}

function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'stacklyPageLoader';
    loader.className = 'stackly-page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
        <div class="stackly-page-loader__panel">
            <img src="assets/stackly-whitish_blue-logo.webp" alt="Stackly" class="stackly-page-loader__logo">
            <div class="stackly-page-loader__text">Loading</div>
        </div>
    `;
    document.body.appendChild(loader);
    return loader;
}

function showLoadingScreen(loader) {
    if (!loader) return;
    document.body.classList.add('stackly-loading');
    loader.classList.add('is-visible');
}

function hideLoadingScreen(loader) {
    if (!loader) return;
    loader.classList.remove('is-visible');
    document.body.classList.remove('stackly-loading');
}

function setupAOSAnimations() {
    const AOS_CSS_ID = 'aos-css';
    const AOS_JS_ID = 'aos-js';
    const AOS_CSS_HREF = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
    const AOS_JS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';

    const ensureStylesheet = () => {
        if (!document.getElementById(AOS_CSS_ID)) {
            const link = document.createElement('link');
            link.id = AOS_CSS_ID;
            link.rel = 'stylesheet';
            link.href = AOS_CSS_HREF;
            document.head.appendChild(link);
        }
    };

    const applyAttributes = (selector, animation, options = {}) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            if (element.dataset.aos) {
                return;
            }

            element.setAttribute('data-aos', animation);
            element.setAttribute('data-aos-duration', String(options.duration || 800));
            element.setAttribute('data-aos-easing', options.easing || 'ease-out-cubic');
            element.setAttribute('data-aos-offset', String(options.offset || 120));
            element.setAttribute('data-aos-once', options.once === false ? 'false' : 'true');

            const delay = (options.delay || 0) + (options.stagger || 0) * index;
            if (delay > 0) {
                element.setAttribute('data-aos-delay', String(delay));
            }
        });
    };

    const configureElements = () => {
        applyAttributes('section.hero', 'fade-up', { duration: 900 });
        applyAttributes('.hero-text', 'fade-right', { duration: 900 });
        applyAttributes('.hero-visual', 'fade-left', { duration: 900 });
        applyAttributes('.hero-highlight', 'zoom-in', { duration: 700, stagger: 120 });

        applyAttributes('.section-title', 'fade-up', { duration: 700 });
        applyAttributes('.section-subtitle', 'fade-up', { duration: 700, delay: 120 });

        applyAttributes('.feature-card', 'zoom-in', { duration: 750, stagger: 90 });
        applyAttributes('.service-card', 'fade-up', { duration: 750, stagger: 90 });
        applyAttributes('.scheme-card', 'fade-up', { duration: 750, stagger: 90 });
        applyAttributes('.department-card', 'flip-left', { duration: 800, stagger: 90 });
        applyAttributes('.notice-card', 'fade-up', { duration: 750, stagger: 90 });
        applyAttributes('.news-card', 'fade-up', { duration: 750, stagger: 90 });
        applyAttributes('.testimonial-card', 'fade-up', { duration: 750, stagger: 90 });
        applyAttributes('.info-card', 'fade-up', { duration: 750, stagger: 90 });

        applyAttributes('.contact-form', 'fade-right', { duration: 900 });
        applyAttributes('.contact-info', 'fade-left', { duration: 900 });
        applyAttributes('.map-container', 'zoom-in', { duration: 900 });

        applyAttributes('.tracking-form', 'fade-right', { duration: 900 });
        applyAttributes('.tracking-result', 'fade-left', { duration: 900 });

        applyAttributes('.footer-brand', 'fade-up', { duration: 700 });
        applyAttributes('.footer-section', 'fade-up', { duration: 700, stagger: 90 });
        applyAttributes('.footer-bottom', 'fade-up', { duration: 700 });
    };

    ensureStylesheet();
    configureElements();

    const startAOS = () => {
        if (window.AOS && typeof window.AOS.init === 'function') {
            window.AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                offset: 120,
                once: true,
                mirror: false
            });
        }
    };

    if (window.AOS && typeof window.AOS.init === 'function') {
        startAOS();
        return;
    }

    if (!document.getElementById(AOS_JS_ID)) {
        const script = document.createElement('script');
        script.id = AOS_JS_ID;
        script.src = AOS_JS_SRC;
        script.onload = startAOS;
        document.body.appendChild(script);
    }
}

function setupHeaderOffset() {
    if (document.body.dataset.stacklyNoHeaderOffset === 'true') {
        document.body.style.paddingTop = '0px';
        return;
    }

    const header = document.getElementById('header');

    if (!header) {
        return;
    }

    const updateOffset = () => {
        const offset = header.offsetHeight;
        document.body.style.paddingTop = `${offset}px`;
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    window.addEventListener('load', updateOffset);
}

/* ========================================
   MOBILE NAVIGATION
   ======================================== */

function setupMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        const syncHamburgerState = () => {
            const isOpen = navMenu.classList.contains('active');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        };

        syncHamburgerState();

        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            syncHamburgerState();
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                syncHamburgerState();
            });
        });
    }
}

/* ========================================
   STICKY HEADER
   ======================================== */

function setupStickyHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ========================================
   SMOOTH SCROLLING
   ======================================== */

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/* ========================================
   ACTIVE NAVIGATION HIGHLIGHT
   ======================================== */

function setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) {
        return;
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkUrl = new URL(link.getAttribute('href'), window.location.href);
        const linkPage = linkUrl.pathname.split('/').pop() || 'index.html';

        link.classList.toggle('active', linkPage === currentPage);
    });
}

/* ========================================
   ANIMATED COUNTERS
   ======================================== */

function setupAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = Math.ceil(target / 50);

            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    setTimeout(updateCounter, 30);
                }
            };

            updateCounter();
        });
        
        animated = true;
    };

    // Trigger animation when section is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* ========================================
   TESTIMONIAL SLIDER
   ======================================== */

function setupTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;

    if (!testimonialCards.length || !sliderDotsContainer) {
        return;
    }

    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        if (index >= testimonialCards.length) currentSlide = 0;
        if (index < 0) currentSlide = testimonialCards.length - 1;

        testimonialCards[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }

    window.slideTestimonials = (direction) => {
        currentSlide += direction;
        showSlide(currentSlide);
    };

    window.goToSlide = (index) => {
        currentSlide = index;
        showSlide(currentSlide);
    };

    // Auto-rotate testimonials
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);

    showSlide(0);
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */

function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
}

window.backToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

/* ========================================
   APPLICATION TRACKING
   ======================================== */

window.trackApplication = function(event) {
    if (event) {
        event.preventDefault();
    }

    const appNumber = document.getElementById('appNumber').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const appNumberError = document.getElementById('appNumberError');
    const mobileNumberError = document.getElementById('mobileNumberError');

    if (appNumberError) {
        appNumberError.classList.remove('show');
        appNumberError.textContent = '';
    }
    if (mobileNumberError) {
        mobileNumberError.classList.remove('show');
        mobileNumberError.textContent = '';
    }

    const appInput = document.getElementById('appNumber');
    const mobileInput = document.getElementById('mobileNumber');
    if (appInput) appInput.classList.remove('error');
    if (mobileInput) mobileInput.classList.remove('error');

    // Validation
    if (!appNumber) {
        if (appNumberError) {
            appNumberError.textContent = 'Please enter details';
            appNumberError.classList.add('show');
        }
        if (appInput) appInput.classList.add('error');
        return;
    }

    if (!mobileNumber) {
        if (mobileNumberError) {
            mobileNumberError.textContent = 'Please enter details';
            mobileNumberError.classList.add('show');
        }
        if (mobileInput) mobileInput.classList.add('error');
        return;
    }

    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
        if (mobileNumberError) {
            mobileNumberError.textContent = 'Please enter a valid 10-digit mobile number';
            mobileNumberError.classList.add('show');
        }
        if (mobileInput) mobileInput.classList.add('error');
        return;
    }

    // Show result
    const trackingResult = document.getElementById('trackingResult');
    document.getElementById('resultAppNumber').textContent = 'Application #' + appNumber;
    document.getElementById('currentStatus').textContent = getRandomStatus();
    document.getElementById('lastUpdate').textContent = getLastUpdate();
    
    trackingResult.style.display = 'block';
    trackingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

function getRandomStatus() {
    const statuses = ['Submitted', 'Under Verification', 'Processing', 'Approved', 'Rejected'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getLastUpdate() {
    const dates = [
        'Today at ' + new Date().toLocaleTimeString(),
        'Yesterday',
        '2 days ago',
        '3 days ago',
        'Last week'
    ];
    return dates[Math.floor(Math.random() * dates.length)];
}

/* ========================================
   CONTACT FORM VALIDATION & SUBMISSION
   ======================================== */

function setupContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        const fullNameInput = document.getElementById('fullName');
        if (fullNameInput) {
            fullNameInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^A-Za-z ]+/g, '');
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            clearContactErrors();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            if (!fullName) {
                showContactError('fullName', 'Please enter your full name');
                isValid = false;
            } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(fullName)) {
                showContactError('fullName', 'Name should contain letters only');
                isValid = false;
            }

            if (!email) {
                showContactError('email', 'Please enter your email address');
                isValid = false;
            } else if (!validateEmail(email)) {
                showContactError('email', 'Please enter a valid email address');
                isValid = false;
            }

            if (!phone) {
                showContactError('phone', 'Please enter your mobile number');
                isValid = false;
            } else if (!validatePhone(phone)) {
                showContactError('phone', 'Please enter a valid 10-digit mobile number');
                isValid = false;
            }

            if (!subject) {
                showContactError('subject', 'Please enter a subject');
                isValid = false;
            }

            if (!message) {
                showContactError('message', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showContactError('message', 'Message must be at least 10 characters');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // If validation passes, show success message
            showAlert('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
            form.reset();
        });
    }
}

function showContactError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const error = document.getElementById(fieldName + 'Error');

    if (input) {
        input.classList.add('error');
        input.addEventListener('input', clearContactFieldError.bind(null, fieldName), { once: true });
        input.addEventListener('focus', clearContactFieldError.bind(null, fieldName), { once: true });
    }

    if (error) {
        error.textContent = message;
        error.classList.add('show');
    }
}

function clearContactFieldError(fieldName) {
    const input = document.getElementById(fieldName);
    const error = document.getElementById(fieldName + 'Error');

    if (input) {
        input.classList.remove('error');
    }

    if (error) {
        error.classList.remove('show');
        error.textContent = '';
    }
}

function clearContactErrors() {
    ['fullName', 'email', 'phone', 'subject', 'message'].forEach(clearContactFieldError);
}

/* ========================================
   FORM VALIDATION UTILITIES
   ======================================== */

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function validatePassword(password) {
    // Password should be at least 8 characters with uppercase, lowercase, and number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

/* ========================================
   ALERT/NOTIFICATION SYSTEM
   ======================================== */

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Add styles
    Object.assign(alert.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    });

    // Set color based on type
    if (type === 'success') {
        alert.style.background = '#4CAF50';
        alert.style.color = 'white';
    } else if (type === 'error') {
        alert.style.background = '#f44336';
        alert.style.color = 'white';
    } else {
        alert.style.background = '#2196F3';
        alert.style.color = 'white';
    }

    document.body.appendChild(alert);

    // Remove after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   LANGUAGE SELECTOR
   ======================================== */

function setupLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');

    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
            
            if (selectedLanguage === 'hi') {
                showAlert('भाषा हिंदी में बदल दी गई है', 'info');
            } else {
                showAlert('Language changed to English', 'info');
            }
        });

        // Check for saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
        }
    }
}

/* ========================================
   SERVICE SEARCH
   ======================================== */

function setupServiceSearch() {
    const searchInput = document.querySelector('.search-bar input');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const serviceCards = document.querySelectorAll('.service-card');

            serviceCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.feature-card, .service-card, .scheme-card, .department-card, .notice-card, .news-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations
setupScrollAnimations();

/* ========================================
   BUTTON CLICK HANDLERS
   ======================================== */

// Handle "Apply Now" buttons
const applyButtons = document.querySelectorAll('.service-card .btn, .scheme-card .btn, .department-card .btn, .news-card .btn');
applyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const buttonText = this.textContent;
        
        if (buttonText.includes('Apply')) {
            showAlert('Redirecting to application form...', 'info');
            // In production, redirect to actual application page
        } else if (buttonText.includes('Learn')) {
            showAlert('Loading more information...', 'info');
        } else if (buttonText.includes('Read')) {
            showAlert('Opening full article...', 'info');
        } else if (buttonText.includes('Download')) {
            showAlert('PDF download started...', 'success');
        } else if (buttonText.includes('Details')) {
            showAlert('Loading department details...', 'info');
        }
    });
});

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */

// Lazy loading for images (if implemented)
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                imageObserver.unobserve(entry.target);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */

document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Print function for documents
window.printDocument = function() {
    window.print();
};

// Share function
window.shareContent = function(text) {
    if (navigator.share) {
        navigator.share({
            title: 'National Government Portal',
            text: text,
            url: window.location.href
        });
    } else {
        showAlert('Sharing is not supported on this device', 'info');
    }
};

// Get current time formatted
function getCurrentTime() {
    return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Check if user is online
window.addEventListener('online', () => {
    showAlert('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showAlert('You are offline. Some features may not work properly.', 'error');
});

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
   ======================================== */

// Add focus indicators for keyboard navigation
const style2 = document.createElement('style');
style2.textContent = `
    button:focus,
    input:focus,
    textarea:focus,
    select:focus,
    a:focus {
        outline: 3px solid #FF9933;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style2);

// Prevent console errors on missing elements
console.log('%c National Government Portal Loaded Successfully', 'color: #003399; font-size: 14px; font-weight: bold;');
