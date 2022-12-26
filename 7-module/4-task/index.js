export default class StepSlider {
  #elem;
  #steps;
  #value;
  #thumb;
  #slider;

  constructor({ steps, value = 2 }) {
    this.#steps = steps;
    this.#value = value;
    
    this.#slider = this.render();
    this.addEventListeners();

    this.#elem = this.#slider;
  }

  get elem() {
    return this.#elem;
  }

  render() {
    let slider = document.createElement("div");
    slider.classList.add("slider");
    slider.innerHTML = `
    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>
  
    <!--Полоска слайдера-->
    <div class="slider__progress"></div>
  
    <!-- Шаги слайдера (вертикальные чёрточки) -->
    <div class="slider__steps">

    </div>
    `;
    slider.querySelector(".slider__value").innerHTML = `${this.#value}`;
    for (let i = 0; i < this.#steps; i++) {
      slider.querySelector(".slider__steps").innerHTML += `<span></span>`;
    }
    slider.querySelector(".slider__steps").querySelectorAll("span")[this.#value].classList.add("slider__step-active");

    let leftPercents = this.#value / (this.#steps - 1) * 100;
    slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;
    slider.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
    return slider;
  }

  addEventListeners() {
    this.#thumb = this.#slider.querySelector('.slider__thumb');
    this.#thumb.ondragstart = this.onDragStart;
    this.#slider.addEventListener('click', this.onClick);
    this.#slider.addEventListener('pointerdown', this.onPointerDown);
  }
  
  onPointerDown = () => {
    this.#slider.classList.add("slider_dragging");
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp, {once: true});
  }
  
  onPointerMove = (e) => {
    let sliderX = 0;
    let distance = e.pageX - this.#slider.getBoundingClientRect().left;
    let sliderWidth = this.#slider.offsetWidth;
    
    if (distance >= 0 && distance <= sliderWidth) {
      sliderX = distance;
    } else if (distance > sliderWidth) {
      sliderX = sliderWidth;
    }
    
    let leftPercents = sliderX / sliderWidth * 100;
    this.#thumb.style.left = `${leftPercents}%`;
    this.#slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;

    let stepSize = this.#slider.offsetWidth/(this.#steps - 1);
    let min = this.#slider.offsetWidth;
    let j = this.#value;
    for (let i = 0; i < this.#steps; i++) {
      let valueForCompare = Math.abs(stepSize * i - sliderX);
      if (min > valueForCompare) {
        min = valueForCompare;
        j = i;
      }
    }
    this.#value = j;
    
    this.#slider.querySelector(".slider__value").innerHTML = j;
    for (let span of this.#slider.querySelector(".slider__steps").querySelectorAll("span")) {
      span.classList.remove("slider__step-active");
    }
    this.#slider.querySelector(".slider__steps").querySelectorAll("span")[this.#value].classList.add("slider__step-active");
  }
  
  onPointerUp = (e) => {
    document.removeEventListener('pointermove', this.onPointerMove);
    this.#slider.classList.remove("slider_dragging");
    let sliderX = 0;
    let distance = e.pageX - this.#slider.getBoundingClientRect().left;
    let sliderWidth = this.#slider.offsetWidth;
    
    if (distance >= 0 && distance <= sliderWidth) {
      sliderX = distance;
    } else if (distance > sliderWidth) {
      sliderX = sliderWidth;
    }

    let stepSize = this.#slider.offsetWidth/(this.#steps - 1);
    let min = this.#slider.offsetWidth;
    let j = this.#value;
    for (let i = 0; i < this.#steps; i++) {
      let valueForCompare = Math.abs(stepSize * i - sliderX);
      
      if (min > valueForCompare) {
        min = valueForCompare;
        j = i;
      }
    }
    this.#value = j;

    this.#slider.querySelector(".slider__value").innerHTML = j;
    for (let span of this.#slider.querySelector(".slider__steps").querySelectorAll("span")) {
      span.classList.remove("slider__step-active");
    }
    this.#slider.querySelector(".slider__steps").querySelectorAll("span")[this.#value].classList.add("slider__step-active");

    let leftPercents = 100 / (this.#steps - 1) * j;
    this.#slider.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
    this.#slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;

    this.#slider.dispatchEvent(new CustomEvent('slider-change', { 
      detail: this.#value, // значение 0, 1, 2, 3, 4
      bubbles: true 
    }))
  }
  
  onDragStart = () => {
    this.#thumb.ondragstart = () => false;
  } 

  onClick = (e) => {
      let sliderX = 0;
      let distance = e.pageX - this.#slider.getBoundingClientRect().left;
      let sliderWidth = this.#slider.offsetWidth;
      
      if (distance >= 0 && distance <= sliderWidth) {
        sliderX = distance;
      } else if (distance > sliderWidth) {
        sliderX = sliderWidth;
      }

      let stepSize = this.#slider.offsetWidth/(this.#steps - 1);
      let min = this.#slider.offsetWidth;
      let j = this.#value;
      for (let i = 0; i < this.#steps; i++) {
        let valueForCompare = Math.abs(stepSize * i - sliderX);
        
        if (min > valueForCompare) {
          min = valueForCompare;
          j = i;
        }
      }
      this.#value = j;

      this.#slider.querySelector(".slider__value").innerHTML = this.#value;
      for (let span of this.#slider.querySelector(".slider__steps").querySelectorAll("span")) {
        span.classList.remove("slider__step-active");
      }
      this.#slider.querySelector(".slider__steps").querySelectorAll("span")[this.#value].classList.add("slider__step-active");

      let leftPercents = 100 / (this.#steps - 1) * this.#value;
      this.#slider.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
      this.#slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;

      this.#slider.dispatchEvent(new CustomEvent('slider-change', { 
        detail: this.#value, // значение 0, 1, 2, 3, 4
        bubbles: true 
      }))
  }
}
