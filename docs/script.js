/**
 * Interactive Particle System & Portfolio Controller
 * Client: Kishore M (@KishoreM-04)
 */

document.addEventListener("DOMContentLoaded", () => {
  initParticleCanvas();
  initProjectFilters();
  initMobileNav();
  initNavbarScroll();
});

/* --------------------------------------------------------------------------
   1. Interactive Particle Constellation Canvas
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  // Check reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 16000), 65);

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

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
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse Repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.8;
          this.y -= Math.sin(angle) * force * 1.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.baseAlpha})`;
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

      // Draw subtle connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(127, 0, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Project Filter Mechanism
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          card.style.opacity = "0";
          card.style.transform = "scale(0.97)";
          setTimeout(() => {
            card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 30);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Toggle
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

/* --------------------------------------------------------------------------
   4. Navbar Scroll Glass State
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.style.background = "rgba(7, 11, 20, 0.92)";
      navbar.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.5)";
    } else {
      navbar.style.background = "rgba(7, 11, 20, 0.75)";
      navbar.style.boxShadow = "none";
    }
  });
}
