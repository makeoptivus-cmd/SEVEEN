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
// Replace with your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycby6PyQoLKQga-Cwao9uw0zhLwsNPRrFYIore2GNAO_oHDjQbUJdb7Qky4_3uLwNMw3Spg/exec";

document.getElementById("sheetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const button = form.querySelector("button");
  const originalText = button.textContent;

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    challenge: form.challenge.value.trim()
  };

  button.textContent = "Processing...";
  button.disabled = true;

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const response = await res.json();

    if (response.result === "success") {
      button.textContent = "Submitted ✓";
      form.reset();
    } else {
      button.textContent = "Error: " + response.error;
    }
  } catch (err) {
    button.textContent = "Error: " + err.message;
  }

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 3000);
});

