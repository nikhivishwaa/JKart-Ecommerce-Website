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