// Scroll reveal
const reveals = document.querySelectorAll(".scroll-reveal");
window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("revealed");
    }
  });
});

// Stats counter
function animateStat(id, target) {
  let el = document.getElementById(id);
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
  animateStat("profitStat", 240);
  animateStat("costStat", 60);
  animateStat("leadStat", 320);
});

// Testimonial carousel auto switch
const testimonials = document.querySelectorAll(".testimonial-card");
let current = 0;
setInterval(() => {
  testimonials[current].classList.remove("active");
  current = (current + 1) % testimonials.length;
  testimonials[current].classList.add("active");
}, 5000);
