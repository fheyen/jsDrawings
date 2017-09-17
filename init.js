function init() {
    const contentContainer = document.getElementById("content");
    // clear
    contentContainer.innerHTML = "";

    const conf = {
        width: 500,
        height: 500,
        margin: 10
    };



    const yinyang = new YinYang(
        contentContainer,
        conf.width,
        conf.height,
        conf.margin
    ).init();



}

/**
 * Adds a drawing with frame and title to container.
 * @param {HTML element} container container
 * @param {Drawing} drawing drawing
 */
function addDrawing(container, drawing) {
    // create frame
    const frame = document.createElement("div");
    frame.className = "frame";
    container.appendChild(frame);
    // create title
    const title = document.createElement("h1");
    title.innerHTML = drawing.title;
    frame.appendChild(title);
    // add drawing to frame
    frame.appendChild(drawing.canvas);
}