import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    let carousel = createElement(`
    <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </div>
      </div>
    `)

    for (let obj of slides) {
      let slide = createElement(`
      <div class="carousel__slide" data-id="${obj.id}">
      <img src="/assets/images/carousel/${obj.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${obj.price}</span>
        <div class="carousel__title">${obj.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
      </div>
      `)
      carousel.querySelector(".carousel__inner").append(slide);
    }

  let carouselInner = carousel.querySelector(".carousel__inner");
  let carouselSlide = carousel.querySelector(".carousel__slide");
  let moveValue = 0;
  let slidesCollection = carousel.querySelectorAll(".carousel__slide");
  
  carousel.querySelector(".carousel__arrow_left").style.display = 'none';
  carousel.addEventListener("click", (event) => {
    let max = -carouselSlide.offsetWidth * (slidesCollection.length - 1);
    if (!event.target.closest(".carousel__arrow")) return;
    if (event.target.closest(".carousel__arrow_right")) {
      moveValue -= carouselSlide.offsetWidth;
      carouselInner.style.transform = `translateX(${moveValue}px)`;
    }
    if (event.target.closest(".carousel__arrow_left")) {
      moveValue += carouselSlide.offsetWidth;
      carouselInner.style.transform = `translateX(${moveValue}px)`;
    }
    if (moveValue == 0) {
      document.querySelector(".carousel__arrow_left").style.display = 'none';
    } else if (moveValue == max) {
      document.querySelector(".carousel__arrow_right").style.display = 'none';
    } else {
      document.querySelector(".carousel__arrow_left").style.display = '';
      document.querySelector(".carousel__arrow_right").style.display = '';
    }
  })

  for (let slide of carousel.querySelectorAll(".carousel__slide")) {
    slide.addEventListener("click", (event) => {
      if (!event.target.closest(".carousel__button")) return;
      carousel.dispatchEvent(new CustomEvent("product-add", { 
          detail: slide.dataset.id, 
          bubbles: true 
      }))
  });
  }
  
    this.elem = carousel;
    this.slides = slides;
  }
}
