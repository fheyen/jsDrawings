function init() {
    const contentContainer = document.getElementById("content");
    // clear
    contentContainer.innerHTML = "";

    const drawingConfig = {
        width: 500,
        height: 500,
        margin: 10
    };

    const yinyang = new YinYang(
        contentContainer,
        drawingConfig.width,
        drawingConfig.height,
        drawingConfig.margin
    );
    yinyang.init();
}