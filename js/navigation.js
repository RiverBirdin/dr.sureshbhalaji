/**
 * Navigation: mobile menu, header scroll behavior, keyboard & outside click.
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav__link");
  const overlay = document.querySelector(".mobile-nav__overlay");

  if (!header) return;

  /* Header scroll behavior */
  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("site-header--solid");
      header.classList.remove("site-header--transparent");
    } else {
      header.classList.remove("site-header--solid");
      if (header.dataset.transparent === "true") {
        header.classList.add("site-header--transparent");
      }
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (!menuToggle || !mobileNav) return;

  const panel = mobileNav.querySelector(".mobile-nav__panel");

  function openMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    panel.focus();
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    menuToggle.focus();
  }

  function toggleMenu() {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  }

  menuToggle.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav || e.target === overlay) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

}

document.addEventListener("DOMContentLoaded", initNavigation);
