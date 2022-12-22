export default class StepSlider {
  #elem;
  #steps;
  #value;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;

    let slider = this.render();

    this.changeValue(slider);

    this.#elem = slider;
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

  changeValue(slider) {
    let thumb = slider.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    slider.addEventListener("pointerdown", (e) => {
      slider.classList.add("slider_dragging");

      let onMouseMove = (e)  => {
      let sliderX = 0;
      if (e.pageX - slider.getBoundingClientRect().left >= 0 && e.pageX - slider.getBoundingClientRect().left <= slider.offsetWidth) {
        
        sliderX = e.pageX - slider.getBoundingClientRect().left;
      } else if (e.pageX - slider.getBoundingClientRect().left > slider.offsetWidth) {
        sliderX = slider.offsetWidth;
      }
      
      let leftPercents = sliderX / slider.offsetWidth * 100;
      thumb.style.left = `${leftPercents}%`;
      slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;

      let stepSize = slider.offsetWidth/(this.#steps - 1);
      let min = slider.offsetWidth;
      let j;
      for (let i = 0; i < this.#steps; i++) {
        let valueForCompare = Math.abs(stepSize * i - sliderX);
        if (min > valueForCompare) {
          min = valueForCompare;
          j = i;
        }
      }
      this.#value = j;
      
      slider.querySelector(".slider__value").innerHTML = j;
      for (let span of slider.querySelector(".slider__steps").querySelectorAll("span")) {
        span.classList.remove("slider__step-active");
      }
      slider.querySelector(".slider__steps").querySelectorAll("span")[this.#value].classList.add("slider__step-active");
      }

      document.onpointermove = onMouseMove;

      document.onpointerup = (e) => {
        document.onpointermove = null;
        slider.classList.remove("slider_dragging");
        
        
  
        slider.querySelector(".slider__value").innerHTML = this.#value;
        for (let span of slider.querySelector(".slider__steps").querySelectorAll("span")) {
          span.classList.remove("slider__step-active");
        }
        slider.querySelector(".slider__steps").querySelectorAll("span")[this.#value].classList.add("slider__step-active");
  
        let leftPercents = 100 / (this.#steps - 1) * this.#value;
        slider.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
        slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;


        slider.dispatchEvent(new CustomEvent('slider-change', { 
          detail: this.#value, 
          bubbles: true 
        }))

        document.onpointerup = null;
      }
    });

    
  }
}
