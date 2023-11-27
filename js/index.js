import { modalProduct, catalogList } from "./elements.js"
import { navigationListController } from "./navigationListController.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";

//тестовые данные
const burgerMax = {
    title: 'Бургер Макс',
    price: 10000,
    weight: 5000,
    calories: 15000,
    descriptions: 'Огромный бургер, съешь сам или поделись с компанией',
    image: 'img/megaburger.jpg',
    ingredients: [
        'Пшеничная булочка',
        'Мега котлета из говядины',
        'Много сыра',
        'Листья салата',
        'Чипотл'
    ]
};


// обработка клика внутри всех карточек по '.product__detail'
catalogList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.product__detail') || target.closest('.product__image')) {
        openModal(burgerMax);
    }
});

//обработка клика в модалке. Закрываем, если на элементе или выше есть класс modal__close
modalProduct.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.modal__close') || target === modalProduct) {
        modalProduct.classList.remove('modal_open');
    }
})

const init = () => {
    renderListProduct();
    navigationListController(renderListProduct);
};

init();