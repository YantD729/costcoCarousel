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

const dotImgSrc = {url: 'pictures/dot-icon.png'}
const playIconSrc = {url: 'pictures/play-icon.png'}
const stopIconSrc = {url: 'pictures/stop-icon.png'}

const numOfslidesData = slidesData.length
let activeIndex = 0
let currSlide = null
let isPaused = false
let isTogglePaused = false

//add slidesData to slidesContainer

slidesData.forEach(function(slideData, index) {
    const slideElem = document.createElement('div')
    slideElem.className = 'slide'

    const imgElem = document.createElement('img')
    imgElem.src = slideData.url

    if (index === 0) slideElem.setAttribute('data-active', '')

    slideElem.appendChild(imgElem)
    slidesContainer.appendChild(slideElem)
})

const slides = document.querySelectorAll('.slide')

//add dots
for (let i = 0; i < numOfslidesData; i++) {
    const dotBtn = document.createElement("div")
    dotBtn.className = "play-icon"
    const dotImg = document.createElement("img")
    dotImg.setAttribute("src", dotImgSrc.url)
    dotBtn.appendChild(dotImg)
    if (i === 0) dotBtn.setAttribute('data-active', '')
    dotsContainer.appendChild(dotBtn)
}

const dots = document.querySelectorAll(".play-icon")

const toggleBtn = document.createElement("div")
toggleBtn.className = "playToggle"
const toggleImg = document.createElement("img")
toggleImg.setAttribute("src", playIconSrc.url)
toggleBtn.appendChild(toggleImg)
dotsContainer.appendChild(toggleBtn)

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
        toggleImg.setAttribute("src", playIconSrc.url)
    }
    else if (!isTogglePaused) {
        clearInterval(autoPlayInterval)
        isTogglePaused = true
        toggleImg.setAttribute("src", stopIconSrc.url)
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




