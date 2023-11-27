import { cartInit } from "./cart.js";
import { modalProduct, catalogList } from "./elements.js"
import { navigationListController } from "./navigationListController.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";

// обработка клика внутри всех карточек по '.product__detail'
catalogList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.product__detail') || target.closest('.product__image')) {
        const id = target.closest('.product').dataset.idProduct;
        openModal(id);
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
    cartInit();
};

init();