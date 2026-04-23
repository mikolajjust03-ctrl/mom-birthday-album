let x = 0;
let y = 0;

let mode = "free"; // free, vertical, horizontal

const MIN_X = -2;
const MAX_X = 3;
const MIN_Y = -4;
const MAX_Y = 3;

function updatePosition() {
    document.querySelectorAll(".section").forEach(sec => {
        const sx = parseInt(sec.dataset.x);
        const sy = parseInt(sec.dataset.y);

        const offsetX = (sx - x) * window.innerWidth;
        const offsetY = (sy - y) * window.innerHeight;

        sec.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });

    // IMPORTANT: unlock directions automatically at center
    if (x === 0 && y === 0) {
        mode = "free";
    }

    updateMinimap();
}

function updateMinimap() {
    const dot = document.getElementById("dot");

    const mapX = ((x - MIN_X) / (MAX_X - MIN_X)) * 100;
    const mapY = ((y - MIN_Y) / (MAX_Y - MIN_Y)) * 100;

    dot.style.left = mapX + "%";
    dot.style.top = mapY + "%";
}

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "b") {
        x = 0;
        y = 0;
        mode = "free";
        updatePosition();
        return;
    }

    if (mode === "free") {
        if (e.key === "ArrowUp" && y > MIN_Y) {
            y--;
            mode = "vertical";
        }
        if (e.key === "ArrowDown" && y < MAX_Y) {
            y++;
            mode = "vertical";
        }
        if (e.key === "ArrowLeft" && x > MIN_X) {
            x--;
            mode = "horizontal";
        }
        if (e.key === "ArrowRight" && x < MAX_X) {
            x++;
            mode = "horizontal";
        }
    } else if (mode === "vertical") {
        if (e.key === "ArrowUp" && y > MIN_Y) y--;
        if (e.key === "ArrowDown" && y < MAX_Y) y++;
    } else if (mode === "horizontal") {
        if (e.key === "ArrowLeft" && x > MIN_X) x--;
        if (e.key === "ArrowRight" && x < MAX_X) x++;
    }

    updatePosition();
});


// ================= LIGHTBOX =================
const images = document.querySelectorAll("img");

images.forEach(img => {
    img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "lightbox";

        const bigImg = document.createElement("img");
        bigImg.src = img.src;
        bigImg.className = "lightbox-img";

        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });
    });
});

// init
updatePosition();