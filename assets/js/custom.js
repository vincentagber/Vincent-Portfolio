 // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Custom Cursor (Desktop Only)
        if (!('ontouchstart' in window)) {
            const cursor = document.getElementById('customCursor');
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            document.querySelectorAll('a, button, .project-card, .skills-box, .testimonial-card, .case-study-card').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.classList.add('hovered');
                });
                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hovered');
                });
            });
        }

        // Three.js Particle System for Hero Section (Enabled for all devices)
        const heroCanvas = document.getElementById('hero-canvas');
        let heroScene, heroCamera, heroRenderer, heroParticlesMesh;

        heroScene = new THREE.Scene();
        heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true });
        heroRenderer.setSize(window.innerWidth, window.innerHeight);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 3000; // Reduced for better performance
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xc5a147,
            transparent: true,
            opacity: 0.8
        });

        heroParticlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        heroScene.add(heroParticlesMesh);

        heroCamera.position.z = 5;

        const animateHeroParticles = () => {
            requestAnimationFrame(animateHeroParticles);
            heroParticlesMesh.rotation.y += 0.001;
            heroRenderer.render(heroScene, heroCamera);
        };

        animateHeroParticles();

        window.addEventListener('resize', () => {
            heroCamera.aspect = window.innerWidth / window.innerHeight;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(window.innerWidth, window.innerHeight);
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Animation
        gsap.from('.hero-content h1', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: 'power3.out'
        });

        gsap.from('.hero-content p', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            delay: 0.5,
            ease: 'power3.out'
        });

        gsap.from('.hero-content .btn-gold', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 1,
            ease: 'back.out(1.7)',
            onComplete: () => {
                // Ensure button is visible after animation
                document.querySelector('.btn-gold').style.opacity = 1;
            }
        });

        // Section Transitions
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Split Text Animation for Section Titles
        document.querySelectorAll('.section-title').forEach(title => {
            const chars = title.textContent.split('');
            title.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');
            gsap.from(title.querySelectorAll('.char'), {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Tech Stack Animation
        gsap.utils.toArray('.tech-stack-item').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Case Study Animation
        gsap.utils.toArray('.case-study-card').forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Testimonial Animation
        gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Initialize Vanilla Tilt for Project Cards (Desktop Only)
        if (!('ontouchstart' in window)) {
            VanillaTilt.init(document.querySelectorAll('.project-card'), {
                max: 15,
                speed: 400,
                perspective: 1000
            });
        } else {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('touchstart', () => {
                    card.style.transform = 'translateY(-10px)';
                });
            });
        }

        // Back to Top Button
        window.addEventListener('scroll', () => {
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
  
 AOS.init();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-bg'), alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xdddddd, wireframe: true });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  