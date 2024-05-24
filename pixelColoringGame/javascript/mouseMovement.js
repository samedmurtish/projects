// resize color panel

const BORDER_SIZE = 50;
const panel = document.getElementById("right-panel");
const button = document.querySelector('.color-tab-drag');

let m_pos;


function resize(e) {
    const dx = m_pos - e.x;
    m_pos = e.x;

    let panelWidth = (parseInt(getComputedStyle(panel, '').width) + dx);

    panel.style.width = panelWidth + "px";
    if (panelWidth >= 238 && panelWidth < 2000)
        button.style.right = panelWidth + 13 + "px";
}

button.addEventListener("mousedown", function(e) {
    if (e.offsetX < BORDER_SIZE) {
        m_pos = e.x;
        document.addEventListener("mousemove", resize, false);
    }
}, false);

document.addEventListener("mouseup", function() {
    document.removeEventListener("mousemove", resize, false);
}, false);

// draw container movement

var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = {
        x: 0,
        y: 0
    },
    zoom = document.querySelector(".move-panel");

function setTransform() {
    zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}
zoom.onmousedown = function(e) {
    if (e.button == 2) {
        start = {
            x: e.clientX - pointX,
            y: e.clientY - pointY
        };
        panning = true;
    }
}
zoom.onmouseup = function(e) {
    panning = false;
}
zoom.onmouseleave = function(e) {
    panning = false;
}
zoom.onmousemove = function(e) {
    if (!panning) {
        return;
    }
    pointX = (e.clientX - start.x);
    pointY = (e.clientY - start.y);
    setTransform();
}
zoom.onwheel = function(e) {
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (scale *= 1.1) : (scale /= 1.1);
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    setTransform();
}