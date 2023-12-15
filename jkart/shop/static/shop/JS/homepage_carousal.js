// If previos button is Clicked
$('a.prev').click(function () {
    console.log(this);
    let slide = this.id.slice(4,);
    let carousal = 'car' + slide.slice(0, Math.max(1, slide.search('-sl')));
    let arr = document.getElementsByClassName(carousal);
    arr = Array.from(arr);
    if (arr.length > 1) {
        let c = +slide.slice(slide.search('sl') + 2,);
        let x = c;
        if (c - 4 > -1) x -= 4;
        else x = 4 * (arr.length - 1)
        slide = slide.replace('sl' + c, 'sl' + x);
        for (const i of arr) {
            $('#' + i.id).css('display', 'none');
        }
        $('#car' + slide).css('display', 'flex');
    }
});

// If next button is Clicked
$('a.next').click(function () {
    console.log(this);
    let slide = this.id.slice(4,);
    let carousal = 'car' + slide.slice(0, Math.max(1, slide.search('-sl')));
    let arr = document.getElementsByClassName(carousal);
    arr = Array.from(arr);
    if (arr.length > 1) {
        let c = +slide.slice(slide.search('sl') + 2,);
        let x = c;
        x = Math.ceil(c / 4);
        if (x + 1 > arr.length) x = 0;
        else x = x * 4;
        slide = slide.replace('sl' + c, 'sl' + x);
        for (const i of arr) {
            $('#' + i.id).css('display', 'none');
        }
        $('#car' + slide).css('display', 'flex');
        console.log("car" + slide);
    }
});
