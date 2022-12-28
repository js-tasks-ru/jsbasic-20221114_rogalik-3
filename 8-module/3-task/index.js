export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product === null || product === undefined || product === "") return;
    for (let cartItem of this.cartItems) {
      if (cartItem.product.id === product.id) {
        cartItem.count += 1;
        this.onProductUpdate(cartItem);
        return;
      } 
    }
    let cartItem = {
      product: product,
      count: 1
    };
    this.cartItems.push(cartItem);

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    for (let cartItem of this.cartItems) {
      if (cartItem.product.id === productId) {
        cartItem.count += amount;
        if (cartItem.count <= 0) this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        this.onProductUpdate(cartItem);
      } 
    }
  }

  isEmpty() {
    return (this.cartItems.length === 0);
  }

  getTotalCount() {
    let totalCount = 0;
    for (let cartItem of this.cartItems) {
      totalCount += cartItem.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.count * cartItem.product.price;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

