// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Skill bar animation on scroll
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// Fade in on scroll
const fadeEls = document.querySelectorAll('.project-card, .stat-card, .skill-category, .contact-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// EmailJS init
emailjs.init('atYrY32DQffHnZ8JA');

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;

  emailjs.sendForm('service_jhypz6f', 'template_4wb6fwj', e.target)
    .then(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
      btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
      e.target.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      btn.innerHTML = '<i class="fas fa-times"></i> Gagal Mengirim';
      btn.style.background = 'linear-gradient(135deg, #ff4444, #ff6666)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = scrollY >= top && scrollY < top + height ? 'var(--primary)' : '';
    }
  });
});
