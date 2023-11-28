import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { catalogList, countAmount, modalDelivery, modalProductBtn, order, orderCount, orderList, orderSubmit, orderTotalAmount, orderWrapTitle } from "./elements.js";
import { getData } from "./getData.js";
import { orderController } from "./orderController.js";

export const getCart = () => {
    const cartList = localStorage.getItem('cart');
    if (cartList) {
        return JSON.parse(cartList);
    } else {
        return [];
    }
};

const renderCartList = async () => {
    const cartList = getCart();
    orderSubmit.disabled = !cartList.length;

    const allIdProduct = cartList.map(item => item.id);
    const data = cartList.length
        ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`) 
        : [];

    const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);
    orderCount.textContent = countProduct;

    orderTotalAmount.textContent = cartList.reduce((acc, item) => {
        const currentProduct = data.find(pr => pr.id === item.id);
        return acc + (currentProduct.price * item.count);
    }, 0);

    const cartItems = data.map(item => {
        const li = document.createElement('li');
        li.classList.add('order__item');
        li.dataset.idProduct = item.id;

        const product = cartList.find((cartItem => cartItem.id === item.id));
        li.innerHTML = `
            <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image">

            <div class="order__product">
                <h3 class="order__product-title">${item.title}</h3>

                <p class="order__product-weight">${item.weight}г</p>

                <p class="order__product-price">${item.price}₽</p>
            </div>

            <div class="order__product-count count">
                <button class="count__minus" data-id-product=${product.id}>-</button>

                <p class="count__amount">${product.count}</p>

                <button class="count__plus" data-id-product=${product.id}>+</button>
            </div>
        `;

        return li;
    });

    orderList.textContent = '';
    orderList.append(...cartItems);
};

const updateCartList = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList));
    renderCartList();
};

const addCart = (id, count = 1) => {
    const cartList = getCart();
    const product = cartList.find((item) => item.id === id);

    if (product) {
        product.count += count;
    } else {
        cartList.push({id, count});
    }

    updateCartList(cartList);
};

const removeCart = (id) => {
    const cartList = getCart();
    const productIndex = cartList.findIndex((item) => item.id === id);

    cartList[productIndex].count -= 1;
    if (cartList[productIndex].count < 1) {
        cartList.splice(productIndex, 1);
    }

    updateCartList(cartList);
};

const cartController = () => {
    catalogList.addEventListener('click', ({target}) => {
        if (target.closest('.product__add')) {
            addCart(target.closest('.product').dataset.idProduct);
        }
    })

    orderList.addEventListener('click', ({target}) => {
        const targetPlus = target.closest('.count__plus');
        const targetMinus = target.closest('.count__minus');

        if (targetPlus) {
            addCart(targetPlus.dataset.idProduct);
        }

        if (targetMinus) {
            removeCart(targetMinus.dataset.idProduct);
        }
    })

    orderWrapTitle.addEventListener('click', () => {
        order.classList.toggle('order_open');
    })

    orderSubmit.addEventListener('click', () => {
        modalDelivery.classList.add('modal_open');
    })

    modalDelivery.addEventListener('click', ({target}) => {
        if (target.closest('.modal__close') || modalDelivery === target) {
            modalDelivery.classList.remove('modal_open');
        }
    })

    modalProductBtn.addEventListener('click', () => {
        addCart(
            modalProductBtn.dataset.idProduct, 
            parseInt(countAmount.textContent)
            );
    })

};

export const cartInit = () => {
    cartController();
    renderCartList();
    orderController();
}