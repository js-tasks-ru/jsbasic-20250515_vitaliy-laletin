function initCarousel() {
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("click", moveCarousel);

  const carouselInner = document.querySelector(".carousel__inner");
  let currentSlide = 1;

  const leftArrow = document.querySelector(".carousel__arrow_left");
  leftArrow.style.display = "none";
  const rightArrow = document.querySelector(".carousel__arrow_right");

  function moveCarousel (event) {
    const moveArrow = event.target.closest("div");

    if (moveArrow.classList.contains("carousel__arrow_right")) {
      carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * currentSlide}px)`;
      currentSlide++;
    }
    else if (moveArrow.classList.contains("carousel__arrow_left")) {
      carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * currentSlide - carouselInner.offsetWidth * 2}px)`;
      currentSlide--;
    }

    displayArrow();
  }

  function displayArrow () {
    if (currentSlide === 1) {
      leftArrow.style.display = "none";
    }
    else if (currentSlide === 4) {
      rightArrow.style.display = "none";
    }
    else {
      leftArrow.style.display = "";
      rightArrow.style.display = "";
    }
  }
}
