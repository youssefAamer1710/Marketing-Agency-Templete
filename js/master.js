
// toggling the setting menu
const settings = document.querySelector('.setting-box')
const settingsIcon = document.querySelector('.setting-box .icon i')
document.querySelector('.setting-box .icon').onclick = () => {
    settings.classList.toggle('open')
    settingsIcon.classList.toggle('spin')
}
// Switch colors

// check if there is a color in local storage or not
let mainColor = localStorage.getItem("color_option");
if (mainColor) {
    // Setting the local storage color to the root if there is one  
    document.documentElement.style.setProperty('--main-color', mainColor)
    // putting active class on the right element
    document.querySelectorAll("[data-color]").forEach(element => {
        if (element.dataset.color === mainColor) {
            element.classList.add("active")
        }
    })
}

const colorLi = document.querySelectorAll('.colors-list li')

colorLi.forEach(li => {
    li.addEventListener("click", (e) => {
        // set color on Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color)
        handleActive(e)
    })
})

// Random background switch option
const landing = document.querySelector(".landing")
const imgsArray = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg"]
const randomBackground = document.querySelectorAll(".random-background span")

// toggle the randomize logic
let backgroundOption = true;
// Variable to control interval
let backgroundInterval;

// check if there is a Background Option in local storage or not
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem) {
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active")
    })
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-background .yes").classList.add("active")
        backgroundOption = true
    } else {
        backgroundOption = false
        document.querySelector(".random-background .no").classList.add("active")
    }
}
// function to randomize imgs
function randomizeImgs() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * imgsArray.length)
            
            landing.style.backgroundImage = `url("../imgs/${imgsArray[randomIndex]}")`
        }, 10000);
    }
}
randomizeImgs()

randomBackground.forEach(span => {
    span.addEventListener("click", (e) => {
        if (e.target.dataset.random === "yes") {
            backgroundOption = true;
            randomizeImgs()
            localStorage.setItem("background_option", true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option", false)
        }
        handleActive(e)
    })
})

// Show side bullets or not
const showBullets = document.querySelectorAll(".show-bullets span")
const asideBullets = document.querySelector("aside")
let bulletLocalItem = localStorage.getItem("bullets_option")
if (bulletLocalItem) {
    showBullets.forEach(span => {
        span.classList.remove("active")
    })
    if (bulletLocalItem === 'block') {
        asideBullets.style.display = "block"
        document.querySelector(".show-bullets .yes").classList.add("active")
    } else {
        asideBullets.style.display = "none"
        document.querySelector(".show-bullets .no").classList.add("active")
    }
}
showBullets.forEach(span => {
    span.addEventListener("click", (e) => {
        if (e.target.dataset.show === "yes") {
            asideBullets.style.display = "block"
            localStorage.setItem("bullets_option", 'block')
        } else {
            asideBullets.style.display = "none"
            localStorage.setItem("bullets_option", 'none')
        }
        handleActive(e)
    })
})


// animate services section
const services = document.querySelectorAll(".services .container .service-box")

window.onscroll = function() {
    // Services offset top (using first service box as reference)
    let servicesOffsetTop = services[0].offsetTop
    // Window ScrollTop
    let windowScrollTop = this.scrollY + this.innerHeight - 250
    if (windowScrollTop > servicesOffsetTop) {
        services.forEach(service => {
            service.classList.add('animate')
        })
    }
}

// slider effect on clients
function initializeSlider() {
    const slider = document.querySelector('.clients-container .slider');
    const slides = document.querySelectorAll('.clients-container .client');
    const bulletsContainer = document.querySelector('.slider-bullets');
    let currentSlide = 0;
    let slideInterval;

    slides.forEach((_, index) => {
        const bullet = document.createElement('span');
        bullet.classList.add('bullet');
        if (index === 0) bullet.classList.add('active');
        // Add data attribute for better identification
        bullet.dataset.index = index;
        bullet.addEventListener('click', function() {
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideShow();
        });
        bulletsContainer.appendChild(bullet);
    });

    function goToSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update bullets - use bulletsContainer to scope the query
        const bullets = bulletsContainer.querySelectorAll('.bullet');
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    // Start automatic sliding
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop on hover (optional)
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startSlideShow);

    startSlideShow();
}
// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', initializeSlider);

// Navigation Bullets 
const allBullets = document.querySelectorAll("aside .bullet") 

allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        // Get the section id from data-section attribute
        const section = bullet.dataset.section;
        document.getElementById(section).scrollIntoView({behavior: "smooth"})
    })
})

// Handle Active Function
function handleActive(event) {
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    })
    event.target.classList.add("active")
}

// Reset Button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear()
    window.location.reload()
}

// Toggle menu
let toggleBtn = document.querySelector('.toggle-menu')
let theLinks = document.querySelector('.links')

toggleBtn.onclick = function (e) {
    e.stopPropagation()
    theLinks.classList.toggle("open")
}
// Stop Propagation
theLinks.onclick = function (e) {
    e.stopPropagation();
}

// CLose the menu when clicking outside it 
document.addEventListener("click", e => {
    if (e.target !== toggleBtn && e.target !== theLinks) {
        if (theLinks.classList.contains("open")) {
            theLinks.classList.remove("open")
        }
    }
})