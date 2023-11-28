import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { catalogList, countAmount, modalProductBtn, orderCount, orderList, orderTotalAmount } from "./elements.js";
import { getData } from "./getData.js";

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
    const allIdProduct = cartList.map(item => item.id);
    const data = cartList.length
        ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`) 
        : [];

    const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);
    orderCount.textContent = countProduct;

    const countTotalAmount = cartList.reduce((acc, item) => {
        const currenProduct = data.find(pr => pr.id === item.id);
        return acc + currenProduct.price*item.count;
    }, 0);
    orderTotalAmount.textContent = countTotalAmount;

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
                <button class="count__minus">-</button>

                <p class="count__amount">${product.count}</p>

                <button class="count__plus">+</button>
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

    const product = cartList[productIndex];
    if (product.count > 1) {
        product.count -= 1;
    } else {
        cartList.splice(productIndex, 1);
        console.log('cartList: ', cartList);
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
        if (target.closest('.count__plus')) {
            addCart(target.closest('.order__item').dataset.idProduct);
        }

        if (target.closest('.count__minus')) {
            const targetId = target.closest('.order__item').dataset.idProduct;
            removeCart(target.closest('.order__item').dataset.idProduct);
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
}