export let cart = [];

if (localStorage.getItem('cart')) {
    cart = loadCart();
}

export function saveCart() {
    return localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCart() {
    return JSON.parse(localStorage.getItem('cart'));
}