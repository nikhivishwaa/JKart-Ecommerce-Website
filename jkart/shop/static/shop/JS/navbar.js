
// add to cart logic

if (localStorage.getItem('cart') == null) {
    var cart = {};
}
else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

// Update total items count present in cart
function updateCart() {
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

function updatePopover() {
    let x = document.getElementById('popover');
    x.innerHTML = "";
    let elem = 0;
    for (const key in cart) {
        let element = `<div class="prod"><div>${cart[key][1].slice(0, 15)}</div><div>|</div><div>Qty. ${cart[key][0]}</div></div>`;
        x.innerHTML += element;
        elem++;
    }
    if (elem) {
        let btns = `<div class="popover-button"><button class="btn" onclick="clearCart()">Clear Cart</button><a href="/shop/checkout"><button class="btn">Checkout</button></a><div>`
        x.innerHTML += btns;
    }
    else x.innerHTML = `<div class="prod"><span>Cart is Empty Please add Items</span></div>`;
}

function clearCart() {
    let x = document.location.pathname.slice(1,);
    let loc = ['shop/', 'checkout', "products"];
    if (x == loc[0] || x.indexOf(loc[1]) > 1) {
        for (const key in cart) {
            document.getElementById('div' + key).innerHTML = `<button class="btn cart" id="${key}">Add to Cart</button>`;
            delete cart[key];
        }
    }
    else cart = {};
    if (x.indexOf(loc[2]) > 1) {
        let id = "pr" + x[x.length - 1];
        document.getElementById('div' + id).innerHTML = `<button class="btn cart" id="${id}">Add to Cart</button>`;
    }
    else if (x.indexOf(loc[1]) > 1) {
        emptyCheckout();
    }
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function emptyCheckout() {
    if (Object.keys(cart).length === 0) {
        let sigma = `<div class="display-status">
            <div class="alert-box">
                <h3>Please Add Items into Your Cart</h3>
                <h3>To Checkout</h3>
            </div>
        </div>`;
        document.getElementById("place-order").innerHTML = sigma;
    }
}

// add items to cart

function adjustButton(key) {
    if (cart[key] != undefined) {
        var quantity_btn = `<button class='btn minus' id='minus${key}'>-</button><span id='qty${key}' class='value'>${cart[key][0]}</span><button class='btn plus' id='plus${key}'>+</button>`;
        document.getElementById(`div${key}`).innerHTML = quantity_btn;
        updateCart();
    }
}
function qtyButton() {
    for (const key in cart) {
        adjustButton(key);
    }
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
        let price = document.getElementById("price" + additem).innerHTML;
        cart[additem] = [1, name, parseInt(price)];
        adjustButton(additem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
});

