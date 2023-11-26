import { 
    ingredientsList,
    modalProduct,
    modalProductTitle, 
    modalProductImage, 
    modalProductDescription, 
    ingredientsCalories, 
    modalProductPriceCount 
} from "./elements.js";


export const openModal = (product) => {

    modalProductTitle.textContent = product.title;
    modalProductDescription.textContent = product.descriptions;
    modalProductPriceCount.textContent = product.price;
    modalProductImage.src = product.image;
    ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;

    ingredientsList.textContent = '';
    const ingredientsListItem = product.ingredients.map((item) => {
        const li = document.createElement('li');
        li.classList.add('ingredients__item');
        li.textContent = item;

        return li;
    });
    ingredientsList.append(...ingredientsListItem); // точки, чтобы вытащить li из массива

    modalProduct.classList.add('modal_open');
};