import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.initScrollMenu();
    this.chooseCategory();
  }

  render () {
    this.elem = createElement (`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    for (let item of this.categories) {
      this.category = createElement (`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `);

      this.elem.querySelector(".ribbon__inner").append(this.category);
    }


    return this.elem;
  }

  initScrollMenu () {
    let ribbonInner = this.elem.querySelector(".ribbon__inner");
    ribbonInner.addEventListener("scroll", displayArrow);

    let arrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    arrowLeft.classList.remove("ribbon__arrow_visible");
    arrowLeft.addEventListener("click", scrollLeft);
    let arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    arrowRight.classList.add("ribbon__arrow_visible");
    arrowRight.addEventListener("click", scrollRight);

    function scrollLeft () {
      ribbonInner.scrollBy(-350, 0);
    }

    function scrollRight () {
      ribbonInner.scrollBy(350, 0);
    }

    function displayArrow () {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft >= 1) {
        arrowLeft.classList.add("ribbon__arrow_visible");
      }
      else {
        arrowLeft.classList.remove("ribbon__arrow_visible");
      }
      if (scrollRight <= 1) {
        arrowRight.classList.remove("ribbon__arrow_visible");
      }
      else {
        arrowRight.classList.add("ribbon__arrow_visible");
      }
    }
  }

  chooseCategory() {
    let ribbonInner = this.elem.querySelector(".ribbon__inner");

    ribbonInner.addEventListener("click", (event) => {
      event.preventDefault();

      let pastChoice = ribbonInner.querySelector(".ribbon__item_active");
      if (pastChoice) {
        pastChoice.classList.remove("ribbon__item_active");
      }

      event.target.classList.add("ribbon__item_active");

      const myEvent = new CustomEvent("ribbon-select", {
        detail: event.target.dataset.id,
        bubbles: true,
      });
      this.elem.dispatchEvent(myEvent);
    });

    this.elem.addEventListener("ribbon-select", (event) => {

    });
  }
}
