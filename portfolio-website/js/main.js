/**
 * UDAY KIRAN NAKKA - PORTFOLIO INTERACTIVITY SCRIPT
 * Full Vanilla JS: Particle Engine, Terminal Simulator, Filter, Modals, Theme & Copy
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. THEME SWITCHER (DARK / LIGHT)
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('uday_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('uday_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} theme 🌓`);
    });
  }

  // =========================================================================
  // 2. NAVBAR SCROLL & MOBILE MENU
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    highlightNavOnScroll();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Active section scroll indicator
  const sections = document.querySelectorAll('section[id]');
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }

  // =========================================================================
  // 3. TYPEWRITER EFFECT IN HERO
  // =========================================================================
  const typewriterElem = document.getElementById('typewriter');
  if (typewriterElem) {
    const words = [
      "Software Development Engineer",
      "Data Science Enthusiast",
      "Python & Java Developer",
      "Power BI & Analytics Builder",
      "Machine Learning Explorer",
      "Passionate Problem Solver"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const holdDelay = 1800;

    function type() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        typewriterElem.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterElem.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        setTimeout(type, holdDelay);
        return;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, 300);
        return;
      }

      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }

    setTimeout(type, 600);
  }

  // =========================================================================
  // 4. PARTICLE CANVAS ENGINE
  // =========================================================================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // =========================================================================
  // 5. INTERACTIVE CLI / TERMINAL SIMULATOR
  // =========================================================================
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalClearBtn = document.getElementById('terminal-clear');
  const cmdChips = document.querySelectorAll('.cmd-chip');

  const cmdHistoryArray = [];
  let historyPointer = -1;

  const terminalCommands = {
    help: `Available Commands:
  • <span class="term-highlight">skills</span>          - List technical languages, tools, and databases
  • <span class="term-highlight">projects</span>        - View featured development & AI projects
  • <span class="term-highlight">experience</span>      - View internship & professional work history
  • <span class="term-highlight">certifications</span>  - Display verified credentials
  • <span class="term-highlight">education</span>       - View academic degrees and CGPA
  • <span class="term-highlight">contact</span>         - Get email, phone, location & LinkedIn
  • <span class="term-highlight">hire</span>            - Why you should hire Uday Kiran Nakka
  • <span class="term-highlight">clear</span>           - Clear the terminal screen`,

    skills: `<strong>Technical Skills Profile:</strong>
  • <strong>Languages:</strong> Python, Java
  • <strong>Web:</strong> HTML5, CSS3, JavaScript (ES6+)
  • <strong>Databases:</strong> SQL, Relational Schema Design
  • <strong>Data & BI:</strong> Power BI, DAX Measures, ETL Data Modeling
  • <strong>AI/ML & Libs:</strong> TensorFlow, CNNs, Audio Processing, BeautifulSoup, Pandas, NumPy
  • <strong>Developer Tools:</strong> Git, GitHub, Jupyter Notebook, Google Colab, VS Code`,

    projects: `<strong>Featured Projects:</strong>
  1. <span class="term-highlight">Road Accident Protocol System</span> (Python, TensorFlow, CNN)
     - 85% accuracy audio-based accident detection with automated Twilio SMS & GPS dispatch.
  2. <span class="term-highlight">Modular Banking Application</span> (Python, SQL)
     - Account management, deposits, withdrawals, and ACID-compliant transaction records.
  3. <span class="term-highlight">Flipkart Product Review Scraper</span> (Python, BeautifulSoup, Pandas)
     - Automated web scraper converting dynamic e-commerce reviews into structured datasets.`,

    experience: `<strong>Professional Experience:</strong>
  • <strong>Role:</strong> Data Visualization Intern
  • <strong>Company:</strong> Brainovision Solutions Pvt. Ltd. (Jul 2024 – Sep 2024)
  • <strong>Key Tasks:</strong> Built interactive Power BI dashboards, crafted DAX measures & KPIs, cleaned and modeled relational enterprise datasets.`,

    certifications: `<strong>Verified Certifications:</strong>
  1. Python for Data Science
  2. Java Full Stack Development
  3. Power BI Business Intelligence`,

    education: `<strong>Academic Background:</strong>
  • <strong>Degree:</strong> Bachelor of Technology (B.Tech) - Computer Science & Data Science
  • <strong>College:</strong> KKR & KSR Institute of Technology and Sciences, Guntur
  • <strong>CGPA:</strong> 7.82 / 10.0 (Nov 2021 – May 2025)`,

    contact: `<strong>Get In Touch:</strong>
  • <strong>Email:</strong> <a href="mailto:nakkaudaykiran25@gmail.com" class="text-accent">nakkaudaykiran25@gmail.com</a>
  • <strong>Phone:</strong> +91 79893 15411
  • <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/uday-kiran-n" target="_blank" class="text-accent">linkedin.com/in/uday-kiran-n</a>
  • <strong>Location:</strong> Guntur, Andhra Pradesh, India`,

    hire: `<strong>Why Hire Uday Kiran Nakka?</strong>
  ✓ Strong foundation in Data Structures, OOP, Python, and SQL
  ✓ Real-world experience building end-to-end applications and ML pipelines
  ✓ Proven adaptability, fast learning curve, and enthusiastic team player!
  ✓ Available immediately for full-time Software Engineering & Data roles!`,

    about: `Uday Kiran Nakka is a fresh B.Tech Graduate in CS & Data Science (7.82 CGPA) eager to build impactful software systems.`,
    
    sudo: `Permission granted! You now have permission to send an interview invitation 🚀`,
    
    date: () => new Date().toLocaleString()
  };

  function executeCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    cmdHistoryArray.push(cmdRaw);
    historyPointer = cmdHistoryArray.length;

    if (cmd === 'clear') {
      terminalHistory.innerHTML = '';
      return;
    }

    const entry = document.createElement('div');
    entry.className = 'term-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-command-line';
    cmdLine.innerHTML = `<span class="term-prompt">guest@uday-portfolio:~$</span> ${escapeHTML(cmdRaw)}`;
    entry.appendChild(cmdLine);

    const responseLine = document.createElement('div');
    responseLine.className = 'term-response';

    if (terminalCommands[cmd]) {
      const response = terminalCommands[cmd];
      responseLine.innerHTML = typeof response === 'function' ? response() : response;
    } else {
      responseLine.innerHTML = `command not found: <span style="color: #ef4444">${escapeHTML(cmd)}</span>. Type <span class="term-highlight">help</span> for all valid commands.`;
    }

    entry.appendChild(responseLine);
    terminalHistory.appendChild(entry);

    // Scroll to bottom
    const terminalBody = document.getElementById('interactive-terminal');
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      } else if (e.key === 'ArrowUp') {
        if (historyPointer > 0) {
          historyPointer--;
          terminalInput.value = cmdHistoryArray[historyPointer];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyPointer < cmdHistoryArray.length - 1) {
          historyPointer++;
          terminalInput.value = cmdHistoryArray[historyPointer];
        } else {
          historyPointer = cmdHistoryArray.length;
          terminalInput.value = '';
        }
      }
    });
  }

  if (terminalClearBtn) {
    terminalClearBtn.addEventListener('click', () => {
      terminalHistory.innerHTML = '';
      showToast('Terminal history cleared');
    });
  }

  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // =========================================================================
  // 6. PROJECT FILTERING
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-in-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 7. PROJECT MODALS
  // =========================================================================
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtns = document.querySelectorAll('.modal-close');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlays.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = 'auto';
    }
  });

  // =========================================================================
  // 8. 1-CLICK COPY TO CLIPBOARD
  // =========================================================================
  const copyMethodCards = document.querySelectorAll('.contact-method-card[data-copy]');
  copyMethodCards.forEach(card => {
    const copyBtn = card.querySelector('.copy-btn');
    const textToCopy = card.getAttribute('data-copy');

    if (copyBtn && textToCopy) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy} 📋`);
        }).catch(() => {
          showToast(`Unable to copy automatically.`);
        });
      });
    }
  });

  // =========================================================================
  // 9. CONTACT FORM HANDLING
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Construct mailto link
      const mailtoUrl = `mailto:nakkaudaykiran25@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(`Hi Uday,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

      window.location.href = mailtoUrl;
      showToast(`Opening your email client to message Uday... 🚀`);
      contactForm.reset();
    });
  }

  // =========================================================================
  // 10. TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
});
