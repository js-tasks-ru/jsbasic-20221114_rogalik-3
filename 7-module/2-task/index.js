import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modalWindow = createElement(`
  <div class="container">
  <!--Корневой элемент Modal-->
  <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          
        </h3>
      </div>

      <div class="modal__body">
        
      </div>
    </div>

  </div>
  </div>
  `);
  #body = document.querySelector("body");

  constructor() {
    this.#modalWindow.addEventListener("click", (e) => {
      if (!e.target.closest(".modal__close")) return;
      this.close();
    })
    document.addEventListener("keydown", (e) => {
      if (!(e.code === "Escape")) return;
      this.close();
    })
  }

  open() {
    this.#body.classList.add("is-modal-open");
    this.#body.append(this.#modalWindow);
  }

  setTitle(title) {
    this.#modalWindow.querySelector(".modal__title").innerHTML = title;
  }

  setBody(node) {
    this.#modalWindow.querySelector(".modal__body").innerHTML = "";
    this.#modalWindow.querySelector(".modal__body").append(node);
  }

  close() {
    this.#body.classList.remove("is-modal-open");
    this.#modalWindow.remove();
  }
}
