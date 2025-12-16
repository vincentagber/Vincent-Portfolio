import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTimeline
    .to(".reveal-hero", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        delay: 0.2
    });

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
        menuToggle.innerHTML = '<i class="fas fa-times text-2xl"></i>';
    } else {
        mobileMenu.style.transform = "translateX(100%)";
        document.body.style.overflow = "";
        menuToggle.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
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
