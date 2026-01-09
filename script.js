// ================= LOADER =================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1200);
});

// ================= NAVBAR =================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks?.classList.remove('active');
    });
});

// ================= PERFORMANCE FLAGS =================
const isMobile = window.innerWidth < 768;
const supportsFinePointer = window.matchMedia("(pointer:fine)").matches;

// ================= STARFIELD CANVAS =================
const starfield = document.getElementById('starfield');
if (starfield && !isMobile) {
    const ctx = starfield.getContext('2d');
    starfield.width = window.innerWidth;
    starfield.height = window.innerHeight;

    const stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * starfield.width,
        y: Math.random() * starfield.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.4 + 0.1
    }));

    function animateStars() {
        ctx.clearRect(0, 0, starfield.width, starfield.height);
        ctx.fillStyle = '#ffffff';

        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            star.y += star.speed;
            if (star.y > starfield.height) star.y = 0;
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();

    window.addEventListener('resize', () => {
        starfield.width = window.innerWidth;
        starfield.height = window.innerHeight;
    });
}

// ================= NEBULA CANVAS =================
const nebula = document.getElementById('nebula');
if (nebula && !isMobile) {
    const ctx = nebula.getContext('2d');
    nebula.width = window.innerWidth;
    nebula.height = window.innerHeight;

    const particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * nebula.width,
        y: Math.random() * nebula.height,
        radius: Math.random() * 120 + 40,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.25 + 0.05
    }));

    function animateNebula() {
        ctx.clearRect(0, 0, nebula.width, nebula.height);

        particles.forEach(p => {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            gradient.addColorStop(0, `rgba(138, 43, 226, ${p.opacity})`);
            gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < -p.radius) p.x = nebula.width + p.radius;
            if (p.x > nebula.width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = nebula.height + p.radius;
            if (p.y > nebula.height + p.radius) p.y = -p.radius;
        });

        requestAnimationFrame(animateNebula);
    }

    animateNebula();

    window.addEventListener('resize', () => {
        nebula.width = window.innerWidth;
        nebula.height = window.innerHeight;
    });
}

// ================= CURSOR GLOW =================
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && supportsFinePointer) {
    document.addEventListener('mousemove', e => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}

// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(el => {
        if (el.classList.contains('active')) return;

        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 150) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ================= EMAILJS (NO POPUP) =================
(function () {
    emailjs.init("RazAWSjEXY_3CiRB5");
})();

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");

if (form && sendBtn) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        sendBtn.textContent = "Sending...";
        sendBtn.disabled = true;

        emailjs
            .sendForm("service_po9kbgj", "template_xg1zsnl", this)
            .then(() => {
                sendBtn.textContent = "Message Sent ✓";

                setTimeout(() => {
                    sendBtn.textContent = "Send Message";
                    sendBtn.disabled = false;
                }, 2500);

                form.reset();
            })
            .catch(error => {
                console.error("EmailJS Error:", error);
                sendBtn.textContent = "Send Message";
                sendBtn.disabled = false;
                alert("Something went wrong. Please try again later.");
            });
    });
}
