// Initialize the cart from localStorage if it exists, otherwise set it as an empty array
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// Function to add an item to the cart
export function addToCart(item, cartIncrease) {
  // Check if the item already exists in the cart
  const exists = cart.some((value) => value.title === item.title);

  // If the item does not exist, increase the cart counter and add the item to the cart
  if (!exists) {
    cartIncrease();
    item.quantity = 1;
    cart.push(item);
  } else {
    item.quantity = item.quantity + 1;
    console.log(item);
  }

  // Update the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the entire cart
export function updateCart(list) {
  // Update the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(list));
  // Update the cart variable and return it
  return (cart = list);
}

// Function to get the current cart
export function getList() {
  return cart;
}
