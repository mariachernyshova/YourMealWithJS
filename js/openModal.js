import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { 
    ingredientsList,
    modalProduct,
    modalProductTitle, 
    modalProductImage, 
    modalProductDescription, 
    ingredientsCalories, 
    modalProductPriceCount 
} from "./elements.js";
import { getData } from "./getData.js";


export const openModal = async (id) => {
    const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`)

    modalProductTitle.textContent = product.title;
    modalProductDescription.textContent = product.description;
    modalProductPriceCount.textContent = product.price;
    modalProductImage.src = `${API_URL}/${product.image}`;
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