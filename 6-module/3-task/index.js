import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.render();
    this.initCarousel();
    this.addEventListener();
  }

  render () {
    this.elem = createElement (`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>`);

    for (let slide of this.slides) {
      let newElem = createElement (`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      this.elem.querySelector(".carousel__inner").append(newElem);
    }

    return this.elem;
  }

  initCarousel() {
    this.elem.addEventListener("click", moveCarousel);

    const carouselInner = this.elem.querySelector(".carousel__inner");
    let currentSlide = 1;
    let slideLength = this.slides.length;

    const leftArrow = this.elem.querySelector(".carousel__arrow_left");
    leftArrow.style.display = "none";
    const rightArrow = this.elem.querySelector(".carousel__arrow_right");

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
      else if (currentSlide === slideLength) {
        rightArrow.style.display = "none";
      }
      else {
        leftArrow.style.display = "";
        rightArrow.style.display = "";
      }
    }
  }

  addEventListener() {
    let cardButtons = this.elem.querySelectorAll(".carousel__button");

    for (let cardButton of cardButtons) {
      cardButton.addEventListener("click", (event) => {
        const myEvent = new CustomEvent("product-add", {
          detail: event.target.closest(".carousel__slide").dataset.id,
          bubbles: true,
        });
        cardButton.dispatchEvent(myEvent);
      });
    }

    this.elem.addEventListener("product-add", (event) => {

    });
  }
}
