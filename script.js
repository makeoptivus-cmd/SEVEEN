// Create floating particles
function createParticles() {
  const container = document.querySelector('.particle-container');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    container.appendChild(particle);
  }
}

// Scroll reveal
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      if (entry.target.id === 'results') { animateStats(); }
    }
  });
}, observerOptions);
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// Animate statistics
function animateStats() {
  animateStat('profitStat', 0, 247, '%', 2000);
  animateStat('costStat', 0, 58, '%', 2000);
  animateStat('leadStat', 0, 312, '%', 2000);
}
function animateStat(id, start, end, suffix, duration) {
  const element = document.getElementById(id);
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) { current = end; clearInterval(timer); }
    element.textContent = Math.floor(current) + suffix;
  }, 16);
}

// Testimonial carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
  testimonials.forEach((card, i) => { card.classList.toggle('active', i === index); });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.classList.toggle('bg-blue-400', i === index);
    dot.classList.toggle('bg-gray-600', i !== index);
  });
  currentTestimonial = index;
}
if (testimonials.length > 0) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 8000);
}

// ====== FORM SUBMISSION TO GOOGLE SHEETS ======
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    challenge: form.querySelector('textarea').value,
  };

  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Processing...';
  button.disabled = true;

  fetch("https://script.google.com/macros/s/AKfycbyMFABdGXbgY_hoLXTSJQKvf3VwwCI5sti4H3yWQZkDb1Td6h_hxicWZ-SsYHvznvd_UA/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(response => {
      console.log("Google Sheets response:", response);
      button.textContent = 'Transformation Initiated ✓';
      button.style.background = 'linear-gradient(135deg, #39ff14 0%, #00d4ff 100%)';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 3000);
    })
    .catch(err => {
      console.error("Error:", err);
      button.textContent = 'Error, Try Again';
      button.disabled = false;
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.parallax-element').forEach((el, index) => {
    const speed = (index + 1) * 0.1;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => { createParticles(); });


