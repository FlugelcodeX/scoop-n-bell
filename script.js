/* =============================================================
   JS — SCOOP N BELL ICE CREAM

   Handles:
   - Mobile navigation
   - Sticky header
   - Active navigation links
   - Scroll reveal animations
   - Back-to-top button
   - Dynamic copyright year

   Small script. Big scoop energy. 🍦
   ============================================================= */

/* =============================================================
   01. ELEMENT REFERENCES
   ============================================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const sections = document.querySelectorAll("section[id]");

/* =============================================================
   02. MOBILE NAVIGATION
   ============================================================= */

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);

    document.body.classList.toggle("menu-open", isOpen);
  });
}

/* =============================================================
   03. CLOSE MOBILE NAVIGATION
   ============================================================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");

    menuToggle.classList.remove("open");

    document.body.classList.remove("menu-open");
  });
});

/* =============================================================
   04. STICKY HEADER
   ============================================================= */

function handleHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeader);

handleHeader();

/* =============================================================
   05. ACTIVE NAVIGATION
   ============================================================= */

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 180;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);

/* =============================================================
   06. SCROLL REVEAL
   ============================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =============================================================
   07. BACK TO TOP
   ============================================================= */

function handleBackToTop() {
  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", handleBackToTop);

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =============================================================
   08. DYNAMIC COPYRIGHT YEAR
   ============================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =============================================================
   09. FLAVOR BUTTON INTERACTION
   ============================================================= */

const flavorButtons = document.querySelectorAll(".flavor-button");

flavorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const flavorName = button
      .closest(".flavor-card")
      .querySelector("h3").textContent;

    const message = `Hi Scoop N Bell! I'd like to know more about your ${flavorName} flavor.`;

    const messengerUrl = `https://m.me/?ref=${encodeURIComponent(message)}`;

    window.open(messengerUrl, "_blank");
  });
});

/* =============================================================
   10. IMAGE FALLBACK
   If the supplied promotional image hasn't been added yet,
   the franchise section won't completely break visually.
   ============================================================= */

const franchiseImage = document.querySelector(".franchise-image-wrapper img");

if (franchiseImage) {
  franchiseImage.addEventListener("error", () => {
    franchiseImage.style.display = "none";

    const wrapper = franchiseImage.parentElement;

    wrapper.classList.add("image-missing");
  });
}

/* =============================================================
   11. REDUCE MOTION ACCESSIBILITY
   ============================================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (prefersReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = "auto";
}
