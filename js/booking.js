import { siteConfig } from "./main.js";

/**
 * Booking form validation and WhatsApp message generation.
 */
function initBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;

  const alertSuccess = document.getElementById("booking-success");
  const alertError = document.getElementById("booking-error");

  const fields = {
    name: form.querySelector("#full-name"),
    phone: form.querySelector("#phone"),
    email: form.querySelector("#email"),
    hospital: form.querySelector("#hospital"),
    date: form.querySelector("#preferred-date"),
    time: form.querySelector("#preferred-time"),
    reason: form.querySelector("#reason"),
    message: form.querySelector("#additional-message"),
  };

  const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$|^(\+91[\s-]?)?[0-9]{10,12}$/;

  function sanitizeInput(value, maxLength = 500) {
    return value
      .trim()
      .slice(0, maxLength)
      .replace(/[\u0000-\u001F\u007F<>]/g, "");
  }

  function showError(field, message) {
    const group = field.closest(".form-group");
    let errorEl = group.querySelector(".form-error");
    if (!errorEl) {
      errorEl = document.createElement("p");
      errorEl.className = "form-error";
      errorEl.setAttribute("role", "alert");
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
    field.classList.add("error");
    field.setAttribute("aria-invalid", "true");
  }

  function clearErrors() {
    form.querySelectorAll(".form-error").forEach((el) => el.remove());
    form.querySelectorAll(".error").forEach((el) => {
      el.classList.remove("error");
      el.removeAttribute("aria-invalid");
    });
    if (alertError) alertError.hidden = true;
    if (alertSuccess) alertSuccess.hidden = true;
  }

  function validate() {
    clearErrors();
    let isValid = true;

    if (!fields.name.value.trim()) {
      showError(fields.name, "Please enter your full name.");
      isValid = false;
    }

    const phoneValue = fields.phone.value.replace(/[\s-]/g, "");
    if (!phoneValue) {
      showError(fields.phone, "Please enter your phone number.");
      isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
      showError(
        fields.phone,
        "Please enter a valid Indian phone number (10 digits)."
      );
      isValid = false;
    }

    if (fields.email.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fields.email.value.trim())) {
        showError(fields.email, "Please enter a valid email address.");
        isValid = false;
      }
    }

    if (!fields.hospital.value) {
      showError(fields.hospital, "Please select a preferred hospital.");
      isValid = false;
    }

    if (!fields.date.value) {
      showError(fields.date, "Please select a preferred date.");
      isValid = false;
    } else {
      const selected = new Date(fields.date.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        showError(fields.date, "Please select a future date.");
        isValid = false;
      }
    }

    return isValid;
  }

  function buildWhatsAppMessage() {
    const hospitalOption = fields.hospital.options[fields.hospital.selectedIndex];
    const hospitalText = hospitalOption ? hospitalOption.text : fields.hospital.value;

    return (
      `Hello, I would like to request a consultation with ${siteConfig.doctor.displayName}.\n\n` +
      `Name: ${sanitizeInput(fields.name.value, 100)}\n` +
      `Phone: ${sanitizeInput(fields.phone.value, 20)}\n` +
      (fields.email.value.trim() ? `Email: ${sanitizeInput(fields.email.value, 120)}\n` : "") +
      `Preferred Hospital: ${sanitizeInput(hospitalText, 120)}\n` +
      `Preferred Date: ${fields.date.value}\n` +
      (fields.time.value ? `Preferred Time: ${sanitizeInput(fields.time.value, 40)}\n` : "") +
      (fields.reason.value.trim() ? `Reason: ${sanitizeInput(fields.reason.value, 80)}\n` : "") +
      (fields.message.value.trim() ? `Additional Message: ${sanitizeInput(fields.message.value, 300)}` : "")
    );
  }

  function populateHospitalOptions() {
    if (!fields.hospital) return;

    siteConfig.locations.forEach((loc, index) => {
      const option = document.createElement("option");
      option.value = `location-${index}`;
      option.textContent = `${loc.name} — ${loc.city}`;
      fields.hospital.appendChild(option);
    });
  }

  populateHospitalOptions();

  /* Set min date to today */
  if (fields.date) {
    const today = new Date().toISOString().split("T")[0];
    fields.date.setAttribute("min", today);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      if (alertError) {
        alertError.textContent =
          "Please correct the errors below before submitting.";
        alertError.hidden = false;
      }
      const firstError = form.querySelector(".error");
      if (firstError) firstError.focus();
      return;
    }

    const whatsappNumber = siteConfig.contact.whatsapp;
    const message = encodeURIComponent(buildWhatsAppMessage());

    if (whatsappNumber.startsWith("[")) {
      if (alertSuccess) {
        alertSuccess.textContent =
          "WhatsApp booking is not configured. Please contact the clinic by phone.";
        alertSuccess.hidden = false;
      }
    } else {
      const cleanNumber = whatsappNumber.replace(/\D/g, "");
      window.open(
        `https://wa.me/${cleanNumber}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );

      if (alertSuccess) {
        alertSuccess.textContent =
          "Your appointment request has been sent via WhatsApp. The clinic team will confirm availability.";
        alertSuccess.hidden = false;
      }
    }

    form.reset();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Clear field errors on input */
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("error");
      field.removeAttribute("aria-invalid");
      const group = field.closest(".form-group");
      const errorEl = group?.querySelector(".form-error");
      if (errorEl) errorEl.remove();
    });
  });
}

document.addEventListener("DOMContentLoaded", initBookingForm);
