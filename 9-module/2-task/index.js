import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    let carouselHolder = document.body.querySelector("[data-carousel-holder]");
    carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.body.querySelector("[data-ribbon-holder]");
    ribbonHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({steps: 5, value: 3});
    let sliderHolder = document.body.querySelector("[data-slider-holder]");
    sliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let cartIconHolder = document.body.querySelector("[data-cart-icon-holder]");
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch("products.json");
    let productsData = await response.json();

    this.productsGrid = new ProductsGrid(productsData);
    let productsGridHolder = document.body.querySelector("[data-products-grid-holder]");
    productsGridHolder.innerHTML = "";
    productsGridHolder.append(this.productsGrid.elem);


    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener("product-add", (event) => {
      let foundProduct = productsData.find((item) => item.id === event.detail);
      this.cart.addProduct(foundProduct);
    });

    document.body.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });
    document.body.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({
        category: event.detail,
      });
    });

    let noNuts = document.querySelector("#nuts-checkbox");
    noNuts.addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked,
      });
    });

    let vegeterian = document.querySelector("#vegeterian-checkbox");
    vegeterian.addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked,
      });
    });
  }
}
