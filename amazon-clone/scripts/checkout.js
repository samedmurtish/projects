import * as cartManager from '../data/cart.js'

import { format } from './formatCurrency.js';

const productsHTML = document.querySelector('.order-summary');

const totalItemsPriceHTML = document.querySelector('.js-item-total-price'),
    itemTotalShippingPriceHTML = document.querySelector('.js-item-total-shipping'),
    totalPriceBeforeTaxHTML = document.querySelector('.js-total-price-before-tax'),
    priceTaxHTML = document.querySelector('js-price-tax'),
    totalPriceHTML = document.querySelector('js-total-price');

const cartQuantityHTML = document.querySelectorAll('.js-cart-quantity');

let cartCount = localStorage.getItem('cartCount') ? localStorage.getItem('cartCount') : 0;

let totalPrice = 0;

cartQuantityHTML.forEach(value => {
    value.innerHTML = Number(cartCount);
});

cartManager.cart.forEach((product) => {
    productsHTML.innerHTML += `
	<div class="cart-item-container">
		<div class="delivery-date">
		Delivery date: Tuesday, June 21
		</div>
		
		<div class="cart-item-details-grid">
			<img class="product-image"
			src="${product.image}">
			
			<div class="cart-item-details">
				<div class="product-name">
				${product.name}
				</div>
				<div class="product-price">
				$${product.priceCents}
				</div>
				<div class="product-quantity">
				<span>
				Quantity: <span class="quantity-label">${product.quantity}</span>
				</span>
				<span class="update-quantity-link link-primary">
				Update
				</span>
				<span class="delete-quantity-link link-primary">
				Delete
				</span>
			</div>
		</div>
		
		<div class="delivery-options">
			<div class="delivery-options-title">
			Choose a delivery option:
			</div>

			<div class="delivery-option">
				<input type="radio" checked
				class="delivery-option-input-${product.id}"
				name="delivery-option-${product.id}"
				onclick="${calculateOrderSummary()}">
			
				<div>
					<div class="delivery-option-date">
						Tuesday, June 21
					</div>
					<div class="delivery-option-price">
						FREE Shipping
					</div>
				</div>
			</div>
			<div class="delivery-option">
				<input type="radio"
				class="delivery-option-input-${product.id}"
				name="delivery-option-${product.id}">
				<div>
					<div class="delivery-option-date">
						Wednesday, June 15
					</div>
					<div class="delivery-option-price">
						$4.99 - Shipping
					</div>
				</div>
			</div>
			<div class="delivery-option">
				<input type="radio"
				class="delivery-option-input-${product.id}"
				name="delivery-option-${product.id}"
				onclick="">
				<div>
					<div class="delivery-option-date">
						Monday, June 13
					</div>
					<div class="delivery-option-price">
						$9.99 - Shipping
					</div>
				</div>
			</div>
		</div>
	</div>`;
});

calculateOrderSummary();

function calculateOrderSummary() {
    let deliveryOptionInputHTML;
    console.log('update');
    cartManager.cart.forEach(value => {
        totalPrice = Number(value.priceCents * 100) + totalPrice;

        document.querySelectorAll('.delivery-option-input-' + value.id).forEach((value, index) => {

            //console.log(value);

            if (value.checked) {
                value.addEventListener('onchange', () => {
                    console.log('changed = ', index);
                })
                console.log('checked = ', index);
            }
        });
    });

    totalItemsPriceHTML.innerHTML = '$' + format(totalPrice);
}