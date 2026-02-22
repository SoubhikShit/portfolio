// ========================================
// Typing Effect
// ========================================
const titles = [
    "AI / ML Engineer",
    "GenAI & LLM Developer",
    "Full-Stack Developer",
    "Computer Vision Researcher",
    "IIT Kharagpur '26"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2000; // pause at full text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    lastScroll = scrollY;
});

// ========================================
// Mobile Navigation
// ========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ========================================
// Counter Animation
// ========================================
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseFloat(target.dataset.count);
            const isFloat = countTo % 1 !== 0;
            const duration = 1500;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = ease * countTo;

                if (isFloat) {
                    target.textContent = current.toFixed(2);
                } else {
                    target.textContent = Math.floor(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    target.textContent = isFloat ? countTo.toFixed(2) : countTo;
                }
            }

            requestAnimationFrame(updateCount);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ========================================
// Cursor Glow
// ========================================
const cursorGlow = document.getElementById('cursorGlow');

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
} else {
    cursorGlow.style.display = 'none';
}

// ========================================
// Active Nav Link on Scroll
// ========================================
const sections = document.querySelectorAll('.section, .hero');
const navLinkItems = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent-light)';
        }
    });
});

// ========================================
// Smooth Scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
