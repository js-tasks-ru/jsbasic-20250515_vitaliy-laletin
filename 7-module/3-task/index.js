import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        </div>
      </div>
    `);

    this.sliderSteps = this.elem.querySelector(".slider__steps");
    this.sliderProgress = this.elem.querySelector(".slider__progress");
    this.sliderProgress.style.width = `${this.value}px`;

    for (let i = 0; i < steps; i++) {
      let step = createElement(`
        <span></span>;
      `);

      this.sliderSteps.append(step);
    }

    this.elem.querySelector(`.slider__steps>span:first-child`).classList.add("slider__step-active");

    this.moveSlider();
  }

  moveSlider() {
    const slider = this.elem;
    const sliderSteps = this.steps;
    let value = 0;

    slider.addEventListener("click", (event) => {
      move(event);

      const myEvent = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true,
      });
      slider.dispatchEvent(myEvent);
    });

    function move (event) {
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let segments = sliderSteps - 1;
      let approximateValue = leftRelative * segments;
      value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      slider.querySelector(".slider__value").innerText = value;
      slider.querySelector(`.slider__steps>span:nth-child(${value + 1})`).classList.add("slider__step-active");
      slider.querySelector(".slider__thumb").style.left = `${valuePercents}%`;
      slider.querySelector(".slider__progress").style.width = `${valuePercents}%`;
    }
  }
}
