// Smooth scroll to contact
function scrollToContact() {
  const contact = document.getElementById("contact");
  if (contact) {
    contact.scrollIntoView({ behavior: "smooth" });
  }
}

// Scroll reveal effect
const revealElements = document.querySelectorAll(".scroll-reveal");
window.addEventListener("scroll", () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("revealed");
    }
  });
});

// Counter animation for stats
function animateCounter(id, target) {
  let el = document.getElementById(id);
  if (!el) return;
  let count = 0;
  let step = target / 100;
  let interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(count) + "%";
  }, 20);
}

window.addEventListener("load", () => {
  animateCounter("profitStat", 240);
  animateCounter("costStat", 60);
  animateCounter("leadStat", 320);
});

// Testimonial carousel
const testimonials = document.querySelectorAll(".testimonial-card");
let currentIndex = 0;
setInterval(() => {
  testimonials.forEach((t, i) => {
    t.classList.remove("active");
    if (i === currentIndex) t.classList.add("active");
  });
  currentIndex = (currentIndex + 1) % testimonials.length;
}, 5000);
