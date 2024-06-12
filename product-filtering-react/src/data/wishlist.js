let wishlist = localStorage.key("wishlist") ?
    JSON.parse(localStorage.getItem("wishlist")) :
    [];

export function addToWishlist(item, wishlistIncrease) {
    //localStorage.setItem("wishlistItem-" + item.id, item);
    const exists = wishlist.some((value) => value.title === item.title);

    !exists && wishlistIncrease();

    !exists && wishlist.push(item);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

export function updateWishlist(list) {
    localStorage.setItem("wishlist", JSON.stringify(list));
    return (wishlist = list);
}

export function getList() {
    return wishlist;
}