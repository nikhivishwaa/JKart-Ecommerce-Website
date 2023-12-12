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