/**
 * Next-Gen AI Developer Universe Controller
 * Client: Kishore M (@KishoreM-04)
 * Features: AI Companion Eye Tracking, Dynamic Speech Engine, Particle Constellations & 3D Tilt
 */

document.addEventListener("DOMContentLoaded", () => {
  initParticleCanvas();
  initAuraCompanion();
  initHoverTelemetry();
  initCardTilt();
  initMobileNav();
  initNavbarScroll();
});

/* --------------------------------------------------------------------------
   1. Signature AI Companion "AURA-01" Interactive Engine
   -------------------------------------------------------------------------- */
function initAuraCompanion() {
  const pupilLeft = document.getElementById("auraPupilLeft");
  const pupilRight = document.getElementById("auraPupilRight");
  const botContainer = document.getElementById("auraBot");

  if (!pupilLeft || !pupilRight || !botContainer) return;

  const defaultLeft = { x: 125, y: 134 };
  const defaultRight = { x: 175, y: 134 };
  const maxRadius = 4.5;

  window.addEventListener("mousemove", (e) => {
    const rect = botContainer.getBoundingClientRect();
    const botCenterX = rect.left + rect.width / 2;
    const botCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - botCenterX;
    const dy = e.clientY - botCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      const moveX = (dx / dist) * Math.min(dist / 60, maxRadius);
      const moveY = (dy / dist) * Math.min(dist / 60, maxRadius);

      pupilLeft.setAttribute("cx", defaultLeft.x + moveX);
      pupilLeft.setAttribute("cy", defaultLeft.y + moveY);

      pupilRight.setAttribute("cx", defaultRight.x + moveX);
      pupilRight.setAttribute("cy", defaultRight.y + moveY);
    }
  });

  // Natural Blinking Cycle
  setInterval(() => {
    pupilLeft.style.opacity = "0";
    pupilRight.style.opacity = "0";
    setTimeout(() => {
      pupilLeft.style.opacity = "1";
      pupilRight.style.opacity = "1";
    }, 180);
  }, 4500);
}

// Global Companion Speech Actions
function speakAura(text) {
  const speechText = document.getElementById("auraSpeechText");
  if (!speechText) return;

  speechText.style.opacity = "0";
  setTimeout(() => {
    speechText.textContent = text;
    speechText.style.opacity = "1";
  }, 120);
}

function triggerAuraGreeting() {
  speakAura("Hello there! I am AURA-01. I monitor Kishore's systems, code repositories, and telemetry matrices.");
}

function triggerAuraStatus() {
  speakAura("Diagnostics: 11 repositories synchronized · Mentrix deployed · EcoBreath robot online · 0 vulnerabilities.");
}

function triggerAuraResearch() {
  speakAura("Accessing Research Matrix: 2 published conference papers on Medical Robotics and AI Personalized Healthcare.");
}

/* --------------------------------------------------------------------------
   2. Contextual Telemetry Hover Reaction
   -------------------------------------------------------------------------- */
function initHoverTelemetry() {
  const auraElements = document.querySelectorAll("[data-aura]");
  auraElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const message = el.getAttribute("data-aura");
      if (message) speakAura(message);
    });
  });
}

/* --------------------------------------------------------------------------
   3. Interactive 3D Card Tilt
   -------------------------------------------------------------------------- */
function initCardTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const tiltCards = document.querySelectorAll(".project-art-card, .control-panel-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

/* --------------------------------------------------------------------------
   4. Interactive Canvas Particle Constellation
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 15000), 75);

  const mouse = { x: null, y: null, radius: 130 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.6;
          this.y -= Math.sin(angle) * force * 1.6;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(127, 0, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   5. Mobile Navigation & Navbar Scroll
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.style.background = "rgba(4, 8, 20, 0.95)";
      navbar.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.6)";
    } else {
      navbar.style.background = "rgba(4, 8, 20, 0.8)";
      navbar.style.boxShadow = "none";
    }
  });
}
