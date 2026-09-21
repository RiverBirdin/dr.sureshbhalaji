/**
 * Site Configuration
 * Central place to update images, contact details, and placeholders.
 * Replace placeholder values before production deployment.
 */
const siteConfig = {
  doctor: {
    displayName: "Dr. S. Sureshbhalaji",
    brandName: "Dr. Sureshbhalaji",
    qualifications: "MS, DNB, MCh – Urology",
    title: "Consultant Urologist & Andrologist",
    subtitle: "Laparoscopic & Renal Transplant Surgeon",
  },

  contact: {
    phone: "+91 94422 94141",
    whatsapp: "919442294141",
    email: "drsureshbhalaji@gmail.com",
    address: "Dhanalakshmi Srinivasan Medical College, Perambalur",
    timings: "Multiple consultation locations — see locations for timings",
  },

  /** WhatsApp recipient for appointment requests (Bookings page). */
  booking: {
    whatsappName: "Prasath Achu",
    whatsapp: "918072094613",
    whatsappDisplay: "8072094613",
  },

  images: {
    doctorHero: "assets/images/doctor-hero.png",
    doctorAbout: "assets/images/doctor-about.jpg",
    doctor: "assets/images/doctor-hero.png",
    consultation: "assets/images/consultation.jpg",
    hospital: "assets/images/hospital.jpg",
    surgery: "assets/images/surgery.jpg",
    kidney: "assets/images/kidney-placeholder.svg",
    patientCare: "assets/images/patient-care-placeholder.svg",
  },

  blog: {
    /* Set your WordPress blog URL when ready, e.g. "https://yourdomain.com/blog" */
    wordpressUrl: "",
    /* Redirect blog.html visitors straight to WordPress */
    redirectOnVisit: false,
    /* Make navbar "Blog" link open WordPress directly */
    navOpensWordPress: false,
    /* Open WordPress in a new tab */
    openInNewTab: false,
    /* Embed WordPress in an iframe on blog.html (optional) */
    embedWordPress: false,
  },

  locations: [
    {
      name: "Dhanalakshmi Srinivasan Medical College",
      city: "Perambalur",
      days: "Mon – Fri",
      hours: "9 AM – 3 PM",
      phone: "+91 94422 94141",
    },
    {
      name: "Murugan Hospital Care",
      city: "Trichy, Palpannai",
      days: "Mon – Fri",
      hours: "5 PM – 7 PM",
      phone: "+91 94422 94141",
    },
    {
      name: "Velan Multispeciality Hospital",
      city: "Trichy",
      days: "Mon – Fri",
      hours: "7 PM – 9 PM",
      phone: "+91 94422 94141",
    },
    {
      name: "Muthuraja Hospital",
      city: "Pudukottai",
      days: "Tuesday",
      hours: "7 PM – 9 PM",
      phone: "+91 94422 94141",
    },
  ],
};

/**
 * Apply centralized image paths to elements with data-image attributes.
 */
function initSiteImages() {
  const imageMap = siteConfig.images;

  document.querySelectorAll("[data-image]").forEach((el) => {
    const key = el.getAttribute("data-image");
    const src = imageMap[key];
    if (!src) return;

    if (el.tagName === "IMG") {
      el.src = src;
      el.loading = el.dataset.loading || "lazy";
    } else {
      el.style.backgroundImage = `url("${src}")`;
    }
  });
}

/**
 * Scroll reveal animation using Intersection Observer.
 */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const elements = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || elements.length === 0) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Set active navigation link based on current page.
 */
function initActiveNav() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPage = href.split("/").pop();
    const isHome =
      (currentPage === "" || currentPage === "index.html") &&
      (linkPage === "" || linkPage === "index.html" || linkPage === "./");

    if (isHome || linkPage === currentPage) {
      link.classList.add("site-nav__link--active", "mobile-nav__link--active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/**
 * Point Blog nav links to WordPress when configured.
 */
function initBlogLinks() {
  const { blog } = siteConfig;
  if (!blog?.wordpressUrl || blog.wordpressUrl.startsWith("[")) return;

  const url = blog.wordpressUrl.replace(/\/$/, "");

  document.querySelectorAll("[data-blog-link]").forEach((link) => {
    if (blog.navOpensWordPress) {
      link.href = url;
      if (blog.openInNewTab) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    }
  });
}

/**
 * Update contact placeholders in the DOM.
 */
function setContactText(el, text) {
  const textEl = el.querySelector(".site-footer__contact-text");
  if (textEl) {
    textEl.textContent = text;
  } else if (el.tagName === "A" || el.tagName === "SPAN") {
    el.textContent = text;
  }
}

function initContactPlaceholders() {
  const { contact } = siteConfig;
  const phoneShort = contact.whatsapp.replace(/\D/g, "").replace(/^91/, "");

  document.querySelectorAll("[data-contact-phone]").forEach((el) => {
    const textEl = el.querySelector(".site-footer__contact-text");
    const displayText = textEl ? contact.phone : phoneShort;

    if (contact.phone.startsWith("[")) {
      setContactText(el, contact.phone);
      el.addEventListener("click", (e) => e.preventDefault());
    } else {
      el.href = `tel:${contact.phone.replace(/\s/g, "")}`;
      setContactText(el, displayText);
    }
  });

  document.querySelectorAll("[data-contact-whatsapp]").forEach((el) => {
    if (contact.whatsapp.startsWith("[")) {
      setContactText(el, "[WHATSAPP_NUMBER]");
      el.addEventListener("click", (e) => e.preventDefault());
    } else {
      el.href = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
      setContactText(el, phoneShort);
    }
  });

  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    if (contact.email.startsWith("[")) {
      setContactText(el, contact.email);
      el.addEventListener("click", (e) => e.preventDefault());
    } else {
      el.href = `mailto:${contact.email}`;
      setContactText(el, contact.email);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSiteImages();
  initScrollReveal();
  initActiveNav();
  initBlogLinks();
  initContactPlaceholders();
});

export { siteConfig };
