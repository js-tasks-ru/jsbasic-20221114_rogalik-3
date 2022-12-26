import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #elem;
  constructor(categories) {
    let ribbon = createElement(`
    <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>
    `);

    let ribbonInner = ribbon.querySelector(".ribbon__inner");

    for (let obj of categories) {
      ribbonInner.innerHTML += `<a href="#" class="ribbon__item" data-id="${obj.id}">${obj.name}</a>`;
    }

    ribbon.addEventListener("click", (event) => {
      if (!event.target.closest(".ribbon__arrow")) return;

      if (event.target.closest(".ribbon__arrow_right")) {
        ribbonInner.scrollBy(350, 0);
      }
      
      if (event.target.closest(".ribbon__arrow_left")) {
        ribbonInner.scrollBy(-350, 0);
      };
    })

    ribbonInner.addEventListener("scroll", () => {
      if (ribbonInner.scrollLeft == 0) {
        ribbon.querySelector(".ribbon__arrow_left").classList.remove("ribbon__arrow_visible");
      } else {
        ribbon.querySelector(".ribbon__arrow_left").classList.add("ribbon__arrow_visible");
      }

      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

      if (scrollRight <= 1) {
        ribbon.querySelector(".ribbon__arrow_right").classList.remove("ribbon__arrow_visible");
      } else {
        ribbon.querySelector(".ribbon__arrow_right").classList.add("ribbon__arrow_visible");
      }
    })

    ribbon.addEventListener("click", (event) => {
      if (!event.target.closest(".ribbon__item")) return;

      event.preventDefault();

      for (let link of document.querySelectorAll(".ribbon__item")) {
        link.classList.remove("ribbon__item_active");
      }
      event.target.classList.add("ribbon__item_active");
      
      ribbon.dispatchEvent(new CustomEvent('ribbon-select', { 
      detail: event.target.dataset.id, 
      bubbles: true 
    }))
    })


    this.categories = categories;
    this.#elem = ribbon;
  }
  get elem() {
    return this.#elem;
  }
}
