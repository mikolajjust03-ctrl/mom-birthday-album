let x = 1;
let y = 1;

function move() {
    window.scrollTo({
        left: x * window.innerWidth,
        top: y * window.innerHeight,
        behavior: "smooth"
    });
}

// keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") y--;
    if (e.key === "ArrowDown") y++;
    if (e.key === "ArrowLeft") x--;
    if (e.key === "ArrowRight") x++;

    x = Math.max(0, Math.min(2, x));
    y = Math.max(0, Math.min(2, y));

    move();
});