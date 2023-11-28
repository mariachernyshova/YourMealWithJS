import { modalDeliveryForm } from "./elements.js"

export const orderController = () => {
    modalDeliveryForm.addEventListener('change', () => {
        if (modalDeliveryForm.format.value === 'pickup') {
            modalDeliveryForm['address-info'].classList.add('modal-delivery__fieldset-input_hide');
        }
        if (modalDeliveryForm.format.value === 'delivery') {
            modalDeliveryForm['address-info'].classList.remove('modal-delivery__fieldset-input_hide');
        }
    })
}