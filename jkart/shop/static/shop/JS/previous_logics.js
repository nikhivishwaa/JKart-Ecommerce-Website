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