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

