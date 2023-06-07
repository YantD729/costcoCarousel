const buttons = document.querySelectorAll("[data-carousel-button]");
console.log(buttons);
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot-icon");
const numOfSlides = slides.length;
const interval = 2000;
var autoPlayInterval, autoPlayer;


let activeIndex = 0;
let currSlide = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        currSlide = slides[activeIndex];
        currDot = dots[activeIndex];
        const offset = (button.dataset.carouselButton === 'next') ? 1 : -1;
        activeIndex += offset;
        if (activeIndex < 0) activeIndex  = slides.length - 1;
        if (activeIndex >= slides.length) activeIndex = 0;

        slides[activeIndex].dataset.active = true;
        delete currSlide.dataset.active;
    })
});

autoPlayer = () => {
    autoPlayInterval = setInterval(function() {
        document.querySelector(".next-btn").click();
        }, interval);
};

autoPlayer();

//stop the image play on mouseover
slides.forEach(slide => {
    slide.addEventListener("mouseover", () => {
        clearInterval(autoPlayInterval);
    });

    slide.addEventListener("mouseout", () => {
        autoPlayer();
    });
});

buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        clearInterval(autoPlayInterval);
    });

    button.addEventListener("mouseout", () => {
        autoPlayer();
    });
});





