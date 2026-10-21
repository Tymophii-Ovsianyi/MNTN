document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // SHOWCASE SLIDER
  // =========================================

  const showcaseList = document.querySelector(".showcase-list");
  const showcaseCards = document.querySelectorAll(".showcase-card");
  const prevButton = document.querySelector(".showcase-btn-prev");
  const nextButton = document.querySelector(".showcase-btn-next");

  let currentSlide = 0;

  function showSlide(index) {
    if (!showcaseList || showcaseCards.length === 0) return;

    currentSlide =
      (index + showcaseCards.length) % showcaseCards.length;

    showcaseList.style.transform =
      `translateX(-${currentSlide * 100}%)`;
  }

  if (showcaseList && showcaseCards.length > 0) {
    prevButton?.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });

    nextButton?.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    showcaseList.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    showcaseList.addEventListener(
      "touchend",
      (event) => {
        touchEndX = event.changedTouches[0].screenX;

        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 50) return;

        if (distance < 0) {
          showSlide(currentSlide + 1);
        } else {
          showSlide(currentSlide - 1);
        }
      },
      { passive: true }
    );

    showSlide(0);
  }

  // =========================================
  // ACCOUNT MODAL
  // =========================================

  const accountBtn = document.getElementById("accountBtn");
  const modal = document.getElementById("accountModal");
  const closeBtn = document.getElementById("closeModal");
  const accountForm = document.getElementById("accountForm");
  const formMessage = document.getElementById("formMessage");

  const userName = document.getElementById("userName");
  const userPhone = document.getElementById("userPhone");

  // Stop here if the account form is not present
  if (
    !accountBtn ||
    !modal ||
    !closeBtn ||
    !accountForm ||
    !formMessage ||
    !userName ||
    !userPhone
  ) {
    console.warn("Account form elements were not found in the HTML.");
    return;
  }

  let closeTimer;

  function closeModal() {
    modal.classList.remove("active");

    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function openModal() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    modal.classList.add("active");
    formMessage.textContent = "";
  }

  accountBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Close when clicking outside the modal content
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // =========================================
  // NAME VALIDATION
  // Letters, spaces, apostrophes and hyphens
  // =========================================

  const nameRegex =
    /^[a-zA-ZÀ-ÖØ-öø-ÿА-Яа-яІіЇїЄєҐґ]+(?:[\s'-][a-zA-ZÀ-ÖØ-öø-ÿА-Яа-яІіЇїЄєҐґ]+)*$/;

  userName.addEventListener("input", () => {
    userName.value = userName.value.replace(
      /[^a-zA-ZÀ-ÖØ-öø-ÿА-Яа-яІіЇїЄєҐґ\s'-]/g,
      ""
    );

    formMessage.textContent = "";
  });

  // =========================================
  // PHONE MASK: +380XXXXXXXXX
  // =========================================

  function formatPhone(value) {
    let digits = value.replace(/\D/g, "");

    // Remove the country code if it is already present
    if (digits.startsWith("380")) {
      digits = digits.slice(3);
    } else if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }

    // Ukrainian phone numbers have 9 digits after +380
    digits = digits.slice(0, 9);

    return "+380" + digits;
  }

  userPhone.addEventListener("focus", () => {
    if (!userPhone.value) {
      userPhone.value = "+380";
    }
  });

  userPhone.addEventListener("input", () => {
    userPhone.value = formatPhone(userPhone.value);
    formMessage.textContent = "";
  });

  // =========================================
  // FORM SUBMISSION
  // =========================================

  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = userName.value.trim();
    const phone = userPhone.value.trim();

    // Validate name
    if (!nameRegex.test(name)) {
      formMessage.textContent =
        "Please enter a valid name using letters only.";
      userName.focus();
      return;
    }

    // Validate Ukrainian phone number
    const phoneRegex = /^\+380\d{9}$/;

    if (!phoneRegex.test(phone)) {
      formMessage.textContent =
        "Please enter a valid Ukrainian phone number.";
      userPhone.focus();
      return;
    }

    // Print customer details in the browser console
    console.log("Customer name:", name);
    console.log("Customer phone:", phone);

    // Success message in English
    formMessage.textContent =
      "You're all set! Check your phone for your access link. Tap the link to continue to your account.";

    // Close modal after 4 seconds
    closeTimer = setTimeout(() => {
      modal.classList.remove("active");
      accountForm.reset();
      formMessage.textContent = "";
      closeTimer = null;
    }, 4000);
  });
});