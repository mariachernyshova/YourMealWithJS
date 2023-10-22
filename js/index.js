const modalProduct = document.querySelector('.modal_product'); // модалка продукта
const catalogList = document.querySelector('.catalog__list'); // список продуктов

//тестовые данные
const product = {
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

const modalProductTitle = document.querySelector('.modal-product__title');
const modalProductImage = document.querySelector('.modal-product__image');
const modalProductDescription = document.querySelector('.modal-product__description');
const ingredientsList = document.querySelector('.ingredients__list');
const ingredientsCalories = document.querySelector('.ingredients__calories');
const modalProductPriceCount = document.querySelector('.modal-product__price-count');

modalProductTitle.textContent = product.title;
modalProductDescription.textContent = product.descriptions;
modalProductPriceCount.textContent = product.price;
modalProductImage.src = product.image;

let weight = product.weight;
let calories = product.calories;
let infoWeightCalories = weight + 'г, ккал ' + calories;
ingredientsCalories.textContent = infoWeightCalories;

ingredientsList.textContent = '';
const ingredientsListItem = product.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;

    return li;
});
ingredientsList.append(...ingredientsListItem); // точки, чтобы вытащить li из массива



// обработка клика внутри всех карточек по '.product__detail'
catalogList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.product__detail')) {
        modalProduct.classList.add('modal_open');
    }
});

//обработка клика в модалке. Закрываем, если на элементе или выше есть класс modal__close
modalProduct.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.modal__close') || target === modalProduct) {
        modalProduct.classList.remove('modal_open');
    }
})