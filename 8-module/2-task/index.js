import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
    </div>
    </div>
    `);

    this.render();
  }

  render() {
    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    for (let obj of this.products) {
      if (this.filters.noNuts) {
        console.log(this.filters.noNuts)
        console.log(this.filters.vegeterianOnly)
        if(obj.nuts) continue;
      }
      if (this.filters.vegeterianOnly) {
        console.log(this.filters.vegeterianOnly)
        if(!obj.vegeterian) continue;
      }
      if (this.filters.maxSpiciness) {
        if(obj.spiciness > this.filters.maxSpiciness) continue;
      }
      if (this.filters.category) {
        if(obj.category !== this.filters.category) continue;
      }
      
      const card = new ProductCard(obj);

      this.elem.querySelector(".products-grid__inner").append(card.elem);
    }
  }

  updateFilter(filters) {
    this.filters.noNuts = filters.noNuts ?? this.filters.noNuts;
    this.filters.vegeterianOnly = filters.vegeterianOnly ?? this.filters.vegeterianOnly;
    this.filters.maxSpiciness = filters.maxSpiciness ?? this.filters.maxSpiciness;
    this.filters.category = filters.category ?? this.filters.category;
    this.render();
  }
}
