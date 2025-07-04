import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || product === undefined) {
      return;
    }

    if (this.cartItems.find(item => item.product.name === product.name)) {
      this.cartItems = this.cartItems.map(item => {
        if (item.product.name === product.name) {
          item.count++;
        }
        return item;
      });
    }
    else {
      this.cartItems.push({product, count: 1});
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    this.cartItems = this.cartItems.map(item => {
      if (item.product.id === productId) {
        item.count += amount;
      }

      if (item.count === 0) {
        this.modal.modal.querySelector(`[data-product-id="${productId}"]`).innerHTML = "";
        return;
      }

      return item;
    });

    this.cartItems = this.cartItems.filter(item => item !== undefined);

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, item) => acc + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => acc + item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    let orderForm = this.renderOrderForm();
    let products = this.cartItems.map((item) => {
      return this.renderProduct(item.product, item.count).outerHTML;
    });

    this.modal.setTitle('Your order');
    this.modal.setBody(createElement(`
      <div>
        ${products.join("")}
        ${orderForm.outerHTML}
      </div>
    `));

    this.modal.open();

    let modalBody = this.modal.modal.querySelector(".modal__body");
    modalBody.addEventListener("click", (event) => {

      let productClick = event.target.closest(".cart-product");

      if (event.target.closest(".cart-counter__button_minus")) {
        this.updateProductCount(productClick.dataset.productId, -1);
      }
      else if (event.target.closest(".cart-counter__button_plus")) {
        this.updateProductCount(productClick.dataset.productId, 1);
      }


    });

    let modalForm = modalBody.querySelector(".cart-form");
    modalForm.addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    if (this.isEmpty()) {
      this.modal.close();
    }

    let modalBody = document.body.querySelector(".modal__body");

    if (document.body.classList.contains("is-modal-open")) {
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      for (let item of cartItem) {
        let productCount = modalBody.querySelector(`[data-product-id="${item.product.id}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${item.product.id}"] .cart-product__price`);

        productCount.innerHTML = item.count;
        productPrice.innerHTML = `€${(item.product.price * item.count).toFixed(2)}`;
      }

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let fd = new FormData(document.querySelector(".cart-form"));

    let submitButton = document.querySelector(`[type="submit"]`);
    submitButton.classList.add("is-loading");

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: fd,
    })
    .then(this.modal.modal.querySelector(".modal__title").innerHTML = 'Success!')
    .then(this.cartItems.length = 0)
    .then(this.modal.modal.querySelector(".modal__body").innerHTML = createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `).outerHTML);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

