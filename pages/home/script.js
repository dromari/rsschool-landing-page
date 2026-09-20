/*---------burger----------*/
const burger = document.querySelector('.burger-menu');
const headerNavigationWrapper = document.querySelector('.header-navigation-wrapper');
const headerNavigation = document.querySelector('.header-navigation');
const oneLine = document.querySelector('.one-line');
const twoLine = document.querySelector('.two-line');
const headerNavListLi = document.querySelectorAll('.header-nav-list-li');
const toggleMenu = () => {
    document.body.classList.toggle('lock');
    headerNavigation.classList.toggle('active');
    oneLine.classList.toggle('active');
    twoLine.classList.toggle('active');
    headerNavigationWrapper.classList.toggle('active');
};

burger.addEventListener('click', e => {
    toggleMenu();
});

headerNavListLi.forEach(element => {
    element.addEventListener('click', (e) => {
        toggleMenu();
        e.preventDefault();
        setTimeout(()=>{
            window.location = element.getAttribute('href');
        }, 1000);
    })
})

/*setTimeout(function () {
    console.log('text');
}, 1000);*/

/*---------slider---------*/

const sliderRow = document.querySelector('.slider-row');
const arrowNext = document.querySelector('.arrow-next');
const arrowPrev = document.querySelector('.arrow-prev');
const lineImg = document.querySelectorAll('.line-img');
let sliderImgContainer = document.querySelectorAll('.slider-img-container');
let currentSliderImgContainer = 0;
let isEnabled = true;

function changeCurrentSliderImgContainer(n) {
    currentSliderImgContainer = (n + sliderImgContainer.length) % sliderImgContainer.length;
}

function hiddenSlide(direct) {
    isEnabled = false;
    sliderImgContainer[currentSliderImgContainer].classList.add(direct);
    sliderImgContainer[currentSliderImgContainer].addEventListener('animationend', function () {
        this.classList.remove('active', direct);
    });
}

function showSlide(direct) {
    sliderImgContainer[currentSliderImgContainer].classList.add('next', direct);
    sliderImgContainer[currentSliderImgContainer].addEventListener('animationend', function () {
        this.classList.remove('next', direct);
        this.classList.add('active');
        isEnabled = true;
    });
}

function prevSliderImgContainer(n) {
    hiddenSlide('to-right');
    changeCurrentSliderImgContainer(n - 1);
    showSlide('from-left');
}

function nextSliderImgContainer(n) {
    hiddenSlide('to-left');
    changeCurrentSliderImgContainer(n + 1);
    showSlide('from-right');
}

arrowPrev.addEventListener('click', function () {
    if (isEnabled) {
        prevSliderImgContainer(currentSliderImgContainer);
    }
    lineImg.forEach(line => {
        line.classList.remove('active-line');
    })
    lineImg[currentSliderImgContainer].classList.add('active-line');
});

arrowNext.addEventListener('click', function () {
    if (isEnabled) {
        nextSliderImgContainer(currentSliderImgContainer);
    }
    lineImg.forEach(line => {
        line.classList.remove('active-line');
    })
    lineImg[currentSliderImgContainer].classList.add('active-line');
});

lineImg.forEach(line => {
    line.addEventListener('animationend', function () {
        nextSliderImgContainer(currentSliderImgContainer);
        lineImg.forEach(line => {
            line.classList.remove('active-line');
        })
        lineImg[currentSliderImgContainer].classList.add('active-line');
    })
})

sliderRow.addEventListener('mouseover', () => {
    lineImg.forEach(line => {
        line.style.animationPlayState = 'paused';
    })
})

sliderRow.addEventListener('mouseout', () => {
    lineImg.forEach(line => {
        line.style.animationPlayState = 'running';
    })
})

sliderRow.addEventListener('touchstart', () => {
    lineImg.forEach(line => {
        line.style.animationPlayState = 'paused';
    })
})

sliderRow.addEventListener('touchend', () => {
    lineImg.forEach(line => {
        line.style.animationPlayState = 'running';
    })
})

const swipe = (elem) => {
    let surf = elem;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;
    let threshold = 30;
    let restraint = 100;
    let allowedTime = 500;

    surf.addEventListener('mousedown', function (el) {
        startX = el.pageX;
        startY = el.pageY;
        startTime = new Date().getTime();
        el.preventDefault();
    });

    surf.addEventListener('mouseup', function (el) {
        distX = el.pageX - startX;
        distY = el.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= threshold) {
                if (distX > 0) {
                    if (isEnabled) {
                        prevSliderImgContainer(currentSliderImgContainer);
                        lineImg.forEach(line => line.classList.remove('active-line'));
                        lineImg[currentSliderImgContainer].classList.add('active-line');
                    }
                } else {
                    if (isEnabled) {
                        nextSliderImgContainer(currentSliderImgContainer);
                        lineImg.forEach(line => line.classList.remove('active-line'));
                        lineImg[currentSliderImgContainer].classList.add('active-line');
                    }
                }
            }
        }
        el.preventDefault();
    });

    surf.addEventListener('touchstart', function (el) {
        let touchObj = el.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        el.preventDefault();
    });

    surf.addEventListener('touchmove', function (el) {
        el.preventDefault();
    });

    surf.addEventListener('touchend', function (el) {
        let touchObj = el.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= threshold) {
                if (distX > 0) {
                    if (isEnabled) {
                        prevSliderImgContainer(currentSliderImgContainer);
                        lineImg.forEach(line => line.classList.remove('active-line'));
                        lineImg[currentSliderImgContainer].classList.add('active-line');
                    }
                } else {
                    if (isEnabled) {
                        nextSliderImgContainer(currentSliderImgContainer);
                        lineImg.forEach(line => line.classList.remove('active-line'));
                        lineImg[currentSliderImgContainer].classList.add('active-line');
                    }
                }
            }
        }
        el.preventDefault();
    });

}

let elem = sliderRow;
swipe(elem);







