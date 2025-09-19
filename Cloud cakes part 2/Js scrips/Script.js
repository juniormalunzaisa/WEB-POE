/* -------------------------------
   Cloud Cakes Script
   ------------------------------- */

// Mobile nav toggle (future expansion if needed)
function toggleMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("show");
}

// Simple form validation for contact/enquiry
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get inputs
      const inputs = form.querySelectorAll("input, textarea, select");
      let valid = true;

      inputs.forEach(input => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false;
          input.style.borderColor = "red";
        } else {
          input.style.borderColor = "#ddd";
        }
      });

      if (valid) {
        alert("Thank you! Your form has been submitted successfully.");
        form.reset();
      } else {
        alert(" Please fill in all required fields.");
      }
    });
  });
});
