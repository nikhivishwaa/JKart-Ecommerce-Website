
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
}
else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

// JQuery
$('.divpr').on('click', 'button.cart', function () {
    let additem = this.id.toString();

    if (cart[additem] != undefined) {
        cart[additem] += 1;
        qtyButton();
    }
    else {
        cart[additem] = 1;
        qtyButton();
    }
    localStorage.setItem("cart", JSON.stringify(cart));
});
const qtyButton = () => {
    for (const key in cart) {
        var quantity_btn = `<button class='btn minus' id='minus${key}'>-</button><span id='qty${key}'>${cart[key]}</span><button class='btn plus' id='plus${key}'>+</button>`;
        document.getElementById(`div${key}`).innerHTML = quantity_btn;
    }
}

// if minus button is clicked
$('.divpr').on('click', 'button.minus', function () {
    let id = this.id.slice(5,);
    cart[id] = Math.max(0, (cart[id] - 1));
    if (!cart[id]) {
        document.getElementById('div' + id).innerHTML = `<button class="btn cart" id="${id}">Add to Cart</button>`;
        delete cart[id];
    }
    else document.getElementById(`qty${id}`).innerHTML = cart[id];
    localStorage.setItem('cart', JSON.stringify(cart));
});

// if plus button is clicked
$('.divpr').on('click', 'button.plus', function () {
    let id = this.id.slice(4,);
    cart[id] += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`qty${id}`).innerHTML = cart[id];
});

// Update total items count present in cart
const updateCart = () => {
    let count = document.getElementsByClassName('count');
    let _cart = Array.from(count);
    temp = JSON.parse(localStorage.getItem('cart'));
    let item = 0;
    for (const key in temp) {
        item += temp[key];
    }
    for (const i of _cart) {
        i.innerHTML = item.toString();
    }
}


let foo = () => { localStorage.clear(); }