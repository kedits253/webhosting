document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Sticky Navbar behavior
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
                navbar.classList.remove('bg-white');
            } else {
                navbar.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
                navbar.classList.add('bg-white');
            }
        });
    }

    // 3. Fade-in Animation on Scroll using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // 4. Packing Checklist with LocalStorage
    const checklistContainer = document.getElementById('packing-checklist');
    if (checklistContainer) {
        const checkboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
        
        // Load saved state
        checkboxes.forEach(checkbox => {
            const id = checkbox.id;
            const savedState = localStorage.getItem(`checklist_${id}`);
            if (savedState === 'true') {
                checkbox.checked = true;
            }

            // Save state on change
            checkbox.addEventListener('change', (e) => {
                localStorage.setItem(`checklist_${e.target.id}`, e.target.checked);
            });
        });
    }

    // 5. Contact Form submission (Frontend only)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = 'Message Sent!';
                submitBtn.classList.add('bg-green-600');
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.classList.remove('bg-green-600');
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 6. FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            
            // Toggle current
            content.classList.toggle('hidden');
            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 7. Currency Converter Logic
    const usdInput = document.getElementById('usd-input');
    const lkrOutput = document.getElementById('lkr-output');
    const exchangeRate = 300; // Static exchange rate
    
    if(usdInput && lkrOutput) {
        usdInput.addEventListener('input', (e) => {
            const usd = parseFloat(e.target.value);
            if(!isNaN(usd)) {
                lkrOutput.value = (usd * exchangeRate).toLocaleString('en-US') + '.00';
            } else {
                lkrOutput.value = '';
            }
        });
    }

    // 8. Dark Mode Logic
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    if (darkModeToggle && moonIcon && sunIcon) {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
        }

        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            } else {
                localStorage.theme = 'light';
                moonIcon.classList.remove('hidden');
                sunIcon.classList.add('hidden');
            }
        });
    }
});
