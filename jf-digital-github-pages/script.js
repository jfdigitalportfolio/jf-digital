// Add a business email address here when you're ready to receive enquiries.
// Example: const BUSINESS_EMAIL = "hello@yourdomain.co.uk";
const BUSINESS_EMAIL = "";

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

const contactButton = document.getElementById("copy-email");
if (BUSINESS_EMAIL) {
  contactButton.disabled = false;
  contactButton.innerHTML = 'EMAIL JF DIGITAL <span aria-hidden="true">↗</span>';
  document.getElementById("contact-status").textContent = "Click to open your email app and tell me about your project.";
  contactButton.addEventListener("click", () => {
    window.location.href = "mailto:" + BUSINESS_EMAIL + "?subject=" + encodeURIComponent("Website enquiry — JF Digital");
  });
}
