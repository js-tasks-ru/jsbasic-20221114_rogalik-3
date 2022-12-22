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
    slider.querySelector(".slider__progress").style.width = `0px`;
    return slider;
  }

  changeValue(slider) {
    slider.addEventListener("click", (e) => {
      let stepSize = slider.offsetWidth/(this.#steps - 1);
      let min = slider.offsetWidth;
      let sliderX = e.pageX - slider.getBoundingClientRect().left;
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

      let leftPercents = 100 / (this.#steps - 1) * j;
      slider.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
      slider.querySelector(".slider__progress").style.width = `${leftPercents}%`;

      slider.dispatchEvent(new CustomEvent('slider-change', { 
        detail: this.#value, // значение 0, 1, 2, 3, 4
        bubbles: true 
      }))
    })
  }
}
