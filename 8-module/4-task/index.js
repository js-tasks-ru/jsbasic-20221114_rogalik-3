import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  #modal;
  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
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
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
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
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.#modal = new Modal();
    this.#modal.setTitle("Your order");
    let root = document.createElement('div');
    for (let cartItem of this.cartItems) {
      root.append(this.renderProduct(cartItem.product, cartItem.count));
    }
    root.append(this.renderOrderForm());
    this.#modal.setBody(root);
    root.addEventListener("click", (e) => {
      if (!e.target.closest(".cart-counter__button")) return;

      let productId = e.target.closest(".cart-product").dataset.productId;

      if (e.target.closest(".cart-counter__button_plus")) this.updateProductCount(productId, 1);
      if (e.target.closest(".cart-counter__button_minus")) this.updateProductCount(productId, -1);
    })
    
    root.querySelector(".cart-form").addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
    this.#modal.open();
  }

  onProductUpdate(cartItem) {
    if (document.querySelector("body").classList.contains("is-modal-open")) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector(".modal__inner");
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`); 
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`); 
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (this.isEmpty()) this.#modal.close();
    }
    
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    document.querySelector(".cart-buttons__button").classList.add("is-loading");
    
    let formData = new FormData(document.querySelector(".cart-form"));
    let responsePromise = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST'
    })

    responsePromise
      .then(() => {
        this.#modal.setTitle('Success!');
        this.cartItems.length = 0;
        document.querySelector(".modal__body").innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `;
      })
      .catch(() => {

      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

