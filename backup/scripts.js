gsap.registerPlugin(ScrollTrigger);

gsap.to('.parallax-layer', {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
        trigger: 'body',
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

const parallaxLayer = document.querySelector('.parallax-layer');
const heroContent = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    gsap.to(parallaxLayer, {
        x: x * 0.3,
        y: y * 0.3,
        ease: "power2.out",
        duration: 0.3
    });

    gsap.to(heroContent, {
        x: x * 0.5,
        y: y * 0.5,
        ease: "power2.out",
        duration: 0.3
    });
});

gsap.to('.hero-content', {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
        trigger: '.hero',
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: false
    }
});

gsap.to('.background-video', {
    opacity: 0.4,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.utils.toArray('.collection-card').forEach((card, i) => {
    gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.collection-image'), {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener('touchstart', () => {
        gsap.to(card.querySelector('.collection-image'), {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.collection-image'), {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener('touchend', () => {
        gsap.to(card.querySelector('.collection-image'), {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        gsap.to(element, {
            borderColor: '#A68B6B',
            duration: 0.3
        });
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

document.querySelectorAll('.collection-image').forEach(image => {
    image.classList.add('loading');
    
    const style = window.getComputedStyle(image);
    const bgUrl = style.backgroundImage.replace(/url\(['"](.*)['"]\)/, '$1');
    
    const preloadImage = new Image();
    preloadImage.src = bgUrl;
    
    preloadImage.onerror = () => {
        image.style.backgroundImage = 'linear-gradient(45deg, var(--dark) 0%, var(--darker) 100%)';
        image.style.opacity = '0.7';
        image.classList.remove('loading');
    };

    preloadImage.onload = () => {
        image.classList.remove('loading');
        image.style.opacity = '1';
    };
});