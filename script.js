document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const progress = document.querySelector(".progress");
let ticking = false;
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + "%";
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress);
    ticking = true;
  }
}, { passive: true });
updateProgress();


// Add a subtle pointer-responsive effect to project mockups (desktop only).
if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.project-visual').forEach(card => {
    const mockup = card.querySelector('.project-browser');
    if (!mockup) return;
    card.addEventListener('pointermove', event => {
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - .5;
      const y = (event.clientY - r.top) / r.height - .5;
      mockup.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
      mockup.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      mockup.style.setProperty('--tilt-x', '0deg');
      mockup.style.setProperty('--tilt-y', '0deg');
    });
  });
}
