const buttons = document.querySelectorAll("[data-carousel-button]")
console.log(buttons)
const interval = 2000
// const toggleBtn = document.querySelector(".playToggle")
let slidesContainer = document.querySelector("#slides")

let dotsContainer = document.querySelector("#dots")
let autoPlayInterval, autoPlayer

const slidesData = [
    {url: 'https://mobilecontent.costco.com/live/resource/img/23w10152/d-23w10152-fq-june-mailer.jpg'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3843303'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3862617'},
    {url: 'https://mobilecontent.costco.com/live/resource/img/5-17-23-MVM/d-23w09134-may-mvm-fq.jpg'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3848466'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3849522'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3848209'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3839053'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3848498'},
    {url: 'https://media-cdn.costco.com/www3-media/?libBID=3736261'},
]

const numOfslidesData = slidesData.length
let activeIndex = 0
let currSlide = null
let isPaused = false
let isTogglePaused = false

//add slidesData to slidesContainer

slidesData.forEach(function(slideData, index) {
    let slideElem = document.createElement('div')
    slideElem.className = 'slide'

    let imgElem = document.createElement('img')
    imgElem.src = slideData.url

    if (index === 0) slideElem.setAttribute('data-active', '')

    slideElem.appendChild(imgElem)
    slidesContainer.appendChild(slideElem)
})

const slides = document.querySelectorAll('.slide')

//add dots
for (let i = 0; i < numOfslidesData; i++) {
    let dotBtn = document.createElement("div")
    let button = document.createElement("button")
    button.className = "play-icon dot-icon"
    button.type = "button"
    dotBtn.className = "dot-box"
    dotBtn.appendChild(button)
    if (i === 0) dotBtn.setAttribute('data-active', '')
    dotsContainer.appendChild(dotBtn)
}

let toggleBox = document.createElement("div")
toggleBox.className = "dot-box"
let toggleBtn = document.createElement("button")
toggleBtn.className = "play-icon playToggle"
toggleBtn.type = "button"
toggleBtn.textContent = '❚❚'
toggleBox.appendChild(toggleBtn);
dotsContainer.appendChild(toggleBox)

const dots = document.querySelectorAll(".play-icon")

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
        currSlide = slidesData[activeIndex]
        currDot = dots[activeIndex]
        slidesData[index].dataset.active = true
        dots[index].dataset.active = true
        activeIndex = index
        delete currSlide.dataset.active
        delete currDot.dataset.active
    })
})




