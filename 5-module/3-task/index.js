function initCarousel() {
  let carousel = document.querySelector(".carousel");
  let carouselInner = document.querySelector(".carousel__inner");
  let carouselSlide = document.querySelector(".carousel__slide");
  let moveValue = 0;
  let slidesCollection = document.querySelectorAll(".carousel__slide");
  let max = 0;
  max = -carouselSlide.offsetWidth * (slidesCollection.length - 1);
  document.querySelector(".carousel__arrow_left").style.display = 'none';
  carousel.addEventListener("click", (event) => {
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
}
