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
  initCyberArcadeGame();
  initBotChatTerminal();
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

/* --------------------------------------------------------------------------
   6. Playable Cyber Quest Arcade Mini-Game
   -------------------------------------------------------------------------- */
function initCyberArcadeGame() {
  const canvas = document.getElementById("arcadeCanvas");
  const overlay = document.getElementById("gameOverlay");
  const btnStart = document.getElementById("btnStartGame");
  const scoreDisplay = document.getElementById("gameScore");
  const livesDisplay = document.getElementById("gameLives");
  const rankDisplay = document.getElementById("gameRank");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayDesc = document.getElementById("overlayDesc");
  const btnLeft = document.getElementById("btnMoveLeft");
  const btnRight = document.getElementById("btnMoveRight");
  const btnSound = document.getElementById("btnToggleSound");

  if (!canvas || !overlay || !btnStart) return;

  const ctx = canvas.getContext("2d");
  const W = 800;
  const H = 380;
  canvas.width = W;
  canvas.height = H;

  // Web Audio Synth
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playSynth(freq, type, dur, ramp) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      if (ramp) {
        osc.frequency.exponentialRampToValueAtTime(ramp, audioCtx.currentTime + dur);
      }
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }

  if (btnSound) {
    btnSound.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      btnSound.textContent = soundEnabled ? "🔊 SOUND FX" : "🔇 MUTED";
    });
  }

  // Game State
  let isPlaying = false;
  let score = 0;
  let lives = 3;
  let playerX = W / 2;
  const playerY = H - 42;
  const playerWidth = 56;
  const playerHeight = 26;
  let moveLeft = false;
  let moveRight = false;

  let items = [];
  let floatingTexts = [];
  let burstParticles = [];
  let spawnTimer = 0;
  let animationId = null;

  const techDefs = [
    { label: "DJANGO", color: "#00F5A0", xp: 10 },
    { label: "PYTHON", color: "#00F2FE", xp: 10 },
    { label: "MYSQL", color: "#38BDF8", xp: 10 },
    { label: "ESP32", color: "#FBBF24", xp: 15 },
    { label: "FLUTTER", color: "#A855F7", xp: 10 },
    { label: "OLLAMA AI", color: "#C084FC", xp: 20 }
  ];

  const bugDefs = [
    { label: "MEMORY LEAK", color: "#EF4444" },
    { label: "NULL POINTER", color: "#F43F5E" },
    { label: "INJECTION", color: "#DC2626" }
  ];

  // Keyboard Handlers
  window.addEventListener("keydown", (e) => {
    if (!isPlaying) return;
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
      moveLeft = true;
      e.preventDefault();
    }
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      moveRight = true;
      e.preventDefault();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") moveLeft = false;
    if (e.code === "ArrowRight" || e.code === "KeyD") moveRight = false;
  });

  // Touch / Mobile Controls
  if (btnLeft && btnRight) {
    const bindPress = (el, setVal) => {
      el.addEventListener("mousedown", (e) => { e.preventDefault(); setVal(true); });
      el.addEventListener("mouseup", (e) => { e.preventDefault(); setVal(false); });
      el.addEventListener("mouseleave", (e) => { e.preventDefault(); setVal(false); });
      el.addEventListener("touchstart", (e) => { e.preventDefault(); setVal(true); });
      el.addEventListener("touchend", (e) => { e.preventDefault(); setVal(false); });
    };
    bindPress(btnLeft, (v) => { moveLeft = v; });
    bindPress(btnRight, (v) => { moveRight = v; });
  }

  // Mouse hover follow on canvas
  canvas.addEventListener("mousemove", (e) => {
    if (!isPlaying) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mouseCanvasX = (e.clientX - rect.left) * scaleX;
    playerX = Math.max(playerWidth / 2, Math.min(W - playerWidth / 2, mouseCanvasX));
  });

  function startMission() {
    isPlaying = true;
    score = 0;
    lives = 3;
    playerX = W / 2;
    moveLeft = false;
    moveRight = false;
    items = [];
    floatingTexts = [];
    burstParticles = [];
    spawnTimer = 0;

    scoreDisplay.textContent = score;
    livesDisplay.textContent = "⚡⚡⚡";
    rankDisplay.textContent = "NOVICE";
    overlay.classList.add("hidden");

    initAudio();
    playSynth(440, "sine", 0.15, 880);

    if (animationId) cancelAnimationFrame(animationId);
    gameLoop();
  }

  btnStart.addEventListener("click", startMission);

  function gameOver() {
    isPlaying = false;
    playSynth(220, "sawtooth", 0.4, 55);
    overlayTitle.textContent = "MISSION COMPLETE // ARCHIVE LOGGED";
    overlayDesc.innerHTML = `You collected <strong>${score} XP</strong>! Player Rank: <strong>${rankDisplay.textContent}</strong>.<br/>Kishore's full architectural dossier is fully unlocked.`;
    btnStart.querySelector("span").textContent = "REPLAY MISSION";
    overlay.classList.remove("hidden");
  }

  function gameLoop() {
    if (!isPlaying) return;

    // 1. Move Player
    const speed = 7.5;
    if (moveLeft) playerX = Math.max(playerWidth / 2, playerX - speed);
    if (moveRight) playerX = Math.min(W - playerWidth / 2, playerX + speed);

    // 2. Spawn Items
    spawnTimer++;
    const spawnInterval = Math.max(28, 55 - Math.floor(score / 30));
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0;
      const isBug = Math.random() < 0.35;
      const x = Math.random() * (W - 80) + 40;
      const fallSpeed = 2.4 + Math.min(3.5, score / 60);

      if (isBug) {
        const def = bugDefs[Math.floor(Math.random() * bugDefs.length)];
        items.push({ x, y: -20, isBug: true, label: def.label, color: def.color, speed: fallSpeed * 1.15 });
      } else {
        const def = techDefs[Math.floor(Math.random() * techDefs.length)];
        items.push({ x, y: -20, isBug: false, label: def.label, color: def.color, xp: def.xp, speed: fallSpeed });
      }
    }

    // 3. Update & Collision
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed;

      // Check Collision with Player Drone
      const hitX = Math.abs(it.x - playerX) < (playerWidth / 2 + 18);
      const hitY = Math.abs(it.y - playerY) < (playerHeight / 2 + 14);

      if (hitX && hitY) {
        if (it.isBug) {
          lives--;
          playSynth(140, "sawtooth", 0.2, 70);
          floatingTexts.push({ x: it.x, y: it.y, text: "-1 SHIELD!", color: "#EF4444", life: 30 });
          for (let p = 0; p < 8; p++) {
            burstParticles.push({
              x: it.x, y: it.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              color: "#EF4444", life: 25
            });
          }
          if (lives === 2) livesDisplay.textContent = "⚡⚡";
          else if (lives === 1) livesDisplay.textContent = "⚡";
          else if (lives <= 0) {
            livesDisplay.textContent = "CRITICAL";
            gameOver();
            return;
          }
        } else {
          score += it.xp;
          playSynth(580, "sine", 0.12, 920);
          floatingTexts.push({ x: it.x, y: it.y, text: `+${it.xp} XP`, color: it.color, life: 30 });
          for (let p = 0; p < 10; p++) {
            burstParticles.push({
              x: it.x, y: it.y,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              color: it.color, life: 25
            });
          }
          scoreDisplay.textContent = score;

          // Rank Check
          if (score >= 180) rankDisplay.textContent = "MASTER ARCHITECT ⭐";
          else if (score >= 100) rankDisplay.textContent = "SYSTEMS ARCHITECT";
          else if (score >= 40) rankDisplay.textContent = "FULL-STACK DEV";
        }
        items.splice(i, 1);
        continue;
      }

      // Offscreen
      if (it.y > H + 30) {
        items.splice(i, 1);
      }
    }

    // 4. Render Canvas
    ctx.clearRect(0, 0, W, H);

    // Subtle Grid Lines
    ctx.strokeStyle = "rgba(0, 242, 254, 0.05)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, H);
      ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 40) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy);
      ctx.stroke();
    }

    // Render Items
    items.forEach((it) => {
      ctx.save();
      ctx.translate(it.x, it.y);

      if (it.isBug) {
        // Red Bug Obstacle
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.strokeStyle = it.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("BUG", 0, 0);
      } else {
        // Glowing Tech Capsule
        ctx.fillStyle = "rgba(0, 242, 254, 0.12)";
        ctx.strokeStyle = it.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-26, -11, 52, 22, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = it.color;
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(it.label, 0, 0);
      }
      ctx.restore();
    });

    // Render Burst Particles
    for (let p = burstParticles.length - 1; p >= 0; p--) {
      const pt = burstParticles[p];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life--;
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = Math.max(0, pt.life / 25);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      if (pt.life <= 0) burstParticles.splice(p, 1);
    }

    // Render Floating Text
    for (let f = floatingTexts.length - 1; f >= 0; f--) {
      const ft = floatingTexts[f];
      ft.y -= 1.2;
      ft.life--;
      ctx.fillStyle = ft.color;
      ctx.font = "bold 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.globalAlpha = Math.max(0, ft.life / 30);
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.globalAlpha = 1;
      if (ft.life <= 0) floatingTexts.splice(f, 1);
    }

    // Render AURA-01 Drone Player
    ctx.save();
    ctx.translate(playerX, playerY);

    // Plasma Thrusters
    ctx.fillStyle = "#00F2FE";
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(0, 24 + Math.sin(Date.now() / 60) * 4);
    ctx.lineTo(10, 10);
    ctx.closePath();
    ctx.fill();

    // Orbital Ring
    ctx.strokeStyle = "rgba(127, 0, 255, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 36, 12, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Drone Chassis
    ctx.fillStyle = "#0F1A33";
    ctx.strokeStyle = "#00F2FE";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-24, -12, 48, 24, 10);
    ctx.fill();
    ctx.stroke();

    // Visor & Twin Cyan Eyes
    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.roundRect(-15, -6, 30, 12, 5);
    ctx.fill();

    ctx.fillStyle = "#00F2FE";
    ctx.beginPath();
    ctx.arc(-7, 0, 3, 0, Math.PI * 2);
    ctx.arc(7, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    animationId = requestAnimationFrame(gameLoop);
  }
}

