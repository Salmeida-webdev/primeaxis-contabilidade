/* ========================================
   LOADER
======================================== */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1800);
});

/* ========================================
   HEADER SCROLL
======================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ========================================
   MOBILE MENU
======================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* ========================================
   ACTIVE MENU
======================================== */

const sections = document.querySelectorAll("section[id]");

function activeMenu() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activeMenu);

/* ========================================
   COUNTERS
======================================== */

const counters = document.querySelectorAll("[data-counter]");

let counterStarted = false;

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);

    let current = 0;

    const increment = Math.ceil(target / 80);

    function updateCounter() {
      current += increment;

      if (current >= target) {
        counter.textContent = target;
        return;
      }

      counter.textContent = current;

      requestAnimationFrame(updateCounter);
    }

    updateCounter();
  });
}

window.addEventListener("scroll", () => {
  const heroStats = document.querySelector(".hero-stats");

  if (!heroStats || counterStarted) return;

  const statsTop = heroStats.getBoundingClientRect().top;

  if (statsTop < window.innerHeight - 80) {
    startCounters();
    counterStarted = true;
  }
});

/* ========================================
   FAQ ACCORDION
======================================== */

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");

  if (item.classList.contains("active")) {
    body.style.maxHeight = body.scrollHeight + "px";
  }

  header.addEventListener("click", () => {
    accordionItems.forEach((otherItem) => {
      const otherBody = otherItem.querySelector(".accordion-body");

      if (otherItem !== item) {
        otherItem.classList.remove("active");
        otherBody.style.maxHeight = null;
      }
    });

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = null;
    }
  });
});

/* ========================================
   TESTIMONIALS
======================================== */

const testimonialCards = document.querySelectorAll(".testimonial-card");

const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");

let testimonialIndex = 0;

function updateTestimonials() {
  testimonialCards.forEach((card, index) => {
    card.classList.remove("active");

    if (index === testimonialIndex) {
      card.classList.add("active");
    }
  });
}

if (prevTestimonial && nextTestimonial) {
  prevTestimonial.addEventListener("click", () => {
    testimonialIndex--;

    if (testimonialIndex < 0) {
      testimonialIndex = testimonialCards.length - 1;
    }

    updateTestimonials();
  });

  nextTestimonial.addEventListener("click", () => {
    testimonialIndex++;

    if (testimonialIndex >= testimonialCards.length) {
      testimonialIndex = 0;
    }

    updateTestimonials();
  });
}

/* ========================================
   BACK TO TOP
======================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ========================================
   SMOOTH LINKS
======================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.length <= 1) return;

    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
