// Initialize the wishlist from localStorage if it exists, otherwise set it as an empty array
let wishlist = localStorage.getItem("wishlist") ?
    JSON.parse(localStorage.getItem("wishlist")) :
    [];

// Function to add an item to the wishlist
export function addToWishlist(item, wishlistIncrease) {
    // Check if the item already exists in the wishlist
    const exists = wishlist.some((value) => value.title === item.title);

    // If the item does not exist, increase the wishlist counter and add the item to the wishlist
    if (!exists) {
        wishlistIncrease();
        wishlist.push(item);
    }

    // Update the wishlist in localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Function to update the entire wishlist
export function updateWishlist(list) {
    // Update the wishlist in localStorage
    localStorage.setItem("wishlist", JSON.stringify(list));
    // Update the wishlist variable and return it
    return (wishlist = list);
}

// Function to get the current wishlist
export function getList() {
    return wishlist;
}