// ===== LOADER =====
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ===== NAVBAR =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if(navLinks) navLinks.classList.remove('active');
        }
    });
});

// ===== STARFIELD ANIMATION =====
const starfield = document.getElementById('starfield');
if(starfield) {
    const ctx = starfield.getContext('2d');
    starfield.width = window.innerWidth;
    starfield.height = window.innerHeight;

    const stars = [];
    for(let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starfield.width,
            y: Math.random() * starfield.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, starfield.width, starfield.height);
        ctx.fillStyle = 'white';
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            
            star.y += star.speed;
            if(star.y > starfield.height) star.y = 0;
        });
        
        requestAnimationFrame(animateStars);
    }
    animateStars();

    window.addEventListener('resize', () => {
        starfield.width = window.innerWidth;
        starfield.height = window.innerHeight;
    });
}

// ===== NEBULA CANVAS =====
const nebula = document.getElementById('nebula');
if(nebula) {
    const ctx2 = nebula.getContext('2d');
    nebula.width = window.innerWidth;
    nebula.height = window.innerHeight;

    let particles = [];
    for(let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * nebula.width,
            y: Math.random() * nebula.height,
            radius: Math.random() * 100 + 50,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.3
        });
    }

    function animateNebula() {
        ctx2.clearRect(0, 0, nebula.width, nebula.height);
        
        particles.forEach(p => {
            const gradient = ctx2.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            gradient.addColorStop(0, `rgba(138, 43, 226, ${p.opacity})`);
            gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
            
            ctx2.fillStyle = gradient;
            ctx2.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if(p.x < -p.radius) p.x = nebula.width + p.radius;
            if(p.x > nebula.width + p.radius) p.x = -p.radius;
            if(p.y < -p.radius) p.y = nebula.height + p.radius;
            if(p.y > nebula.height + p.radius) p.y = -p.radius;
        });
        
        requestAnimationFrame(animateNebula);
    }
    animateNebula();

    window.addEventListener('resize', () => {
        nebula.width = window.innerWidth;
        nebula.height = window.innerHeight;
    });
}

// ===== CURSOR GLOW =====
const cursorGlow = document.querySelector('.cursor-glow');
if(cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
function checkReveal() {
    reveals.forEach(element => {
        const top = element.getBoundingClientRect().top;
        const visible = 150;
        if(top < window.innerHeight - visible) {
            element.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkReveal);
checkReveal();

// ===== EMAILJS (Contact Form) =====
(function(){
    emailjs.init("RazAWSjEXY_3CiRB5");
})();

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const popup = document.getElementById("popup");

if(form && sendBtn) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        sendBtn.textContent = "Sending...";
        sendBtn.classList.add("loading");

        emailjs.sendForm("service_po9kbgj", "template_xg1zsnl", this)
            .then(function() {
                sendBtn.textContent = "Send Message";
                sendBtn.classList.remove("loading");

                if(popup) {
                    popup.classList.add("show");
                    setTimeout(() => popup.classList.remove("show"), 3000);
                }

                form.reset();
            }, function(error) {
                sendBtn.textContent = "Send Message";
                sendBtn.classList.remove("loading");
                alert("❌ Failed to send message. Check console.");
                console.error("EmailJS error:", error);
            });
    });
}