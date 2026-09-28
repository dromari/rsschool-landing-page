import data from "./products.json" with { type: "json" };

const menu = document.querySelector(".menu-cards-wrapper");
const buttonType = document.querySelectorAll(".drink-type-button");
const modalWrapper = document.querySelector(".modal-wrapper");
const loadImg = document.querySelector(".load-img");

let windowWidth = window.innerWidth;
let currentProduct = "coffee";
let startCost = 0;

function createMenu(type = "coffee") {
  let countCard = 0;
  menu.innerHTML = "";
  let availableCards = data.filter((e) => e.category == type);

  if (windowWidth <= 768) {
    let cardsToShow = Math.min(4, availableCards.length);
    for (let i = 0; i < cardsToShow; i++) {
      let b = createCard(availableCards[i]);
      menu.appendChild(b);
      countCard = i;
    }
    if (availableCards.length > countCard + 1) {
      if (loadImg) loadImg.style.display = "block";
    } else {
      if (loadImg) loadImg.style.display = "none";
    }
  } else {
    availableCards.forEach((item) => {
      let b = createCard(item);
      menu.appendChild(b);
    });
    if (loadImg) loadImg.style.display = "none";
  }
}

function createCard(jsonCard) {
  const menuCard = document.createElement("div");
  menuCard.classList.add("menu-card");

  menuCard.dataset.cardData = JSON.stringify(jsonCard);

  const menuCardImgContainer = document.createElement("div");
  menuCardImgContainer.classList.add("menu-card-img-container");

  const imgMenuCardImgContainer = document.createElement("img");
  imgMenuCardImgContainer.src = jsonCard.url;
  imgMenuCardImgContainer.setAttribute("alt", jsonCard.category);
  menuCardImgContainer.appendChild(imgMenuCardImgContainer);

  const discriptionPosition = document.createElement("div");
  discriptionPosition.classList.add("discription-position");

  const namePosition = document.createElement("div");
  namePosition.classList.add("name-position");
  namePosition.innerHTML = jsonCard.name;

  const moreDetailPosition = document.createElement("div");
  moreDetailPosition.classList.add("more-detail-position");
  moreDetailPosition.innerHTML = jsonCard.description;

  const costPosition = document.createElement("div");
  costPosition.classList.add("cost-position");
  costPosition.innerHTML = "\$" + jsonCard.price;

  menuCard.appendChild(menuCardImgContainer);
  menuCard.appendChild(discriptionPosition);
  discriptionPosition.appendChild(namePosition);
  discriptionPosition.appendChild(moreDetailPosition);
  discriptionPosition.appendChild(costPosition);

  menuCard.addEventListener("click", showModal);
  return menuCard;
}

