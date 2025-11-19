 /* ===============================
   Cloud Cakes – Global JavaScript
   script.js – Works on ALL pages
   =============================== */

document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // 1. Mobile Navigation Toggle
  // ===============================
  const hamburger = document.querySelector(".hamburger");
  const navUl = document.querySelector("header nav ul");

  if (hamburger && navUl) {
    hamburger.addEventListener("click", () => {
      navUl.classList.toggle("show");
      hamburger.classList.toggle("open");
    });

    // Close menu when clicking a link
    document.querySelectorAll("header nav ul li a").forEach(link => {
      link.addEventListener("click", () => {
        if (navUl.classList.contains("show")) {
          navUl.classList.remove("show");
          hamburger.classList.remove("open");
        }
      });
    });
  }

  // ===============================
  // 2. Initialize All Date Pickers
  // ===============================
  if (typeof $.fn.datepicker !== "undefined") {
    $(".datepicker").each(function () {
      const $input = $(this);
      const minDate = $input.data("min") || "+2d"; // default: 2 days from now
      const maxDate = $input.data("max") || "+2m";

      $input.datepicker({
        dateFormat: "dd MM yy",
        minDate: minDate,
        maxDate: maxDate,
        changeMonth: true,
        changeYear: true,
        showAnim: "fadeIn",
        beforeShow: function () {
          setTimeout(() => {
            $(".ui-datepicker").css("z-index", 9999);
          }, 10);
        }
      });
    });
  }

  // ===============================
  // 3. Form Validation & Submission
  // ===============================
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      const errors = [];

      // Reset previous feedback
      form.querySelectorAll(".error").forEach(el => el.style.display = "none");
      form.querySelectorAll("input, select, textarea").forEach(input => {
        input.style.borderColor = "#ddd";
      });

      // Validate all required fields
      form.querySelectorAll("[required]").forEach(field => {
        const value = field.value.trim();
        const label = field.closest(".form-group")?.querySelector("label")?.textContent.replace("*", "").trim() || field.name;

        if (!value) {
          isValid = false;
          showFieldError(field, `${label} is required.`);
          errors.push(`${label} is required`);
        } else {
          // Email validation
          if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            isValid = false;
            showFieldError(field, "Please enter a valid email address.");
          }

          // Phone validation (optional but valid if filled)
          if (field.type === "tel" && value && !/^\+?\d[\d\s\-\(\)]{8,}$/.test(value)) {
            isValid = false;
            showFieldError(field, "Please enter a valid phone number.");
          }

          // Date picker validation
          if (field.classList.contains("datepicker") && !$(field).datepicker("getDate")) {
            isValid = false;
            showFieldError(field, "Please select a valid date.");
          }
        }
      });

      // Special: Collection date required only if "collection" is selected
      const pickupSelect = form.querySelector("#pickup-delivery");
      const collectionInput = form.querySelector("#collection-date");
      if (pickupSelect && collectionInput && pickupSelect.value === "collection" && !collectionInput.value) {
        isValid = false;
        showFieldError(collectionInput, "Collection date & time is required.");
      }

      // Final action
      if (isValid) {
        showSuccessModal("Thank you! Your request has been submitted. We’ll contact you soon.");
        form.reset();
        // Optional: Uncomment to send via AJAX
        // submitFormViaAjax(form);
      } else {
        showErrorModal("Please fix the errors below.");
      }
    });
  });

  // Helper: Show inline error
  function showFieldError(field, message) {
    field.style.borderColor = "#e74c3c";
    let errorSpan = field.closest(".form-group")?.querySelector(".error");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error";
      field.parentNode.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }

  // ===============================
  // 4. Success & Error Modals
  // ===============================
  function showSuccessModal(message) {
    createModal(message, "success");
  }

  function showErrorModal(message) {
    createModal(message, "error");
  }

  function createModal(message, type) {
    // Remove any existing modal
    document.querySelector(".custom-modal")?.remove();

    const modal = document.createElement("div");
    modal.className = "custom-modal";
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center;
      justify-content: center; z-index: 10000; animation: fadeIn 0.3s;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      background: white; padding: 30px; border-radius: 16px; max-width: 400px;
      text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      animation: slideUp 0.4s ease-out;
    `;

    const icon = type === "success" ? "Success" : "Error";
    const color = type === "success" ? "#27ae60" : "#e74c3c";

    box.innerHTML = `
      <div style="font-size: 3.5rem; color: ${color}; margin-bottom: 15px;">${icon}</div>
      <p style="font-size: 1.1rem; color: #333; margin-bottom: 20px; line-height: 1.5;">${message}</p>
      <button onclick="this.closest('.custom-modal').remove()" 
              style="background: ${color}; color: white; border: none; padding: 12px 28px;
                     border-radius: 30px; cursor: pointer; font-weight: 600; font-size: 1rem;">
        OK
      </button>
    `;

    modal.appendChild(box);
    document.body.appendChild(modal);

    // Auto-remove after 6 seconds
    setTimeout(() => modal.remove(), 6000);
  }

  // ===============================
  // 5. Optional: AJAX Form Submission
  // ===============================
  // function submitFormViaAjax(form) {
  //   const data = new FormData(form);
  //   fetch(form.action || "submit.php", {
  //     method: "POST",
  //     body: data
  //   })
  //   .then(response => response.json())
  //   .then(result => {
  //     if (result.success) {
  //       showSuccessModal("Submitted successfully!");
  //     } else {
  //       showErrorModal("Submission failed. Please try again.");
  //     }
  //   })
  //   .catch(() => showErrorModal("Network error. Please check your connection."));
  // }
});