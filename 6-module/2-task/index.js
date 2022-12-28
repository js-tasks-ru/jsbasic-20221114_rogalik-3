import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    let card = createElement(`
    <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/" class="card__image" alt="product">
        <span class="card__price">€</span>
    </div>
    <div class="card__body">
        <div class="card__title"></div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
    </div>
    `)
    for (let key in product) {
        if (key === "name") {
            card.querySelector(".card__title").innerHTML = `${product[key]}`;
        }
        if (key === "price") {
            card.querySelector(".card__price").innerHTML += `${product[key].toFixed(2)}`;
        }
        if (key === "image") {
            card.querySelector(".card__image").src += `${product[key]}`;
        }
    }
    card.querySelector(".card__button").addEventListener("click", () => {
        card.dispatchEvent(new CustomEvent("product-add", { 
            detail: product.id, 
            bubbles: true 
        }))
    });
    this.elem = card;
  }
}