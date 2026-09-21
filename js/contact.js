/**
 * Contact page enhancements.
 * Placeholder links are handled by main.js contact placeholders.
 */
function initContactPage() {
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const link = card.querySelector("a");
        if (link && !link.getAttribute("href")?.startsWith("[")) {
          e.preventDefault();
          link.click();
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initContactPage);
