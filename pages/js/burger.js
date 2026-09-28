/*---------burger----------*/
const burger = document.querySelector(".burger-menu");
const headerNavigationWrapper = document.querySelector(
  ".header-navigation-wrapper",
);
const headerNavigation = document.querySelector(".header-navigation");
const oneLine = document.querySelector(".one-line");
const twoLine = document.querySelector(".two-line");
const headerNavListLi = document.querySelectorAll(".header-nav-list-li");
const logoMenu = document.querySelector(".logo-menu");
const controls = document.querySelector(".header-controls");

const toggleMenu = () => {
  document.body.classList.toggle("lock");
  headerNavigation.classList.toggle("active");
  oneLine.classList.toggle("active");
  twoLine.classList.toggle("active");
  headerNavigationWrapper.classList.toggle("active");
  logoMenu.classList.toggle("active");
};

const resetMenu = () => {
  document.body.classList.remove("lock");
  headerNavigation.classList.remove("active");
  oneLine.classList.remove("active");
  twoLine.classList.remove("active");
  headerNavigationWrapper.classList.remove("active");
  logoMenu.classList.remove("active");

  if (logoMenu && controls) {
    controls.appendChild(logoMenu);
  }
};

function handleMenuTransfer() {
  if (headerNavigation.classList.contains("active")) {
    headerNavigation.appendChild(logoMenu);
  } else {
    if (controls) {
      controls.appendChild(logoMenu);
    }
  }
}

burger.addEventListener("click", (e) => {
  toggleMenu();
  handleMenuTransfer();
});

headerNavListLi.forEach((element) => {
  element.addEventListener("click", (e) => {
    toggleMenu();
    e.preventDefault();
    setTimeout(() => {
      window.location = element.getAttribute("href");
    }, 1000);
  });
});

const desktopBreakpoint = window.matchMedia("(min-width: 769px)");

function handleScreenChange(e) {
  if (e.matches) {
    resetMenu();
  }
}

function handleEscape(event) {
  if (event.key === "Escape") {
    resetMenu();
  }
}

document.addEventListener("keydown", handleEscape);
desktopBreakpoint.addEventListener("change", handleScreenChange);
handleScreenChange(desktopBreakpoint);
