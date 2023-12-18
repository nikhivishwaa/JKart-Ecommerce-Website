
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
        cart[additem][0] += 1;
        adjustButton(additem);
    }
    else {
        let name = document.getElementById("title" + additem).innerHTML;
        cart[additem] = [1, name];
        adjustButton(additem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
});

const adjustButton = (key) => {
    if (cart[key] != undefined) {
        var quantity_btn = `<button class='btn minus' id='minus${key}'>-</button><span id='qty${key}' class='value'>${cart[key][0]}</span><button class='btn plus' id='plus${key}'>+</button>`;
        document.getElementById(`div${key}`).innerHTML = quantity_btn;
        updateCart();
    }
}
const qtyButton = () => {
    for (const key in cart) {
        adjustButton(key);
    }
}

// if minus button is clicked
$('.divpr').on('click', 'button.minus', function () {
    let id = this.id.slice(5,);
    cart[id][0] = Math.max(0, (cart[id][0] - 1));
    if (!cart[id][0]) {
        document.getElementById('div' + id).innerHTML = `<button class="btn cart" id="${id}">Add to Cart</button>`;
        delete cart[id];
    }
    else document.getElementById(`qty${id}`).innerHTML = cart[id][0];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
});

// if plus button is clicked
$('.divpr').on('click', 'button.plus', function () {
    let id = this.id.slice(4,);
    cart[id][0] += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`qty${id}`).innerHTML = cart[id][0];
    updateCart();
});

// Update total items count present in cart
const updateCart = () => {
    let count = document.getElementsByClassName('count');
    let _cart = Array.from(count);
    let item = 0;
    for (const key in cart) {
        item += cart[key][0];
    }
    for (const i of _cart) {
        i.innerHTML = item.toString();
    }
    updatePopover();
}

const updatePopover = () => {
    let x = document.getElementById('popover');
    x.innerHTML = "";
    let elem = 0;
    for (const key in cart) {
        let element = `<div class="prod"><div>${cart[key][1].slice(0, 15)}</div><div>|</div><div>Qty. ${cart[key][0]}</div></div>`;
        x.innerHTML += element;
        elem++;
    }
    if (elem) {
        let btns = `<div class="popover-button"><button class="btn" onclick="foo()">Clear Cart</button><a href="/shop/checkout"><button class="btn">Checkout</button></a><div>`
        x.innerHTML += btns;
    }
    else x.innerHTML = `<div class="prod"><span>Cart is Empty Please add Items</span></div>`;
}

const foo = () => {
    for (const key in cart) {
        document.getElementById('div' + key).innerHTML = `<button class="btn cart" id="${key}">Add to Cart</button>`;
        delete cart[key];
    }
    updateCart();
}
