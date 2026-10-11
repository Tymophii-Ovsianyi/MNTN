const showcaseList = document.querySelector('.showcase-list');
const showcaseCards = document.querySelectorAll('.showcase-card');

const prevButton = document.querySelector('.showcase-btn-prev');
const nextButton = document.querySelector('.showcase-btn-next');

let currentSlide = 0;


/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    /*
        Якщо після останньої картки —
        повертаємося на першу.
    */

    if (index >= showcaseCards.length) {
        currentSlide = 0;
    }

    /*
        Якщо перед першою —
        переходимо на останню.
    */

    else if (index < 0) {
        currentSlide = showcaseCards.length - 1;
    }

    else {
        currentSlide = index;
    }


    /*
        Рухаємо всі картки.

        0%    = 01
        -100% = 02
        -200% = 03
    */

    showcaseList.style.transform =
        `translateX(-${currentSlide * 100}%)`;
}


/* =========================================
   NEXT
========================================= */

nextButton.addEventListener('click', () => {

    showSlide(currentSlide + 1);

});


/* =========================================
   PREVIOUS
========================================= */

prevButton.addEventListener('click', () => {

    showSlide(currentSlide - 1);

});


/* =========================================
   SWIPE
========================================= */

let touchStartX = 0;
let touchEndX = 0;


showcaseList.addEventListener(
    'touchstart',
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


showcaseList.addEventListener(
    'touchend',
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    /*
        Маленький рух не вважаємо свайпом.
    */

    if (Math.abs(swipeDistance) < 50) {
        return;
    }


    /*
        Свайп справа наліво:
        01 → 02
    */

    if (swipeDistance < 0) {

        showSlide(currentSlide + 1);

    }


    /*
        Свайп зліва направо:
        02 → 01
    */

    else {

        showSlide(currentSlide - 1);

    }
}

const accountBtn = document.getElementById("accountBtn");
const modal = document.getElementById("accountModal");
const closeBtn = document.getElementById("closeModal");
const accountForm = document.getElementById("accountForm");
const formMessage = document.getElementById("formMessage");

accountBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("active");
  }
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("userPhone").value.trim();

  if (!name || !phone) {
    formMessage.textContent = "Please fill in all fields.";
    return;
  }

  formMessage.textContent =
    "Your details have been entered! The next step is phone verification.";
});