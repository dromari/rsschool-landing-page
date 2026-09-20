import data from './products.json' with {type: 'json'};
const menu = document.querySelector('.menu-cards-wrapper');
const buttonType = document.querySelectorAll('.drink-type-button');
const modalWrapper = document.querySelector('.modal-wrapper');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const loadImg = document.querySelector('.load-img');
const buttonSize = document.querySelectorAll('.button-choise-size');

const buttonAdditives = modal.querySelectorAll('.button-additives');
let windowWidth = window.innerWidth;
let currentProduct = 'coffee';


function createMenu(type = 'coffee') {
    let countCard = 0;
    menu.innerHTML = '';
    if (windowWidth <= 768) {
        let availableCards = data.filter(e => e.category == type);
        for (let i = countCard; i < 4; i++) {
            let b = createCard(availableCards[i]);
            menu.appendChild(b);
            countCard = i;
        }
        if (availableCards.length > countCard + 1) {
            loadImg.style.display = 'block';
        }
        else {
            loadImg.style.display = 'none';
        }
    }
    else {
        let availableCards = data.filter(e => e.category == type);
        for (let i = 0; i < availableCards.length; i++) {
            let b = createCard(availableCards[i]);
            menu.appendChild(b);
        }
    }
}

function createCard(jsonCard) {
    const menuCard = document.createElement('div');
    menuCard.classList.add('menu-card');

    const menuCardImgContainer = document.createElement('div');
    menuCardImgContainer.classList.add('menu-card-img-container');
    const imgMenuCardImgContainer = document.createElement('img');
    imgMenuCardImgContainer.src = jsonCard.url;
    imgMenuCardImgContainer.setAttribute('alt', jsonCard.category);
    menuCardImgContainer.appendChild(imgMenuCardImgContainer);

    const discriptionPosition = document.createElement('div');
    discriptionPosition.classList.add('discription-position');
    const namePosition = document.createElement('div');
    namePosition.classList.add('name-position');
    namePosition.innerHTML = jsonCard.name;
    const moreDetailPosition = document.createElement('div');
    moreDetailPosition.classList.add('more-detail-position');
    moreDetailPosition.innerHTML = jsonCard.description;
    const costPosition = document.createElement('div');
    costPosition.classList.add('cost-position');
    costPosition.innerHTML = '$' + jsonCard.price;

    menuCard.appendChild(menuCardImgContainer);
    menuCard.appendChild(discriptionPosition);
    discriptionPosition.appendChild(namePosition);
    discriptionPosition.appendChild(moreDetailPosition);
    discriptionPosition.appendChild(costPosition);

    menuCard.addEventListener('click', showModal);
    return menuCard;
}


function showModal() {
    const namePosition = this.querySelector('.name-position').innerHTML;
    const dataJson = data.filter(e => e.name == namePosition);
    modal.querySelector('.menu-card-img').src = dataJson[0].url;
    modal.querySelector('.name-position').innerHTML = dataJson[0].name;
    modal.querySelector('.more-detail-position').innerHTML = dataJson[0].description;
    modal.querySelector('.s').innerHTML = dataJson[0].sizes.s.size;
    modal.querySelector('.m').innerHTML = dataJson[0].sizes.m.size;
    modal.querySelector('.l').innerHTML = dataJson[0].sizes.l.size;
    modal.querySelector('.additives-one').innerHTML = dataJson[0].additives[0].name;
    modal.querySelector('.additives-two').innerHTML = dataJson[0].additives[1].name;
    modal.querySelector('.additives-three').innerHTML = dataJson[0].additives[2].name;
    modal.querySelector('.cost-position').innerHTML = `$` + dataJson[0].price;
    startCost = Number.parseFloat(dataJson[0].price);
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalWrapper.style.display = 'none';
        document.body.style.overflowY = 'auto';
        buttonSize.forEach(button => {
            button.classList.remove('checked');
        });
        buttonAdditives.forEach(button => {
            button.classList.remove('checked');
        });
    })
    modalWrapper.addEventListener('click', (e) => {
        if (e.target == modalWrapper) {
            modal.style.display = 'none';
            modalWrapper.style.display = 'none';
            document.body.style.overflowY = 'auto';
            buttonSize.forEach(button => {
                button.classList.remove('checked');
            });
            buttonAdditives.forEach(button => {
                button.classList.remove('checked');
            });
        }
    })
    buttonSize[0].classList.add('checked');
    modalWrapper.style.display = 'flex';
    modal.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
}
createMenu();

buttonType.forEach(button => {
    button.addEventListener('click', function () {
        buttonType.forEach(button => {
            button.classList.remove('checked');
        })
        this.classList.add('checked');
        currentProduct = this.dataset.type;
        createMenu(this.dataset.type);
    })
})

window.addEventListener('resize', checkWidth);

function checkWidth() {
    windowWidth = window.innerWidth;
    createMenu(currentProduct);
}

loadImg.addEventListener('click', () => {
    updateMenu(currentProduct);
})

function updateMenu(type) {
    menu.innerHTML = '';
    let availableCards = data.filter(e => e.category == type);
    for (let i = 0; i < availableCards.length; i++) {
        let b = createCard(availableCards[i]);
        menu.appendChild(b);
    }
    loadImg.style.display = 'none';
}

buttonSize.forEach(button => {
    button.addEventListener('click', function () {
        buttonSize.forEach(button => {
            button.classList.remove('checked');
        })
        this.classList.add('checked');
        newCost();
    })
})

buttonAdditives.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('checked');
        newCost();
    })
})

/*---------*/
let startCost = 0;

function totalSizes() {
    let sum = 0;
    buttonSize.forEach(button => {
        if (button.classList.contains('checked')) {
            sum = sum + Number.parseFloat(button.dataset.price);
        }
    })
    return sum;
}

function totalAdditives() {
    let sum = 0;
    buttonAdditives.forEach(button => {
        if (button.classList.contains('checked')) {
            sum = sum + Number.parseFloat(button.dataset.price);
        }
    })
    return sum;
}

function newCost() {
    let totalSum = totalAdditives() + totalSizes() + startCost;
    modal.querySelector('.cost-position').innerHTML = `$` + totalSum.toFixed(2);
}



