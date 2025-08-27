// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYeSu2BDMpdQ042B07l6y_a4g1GeJl8Yk",
  authDomain: "optivus-b179b.firebaseapp.com",
  databaseURL: "https://optivus-b179b-default-rtdb.firebaseio.com",
  projectId: "optivus-b179b",
  storageBucket: "optivus-b179b.firebasestorage.app",
  messagingSenderId: "475218201986",
  appId: "1:475218201986:web:d8b3e299b670b654a5539b",
  measurementId: "G-QMRV28NFK6"
};

//intalze frebase
firebase.initializeApp(firebaseConfig);

//referance database
var contactFormDB = firebase.database().ref("contactForm");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  // Optional: Reset form after submission
  document.getElementById("contactForm").reset();
}

// Save messages to Firebase
const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();
  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
    createdAt: new Date().toISOString()
  });
};

// Get values by ID
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

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
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 8000);

// Form submission
function handleSubmit(event) {
  event.preventDefault();
  const button = event.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Processing...';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = 'Transformation Initiated ✓';
    button.style.background = 'linear-gradient(135deg, #39ff14 0%, #00d4ff 100%)';
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.style.background = 'linear-gradient(135deg, #00d4ff 0%, #39ff14 100%)';
      event.target.reset();
    }, 3000);
  }, 2000);
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
