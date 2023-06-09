const buttons = document.querySelectorAll("[data-carousel-button]")
console.log(buttons)
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot-icon")
const numOfSlides = slides.length
const interval = 2000
const toggleBtn = document.querySelector(".playToggle")
let autoPlayInterval, autoPlayer


let activeIndex = 0
let currSlide = null
let isPaused = false
let isTogglePaused = false

buttons.forEach(button => {
    button.addEventListener("click", () => {
        currSlide = slides[activeIndex]
        currDot = dots[activeIndex]
        const offset = (button.dataset.carouselButton === 'next') ? 1 : -1
        activeIndex += offset
        if (activeIndex < 0) activeIndex  = slides.length - 1
        if (activeIndex >= slides.length) activeIndex = 0

        slides[activeIndex].dataset.active = true
        dots[activeIndex].dataset.active = true
        delete currSlide.dataset.active
        delete currDot.dataset.active
    })
})

autoPlayer = () => {
    autoPlayInterval = setInterval(function() {
        document.querySelector(".next-btn").click()
        }, interval)
}

autoPlayer()

//stop the image play on mouseover
slides.forEach(slide => {
    slide.addEventListener("mouseover", () => {
        if (!isTogglePaused) {
            if (!isPaused) {
                clearInterval(autoPlayInterval) 
                isPaused = true
            }
        }
    })

    slide.addEventListener("mouseout", () => {
        if (!isTogglePaused) {
            if (isPaused) {
                autoPlayer() 
                isPaused = false
            }
        }
    })
})

buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        if (!isTogglePaused) {
            if (!isPaused) {
                clearInterval(autoPlayInterval) 
                isPaused = true
            }
        }
    })

    button.addEventListener("mouseout", () => {
        if (!isTogglePaused) {
            if (isPaused) {
                autoPlayer() 
                isPaused = false
            }
        }
    })
})

//set the play toggle
toggleBtn.addEventListener("click", () => {
    if (isTogglePaused) {
        autoPlayer()
        isTogglePaused = false
        toggleBtn.textContent = '❚❚'
    }
    else if (!isTogglePaused) {
        clearInterval(autoPlayInterval)
        isTogglePaused = true
        toggleBtn.textContent = '>'
    }
})

//set the dot button
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currSlide = slides[activeIndex]
        currDot = dots[activeIndex]
        slides[index].dataset.active = true
        dots[index].dataset.active = true
        activeIndex = index
        delete currSlide.dataset.active
        delete currDot.dataset.active
    })
})




