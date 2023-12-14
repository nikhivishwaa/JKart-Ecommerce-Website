
let active = 0;
let slides = document.querySelectorAll('.carousal ul');
let items = document.getElementsByClassName('items');

function nextSlide() {
    if (active < slides.length - 1) {
        slides[active].style.display = "none";
        active++;
        slides[active].style.display = "flex";
    }
    else {
        slides[active].style.display = "none";
        slides[0].style.display = "flex";
        active = 0;
    }
}
function prevSlide() {
    if (active > 0) {
        slides[active].style.display = "none";
        active--;
        slides[active].style.display = "flex";
    }
    else {
        slides[active].style.display = "none";
        slides[slides.length - 1].style.display = "flex";
        active = slides.length - 1;
    }
}
// add to cart logic

if (localStorage.getItem('cart') == null) {
    var cart = {};
    console.log("cart");
}
else {
    cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
}

// JQuery
$('.cart').click(function () {
    console.log("clicked");
    let additem = this.id.toString();
    console.log(additem);

    if (cart[additem] != undefined) {
        cart[additem] += 1;
        qtyButton(additem);
    }
    else {
        cart[additem] = 1;
        qtyButton(additem);
    }
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
});
const qtyButton = () => {
    for (const key in cart) {
        let a = key.slice(2,);
        var quantity_btn = `<button class='btn minus' id='minus${a}'>-</button><span id='qty${a}'>${cart['pr' + a]}</span><button class='btn plus' id='plus${a}'>+</button>`;
        document.getElementById(`atc${a}`).innerHTML = quantity_btn;
    }
}

$('.minus').click(function () {
    let id = this.id.slice(6,);
    console.log(id, 'minus clicked');
    cart['pr' + id] = Math.max(0, (cart['pr' + id] - 1));
    let qty = cart['pr' + id];
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`qty${a}`).innerHTML = qty;
});

// Update total items count present in cart
const updateCart = () => {
    let count = document.getElementsByClassName('count');
    console.log(count);
    let _cart = Array.from(count);
    temp = JSON.parse(localStorage.getItem('cart'));
    let item = 0;
    for (const key in temp) {
        item += temp[key];
    }
    console.log(item);
    for (const i of _cart) {
        i.innerHTML = item.toString();
    }
}


let foo = () => { localStorage.clear(); }