function createModalCard(jsonCard) {
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal-wrapper");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalImg = document.createElement("div");
  modalImg.classList.add("modal-img");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("menu-card-img-container");

  const img = document.createElement("img");
  img.src = jsonCard.url || "../../assets/images/imgMenu/coffee-1.jpg";
  img.classList.add("menu-card-img");
  img.setAttribute("alt", jsonCard.category || "coffee");

  imgContainer.appendChild(img);
  modalImg.appendChild(imgContainer);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("information-container");

  const namePosition = document.createElement("div");
  namePosition.classList.add("name-position");
  namePosition.textContent = jsonCard.name;

  const moreDetailPosition = document.createElement("div");
  moreDetailPosition.classList.add("more-detail-position");
  moreDetailPosition.textContent = jsonCard.description;

  const sizePosition = document.createElement("div");
  sizePosition.classList.add("size-position");

  const sizeTitle = document.createElement("p");
  sizeTitle.textContent = "Size";

  const choiseSize = document.createElement("div");
  choiseSize.classList.add("choise-size");

  const sizesData = [
    {
      key: "s",
      name: "S",
      volume: jsonCard.sizes?.s?.size || "200 ml",
      price: jsonCard.sizes?.s?.["add-price"] || "0",
    },
    {
      key: "m",
      name: "M",
      volume: jsonCard.sizes?.m?.size || "300 ml",
      price: jsonCard.sizes?.m?.["add-price"] || "0.5",
    },
    {
      key: "l",
      name: "L",
      volume: jsonCard.sizes?.l?.size || "400 ml",
      price: jsonCard.sizes?.l?.["add-price"] || "1",
    },
  ];

  sizesData.forEach((sizeInfo, index) => {
    const buttonSize = document.createElement("div");
    buttonSize.className = `size-button button-choise-size ${index === 0 ? "checked" : ""}`;
    buttonSize.setAttribute("data-price", sizeInfo.price);

    const circle = document.createElement("div");
    circle.classList.add("circle-btn");
    const circleText = document.createElement("p");
    circleText.textContent = sizeInfo.name;
    circle.appendChild(circleText);

    const textVolume = document.createElement("p");
    textVolume.className = `size-ml ${sizeInfo.key}`;
    textVolume.textContent = sizeInfo.volume;

    buttonSize.append(circle, textVolume);
    choiseSize.appendChild(buttonSize);
  });
  sizePosition.append(sizeTitle, choiseSize);

  const additivesPosition = document.createElement("div");
  additivesPosition.classList.add("additives-position");

  const additivesTitle = document.createElement("p");
  additivesTitle.textContent = "Additives";

  const choiseAdditives = document.createElement("div");
  choiseAdditives.classList.add("choise-size");

  const additivesData = jsonCard.additives || [
    { name: "Sugar", index: "1", class: "additives-one" },
    { name: "Cinnamon", index: "2", class: "additives-two" },
    { name: "Syrup", index: "3", class: "additives-three" },
  ];

  additivesData.forEach((add, idx) => {
    const addBtn = document.createElement("div");
    addBtn.classList.add("size-button", "button-additives");
    addBtn.setAttribute("data-price", add["add-price"] || "0.5");

    const circle = document.createElement("div");
    circle.classList.add("circle-btn");
    const circleText = document.createElement("p");
    circleText.textContent = add.index || (idx + 1).toString();
    circle.appendChild(circleText);

    const textAdd = document.createElement("p");
    textAdd.className = `size-ml ${add.class || ""}`;
    textAdd.textContent = add.name;

    addBtn.append(circle, textAdd);
    choiseAdditives.appendChild(addBtn);
  });
  additivesPosition.append(additivesTitle, choiseAdditives);

  const total = document.createElement("div");
  total.classList.add("total");

  const totalTitle = document.createElement("p");
  totalTitle.textContent = "Total:";

  const costPosition = document.createElement("div");
  costPosition.classList.add("cost-position");
  costPosition.textContent = `$${Number(jsonCard.price).toFixed(2)}`;

  total.append(totalTitle, costPosition);

  const lineOpacity = document.createElement("div");
  lineOpacity.classList.add("line-opacity");

  const infoLittleFont = document.createElement("div");
  infoLittleFont.classList.add("info-little-font");

  const infoImg = document.createElement("img");
  infoImg.src = "../../assets/icons/info-empty.svg";
  infoImg.setAttribute("alt", "info");

  const infoText = document.createElement("p");
  infoText.textContent =
    "The total price depends on the selected size and additives. After adding the item, you can review it in My order.";

  infoLittleFont.append(infoImg, infoText);

  const closeBtn = document.createElement("div");
  closeBtn.classList.add("close");
  closeBtn.textContent = "Close";

  infoContainer.append(
    namePosition,
    moreDetailPosition,
    sizePosition,
    additivesPosition,
    total,
    lineOpacity,
    infoLittleFont,
    closeBtn,
  );

  modal.append(modalImg, infoContainer);
  modalWrapper.appendChild(modal);
  document.body.append(modalWrapper);

  document.addEventListener("keydown", handleEscape);
  closeBtn.addEventListener("click", closeModal);
  modalWrapper.addEventListener("click", (event) => {
    if (event.target === modalWrapper) {
      closeModal();
    }
  });

  function closeModal() {
    modalWrapper.remove();
    document.body.style.overflowY = "auto";
    document.removeEventListener("keydown", handleEscape);
  }

  function handleEscape(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  return modalWrapper;
}

function showModal() {
  menu.addEventListener("click", (e) => {
    const card = e.target.closest(".menu-card");
    if (!card) return;

    const existingModal = document.querySelector(".modal-wrapper");
    if (existingModal) {
      existingModal.remove();
    }

    try {
      const cardData = JSON.parse(card.dataset.cardData);
      const modalWrapper = createModalCard(cardData);
      modalWrapper.style.display = "flex";
      document.body.style.overflowY = "hidden";
    } catch (error) {
      console.error(
        console.error("Ошибка при открытии модального окна:", error),
        error,
      );
    }
  });
}

function totalSizes() {
  let sum = 0;
  buttonSize.forEach((button) => {
    if (button.classList.contains("checked")) {
      sum = sum + Number.parseFloat(button.dataset.price);
    }
  });
  return sum;
}

function totalAdditives() {
  let sum = 0;
  buttonAdditives.forEach((button) => {
    if (button.classList.contains("checked")) {
      sum = sum + Number.parseFloat(button.dataset.price);
    }
  });
  return sum;
}

function newCost() {
  let totalSum = totalAdditives() + totalSizes() + startCost;
  const modalCost = modalWrapper.querySelector(".modal .cost-position");
  if (modalCost) modalCost.innerHTML = `$` + totalSum.toFixed(2);
}

// buttonSize.forEach((button) => {
//   button.addEventListener("click", function () {
//     buttonSize.forEach((btn) => btn.classList.remove("checked"));
//     this.classList.add("checked");
//     newCost();
//   });
// });

// buttonAdditives.forEach((button) => {
//   button.addEventListener("click", function () {
//     this.classList.toggle("checked");
//     newCost();
//   });
// });

buttonType.forEach((button) => {
  button.addEventListener("click", function () {
    buttonType.forEach((btn) => btn.classList.remove("checked"));
    this.classList.add("checked");
    currentProduct = this.dataset.type;
    createMenu(this.dataset.type);
  });
});

if (loadImg) {
  loadImg.addEventListener("click", () => {
    updateMenu(currentProduct);
  });
}

function updateMenu(type) {
  menu.innerHTML = "";
  let availableCards = data.filter((e) => e.category == type);
  availableCards.forEach((item) => {
    let b = createCard(item);
    menu.appendChild(b);
  });
  if (loadImg) loadImg.style.display = "none";
}

window.addEventListener("resize", checkWidth);

function checkWidth() {
  if (window.innerWidth !== windowWidth) {
    windowWidth = window.innerWidth;
    createMenu(currentProduct);
  }
}

createMenu(currentProduct);
