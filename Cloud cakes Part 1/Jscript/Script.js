// -----------------------------
// Cloud Cakes JS
// -----------------------------

// Mobile nav toggle (optional)
function toggleMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("show");
}

// Basic form validation for Contact and Enquiry forms
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      const inputs = form.querySelectorAll("input, textarea");
      let valid = true;

      inputs.forEach(input => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false;
          input.style.border = "1px solid red";
        } else {
          input.style.border = "1px solid #ccc";
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("Please fill out all required fields before submitting.");
      }
    });
  });
});
