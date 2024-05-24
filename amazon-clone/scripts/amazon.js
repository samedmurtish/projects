import * as productsManager from "../data/products.js"

import * as cartManager from "../data/cart.js"

import { format } from "../scripts/formatCurrency.js"

const cartQuantityHTML = document.querySelector('.js-cart-quantity');

let productsHTML = '';
let cartCount = localStorage.getItem('cartCount') ? localStorage.getItem('cartCount') : 0;

cartQuantityHTML.innerHTML = cartCount;

productsManager.products.forEach((product) => {
    productsHTML += `
		<div class="product-container" data-product-id="${product.id}">
			<div class="product-image-container">
			<img class="product-image"
				src="${product.image}">
			</div>

			<div class="product-name limit-text-to-2-lines">
			${product.name}
			</div>

			<div class="product-rating-container">
			<img class="product-rating-stars"
				src="images/ratings/rating-${product.rating.stars * 10}.png">
			<div class="product-rating-count link-primary">
				${product.rating.count}
			</div>
			</div>

			<div class="product-price">
			$${format(product.priceCents)}
			</div>

			<div class="product-quantity-container">
			<select class="product-select" data-product-id="${product.id}">
				<option selected value="1">1</option> 
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
			</select>
			</div>
			
			<div class="product-spacer"></div>

			<div class="added-to-cart">
			<img src="images/icons/checkmark.png">
			Added
			</div>
		
			<button class="add-to-cart-button button-primary js-add-to-cart"
			data-product-id="${product.id}">
			Add to Cart 
			</button>
		</div>
		`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach(productButton => {
    productButton.addEventListener('click', () => {
        let optionValue = 1,
            isMatchedProduct = false,
            matchingProductIndex;


        document.querySelectorAll('.product-select').forEach(quantity => {
            if (quantity.dataset.productId == productButton.dataset.productId) {
                optionValue = quantity.value;
            }
        });

        cartManager.cart.forEach((value, index) => {
            if (value.id == productButton.dataset.productId) {
                isMatchedProduct = true;
                matchingProductIndex = index;
            }
        });
        if (!isMatchedProduct)
            productsManager.products.forEach(product => {
                if (product.id == productButton.dataset.productId) {
                    console.log(product.id);
                    cartManager.cart.push({
                        id: product.id,
                        quantity: optionValue,
                        name: product.name,
                        priceCents: format(product.priceCents),
                        image: product.image
                    });
                }
            });
        else {
            cartManager.cart[matchingProductIndex].quantity = Number(cartManager.cart[matchingProductIndex].quantity) + Number(optionValue);
        }

        cartCount = Number(cartQuantityHTML.innerHTML) + Number(optionValue);

        localStorage.setItem('cartCount', cartCount);

        document.querySelector('.js-cart-quantity').innerHTML = cartCount;

        cartManager.saveCart();
    });
});