/* --------------------------------------------------------------------------
   7. AI Bot Companion Dialogue Sandbox Terminal
   -------------------------------------------------------------------------- */
function initBotChatTerminal() {
  const tabs = document.querySelectorAll(".bot-tab");
  const avatarBadge = document.getElementById("activeBotAvatar");
  const outputBox = document.getElementById("botTerminalOutput");
  const chips = document.querySelectorAll(".prompt-chip");

  if (!tabs.length || !avatarBadge || !outputBox) return;

  let currentBot = "aura";

  const botConfig = {
    aura: {
      name: "🤖 AURA-01",
      title: "Architecture & System Companion",
      intro: "[AURA-01 ONLINE] Core System Companion connected. I oversee Kishore's multi-tenant Django architectures, API systems, and full-stack orchestration.",
      answers: {
        mentrix: "Mentrix is Kishore's flagship institutional mentoring ecosystem. Built with Django 5.x and MySQL, it is actively deployed on the college server domain. Features four distinct user roles, Google OAuth2 domain lock, single-session concurrency protection, and on-premise Ollama LLM inference ensuring zero academic data leakage.",
        robotics: "PuriBot / EcoBreath combines hardware and mobile systems: an ESP32 microcontroller continuously reads ambient air particulate (PM2.5) and hazardous gases, streaming telemetry to a native Java Android controller for live dashboarding and omnidirectional motor drive.",
        research: "Kishore has published 2 peer-reviewed international conference papers: (1) 'Revolutionizing Healthcare: The Integration of Robotics in Medicine' at DeNovo23, and (2) 'Examining the Impact of Artificial Intelligence on Personalized Healthcare' at Bharata Mata College (ISBN: 978-81-973274-9-0).",
        security: "Enterprise security architecture in Kishore's platforms includes: Domain-Restricted Google OAuth2, Single-Session Concurrency Guards that prevent parallel compromised sessions, OTP-based recovery, and strict input sanitization.",
        hire: "Kishore M is an MCA Candidate at Rajagiri College of Social Sciences (Autonomous) with an undergrad BCA CGPA of 8.78. He is available for Full-Stack, Backend (Django/Python), and IoT/Mobile engineering opportunities. Reach him directly via LinkedIn (linkedin.com/in/kishorem2004) or email (kishor.mullappilly@gmail.com)."
      }
    },
    puribot: {
      name: "📡 CYBER-PURIBOT",
      title: "Embedded IoT & Robotics Unit",
      intro: "[PURIBOT ONLINE] Telemetry link synchronized. I specialize in ESP32 embedded firmware, particulate sensing, and Android motor drive controllers.",
      answers: {
        mentrix: "While Mentrix handles cloud web administration, its architecture principles mirror my hardware fail-safes: isolated processes and atomic state verification.",
        robotics: "My hardware chassis incorporates an ESP32 board paired with precision particulate (PM2.5) and gas detectors. An H-bridge motor driver translates wireless Bluetooth/Wi-Fi packets from the Android app into directional navigation.",
        research: "Kishore's research paper 'Revolutionizing Healthcare: The Integration of Robotics in Medicine' laid the foundation for my physical robotic navigation and automated hazard remediation systems.",
        security: "Hardware wireless packets are checksum-verified before executing motor driver instructions to prevent signal spoofing.",
        hire: "Kishore is skilled in low-level microcontrollers (ESP32, C/C++) as well as high-level Android Java control systems. Connect with him at kishor.mullappilly@gmail.com."
      }
    },
    vex: {
      name: "🛡️ NEO-VEX",
      title: "Security Sentinel & Concurrency Guard",
      intro: "[NEO-VEX ONLINE] Security perimeter established. I enforce domain-restricted OAuth2, RBAC role-switching logic, and concurrency locks.",
      answers: {
        mentrix: "Security report on Mentrix: Zero cross-tenant data bleed. The Single-Session Concurrency Guard invalidates prior session tokens immediately upon new login. Domain lock ensures only verified institutional accounts can enter.",
        robotics: "In the robotics system, fail-safe timeouts ensure the robot halts propulsion immediately if wireless packet loss exceeds threshold limits.",
        research: "Both of Kishore's published research papers emphasize data privacy and ethical safety guidelines in automated robotics and clinical AI.",
        security: "Key defensive mechanisms: Role-Based Access Control (RBAC), CSRF protection, salted cryptographic password hashes, and OTP authentication workflows.",
        hire: "Looking for an engineer who builds security into architecture from day one? Kishore M brings proven enterprise-grade defensive practices. Check his GitHub or connect on LinkedIn."
      }
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentBot = tab.dataset.bot;
      const bot = botConfig[currentBot];
      avatarBadge.textContent = bot.name;
      typeWriter(`<code>[${bot.name} SYNC]</code> ${bot.intro}`);
    });
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.query;
      const bot = botConfig[currentBot];
      const answer = bot.answers[q] || "Query logged. Telemetry records verified.";
      typeWriter(`<strong>Query:</strong> "${chip.textContent}"<br/><br/><code>[RESPONSE]</code> ${answer}`);
    });
  });

  let typeInterval = null;
  function typeWriter(htmlContent) {
    if (typeInterval) clearInterval(typeInterval);
    outputBox.innerHTML = "";
    
    // Quick display with pulse
    outputBox.style.opacity = "0.4";
    setTimeout(() => {
      outputBox.innerHTML = `<p>${htmlContent}</p>`;
      outputBox.style.opacity = "1";
    }, 120);
  }
}
