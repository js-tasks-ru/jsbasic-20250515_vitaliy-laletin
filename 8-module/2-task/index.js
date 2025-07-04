import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.items = [];

    this.render();
  }

  render () {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    const productsInner = this.elem.querySelector(".products-grid__inner");

    for (let product of this.products) {
      let item = new ProductCard({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        id: product.id,
        vegeterian: product.vegeterian,
        nuts: product.nuts,
        spiciness: product.spiciness,
      });

      this.items.push(item);
      productsInner.append(item.elem);
    }
  }

  updateFilter (filters) {
    this.filters = {...this.filters, ...filters};

    let filterProducts = this.items.filter(item => item);

    const productsInner = this.elem.querySelector(".products-grid__inner");
    productsInner.innerHTML = "";

    if (this.filters.noNuts === true) {
      filterProducts = filterProducts.filter(item => {
        if (item.product.nuts !== true) {
          return item;
        }
      });
    }

    if (this.filters.vegeterianOnly === true) {
      filterProducts = filterProducts.filter(item => {
        if (item.product.vegeterian === true) {
          return item;
        }
      });
    }

    if (this.filters.maxSpiciness) {
      filterProducts = filterProducts.filter(item => {
        if (item.product.spiciness <= this.filters.maxSpiciness) {
          return item;
        }
      });
    }

    if (this.filters.category) {
      filterProducts = filterProducts.filter(item => {
        if (item.product.category === this.filters.category) {
          return item;
        }
      });
    }

    for (let product of filterProducts) {
      productsInner.append(product.elem);
    }
  }
}
