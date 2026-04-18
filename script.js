// Setup DOM on Load
document.addEventListener('DOMContentLoaded', () => {

    /* Sticky Navbar style on scroll */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* Mobile Menu Toggle */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between list and X
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        });
    });

    /* Menu Filtering System */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                // If filter is "all", show. If it matches category, show. Else, hide.
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // tiny animate trick to restart animation
                    item.style.animation = 'none';
                    item.offsetHeight; /* trigger reflow */
                    item.style.animation = null;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* Smooth Scrolling for anchor links (if browser doesn't support natively) */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* Authentication Modal Logic */
    const authModal = document.getElementById('authModal');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const closeModal = document.getElementById('closeModal');
    const modalBackdrop = authModal.querySelector('.modal-backdrop');
    
    const loginFormContainer = document.getElementById('loginFormContainer');
    const signupFormContainer = document.getElementById('signupFormContainer');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');

    const openModal = (view = 'login') => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        if (view === 'signup') {
            loginFormContainer.style.display = 'none';
            signupFormContainer.style.display = 'block';
        } else {
            loginFormContainer.style.display = 'block';
            signupFormContainer.style.display = 'none';
        }
    };

    const closeAuthModal = () => {
        authModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    };

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('login');
    });

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('signup');
    });

    closeModal.addEventListener('click', closeAuthModal);
    modalBackdrop.addEventListener('click', closeAuthModal);

    switchToSignup.addEventListener('click', () => {
        loginFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'block';
    });

    switchToLogin.addEventListener('click', () => {
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && authModal.classList.contains('active')) {
            closeAuthModal();
        }
    });

    /* Form Submissions (Mock) */
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        alert(`Welcome back! Logged in as ${email}`);
        closeAuthModal();
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        alert(`Account created successfully! Welcome to the family, ${name}.`);
        closeAuthModal();
    });
});
