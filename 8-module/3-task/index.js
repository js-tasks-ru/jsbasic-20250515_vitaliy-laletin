export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

