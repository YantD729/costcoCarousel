const buttons = document.querySelectorAll("[data-carousel-button]");
console.log(buttons);
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot-icon");
const numOfSlides = slides.length;

let activeIndex = 0;
let currSlide = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        currSlide = slides[activeIndex];
        const offset = (button.dataset.carouselButton === 'next') ? 1 : -1;
        activeIndex += offset;
        if (activeIndex < 0) activeIndex  = slides.length - 1;
        if (activeIndex >= slides.length) activeIndex = 0;

        slides[activeIndex].dataset.active = true;
        console.log(slides[activeIndex].dataset.active);
        delete currSlide.dataset.active;
        console.log(currSlide);
    })
})