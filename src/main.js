import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Respect reduced motion
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (window.matchMedia("(min-width: 768px)").matches) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out", opacity: 1 });
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0, opacity: 1 });
    });

    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2, borderColor: "transparent", backgroundColor: "rgba(212, 175, 55, 0.2)" });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, borderColor: "#D4AF37", backgroundColor: "transparent" });
        });
    });
}

// Hero Animation
if (!reducedMotion) {
    // split headline into characters for a refined entrance
    function splitIntoChars(selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        const text = el.textContent.trim();
        el.setAttribute('aria-label', text);
        el.innerHTML = text.split('').map(char => {
            if (char === ' ') return '<span class="char">&nbsp;</span>';
            return `<span class="char">${char}</span>`;
        }).join('');
        // make sure chars are inline-block for animation
        el.querySelectorAll('.char').forEach(c => c.style.display = 'inline-block');
    }

    splitIntoChars('.hero-headline');

    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
        .from('.hero-headline .char', { y: 28, opacity: 0, duration: 0.9, stagger: 0.03 })
        .from('.hero-sub', { y: 18, opacity: 0, duration: 0.7 }, '-=0.55')
        .from('.reveal-hero', { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.45');

    // subtle parallax for illustration tied to scroll
    gsap.to('.hero-illustration', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6
        }
    });
} else {
    // If reduced motion preferred, ensure elements are visible
    document.querySelectorAll('.reveal-hero').forEach(el => el.style.opacity = 1);
}

// Navigation Logic
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }

    lastScroll = currentScroll;
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;
menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isMenuOpen));

    if (isMenuOpen) {
        mobileMenu.style.transform = "translateX(0)";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        gsap.from(mobileLinks, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3
        });
        menuToggle.innerHTML = '<i class="fas fa-times text-xl md:text-2xl"></i>';
        // move focus to first mobile link for keyboard users
        setTimeout(() => {
            const first = mobileLinks[0];
            if (first && typeof first.focus === 'function') first.focus();
        }, 350);
    } else {
        mobileMenu.style.transform = "translateX(100%)";
        document.body.style.overflow = "";
        menuToggle.innerHTML = '<i class="fas fa-bars text-xl md:text-2xl"></i>';
        // return focus to the toggle
        menuToggle.focus();
    }
});

// Close menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.style.transform = "translateX(100%)";
        document.body.style.overflow = "";
        menuToggle.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    });
});

// Back to Top Logic
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        backToTopBtn.classList.add('translate-y-0', 'opacity-100');
    } else {
        backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
    }
});

// Generic Reveal Animations (Replacing AOS with GSAP)
const revealElements = document.querySelectorAll("[data-aos]");

revealElements.forEach((element) => {
    const animationType = element.getAttribute("data-aos");

    let vars = {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    };

    if (animationType === "fade-right") {
        vars.x = -50;
        vars.y = 0;
    } else if (animationType === "fade-left") {
        vars.x = 50;
        vars.y = 0;
    }

    gsap.from(element, vars);
});

console.log('Portfolio initialized successfully with GSAP animations');
