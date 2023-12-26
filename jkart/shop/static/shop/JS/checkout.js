
// if minus button is clicked
$('.review').on('click', 'button.minus', function () {
    let id = this.id.slice(5,);
    cart[id][0] = Math.max(0, (cart[id][0] - 1));
    if (!cart[id][0]) {
        document.getElementById('div' + id).innerHTML = `<button class="btn cart" id="${id}">Removing</button>`;
        setTimeout(() => {
            if (cart[id] == undefined) document.getElementById(id).remove();
        }, 2000)
        delete cart[id];
    }
    else document.getElementById(`qty${id}`).innerHTML = cart[id][0];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateBill();
    emptyCheckout();
});

// if plus button is clicked
$('.review').on('click', 'button.plus', function () {
    let id = this.id.slice(4,);
    cart[id][0] += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`qty${id}`).innerHTML = cart[id][0];
    updateCart();
    updateBill();
});

const fillCheckoutPage = () => {
    let x = document.getElementById('review');
    for (const key in cart) {
        let review = `<div class="list-product" id="${key}">
            <div class="prod-name">${cart[key][1]}</div>
            <div class="divpr" id="div${key}">
            <button class='btn minus' id='minus${key}'>-</button><span id='qty${key}' class='value'>${cart[key][0]}</span><button class='btn plus' id='plus${key}'>+</button>
            </div>
        </div>`
        x.innerHTML += review;
    }
    let total = `<div class="subtotal">Total Order Value: <b>RS. <span id="totalPrice"></span>/-<b></div>`;
    x.innerHTML += total;
    updateBill();
    emptyCheckout();
}

function updateBill() {
    let totalPrice = 0;
    for (const key in cart) {
        totalPrice += cart[key][0] * cart[key][2];
    }
    document.getElementById("totalPrice").innerHTML = totalPrice;
    $("#amount").val(totalPrice);
}