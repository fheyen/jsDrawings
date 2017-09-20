function init() {
    const contentContainer = document.getElementById("content");
    // clear
    contentContainer.innerHTML = "";

    const conf = {
        contentContainer,
        width: 500,
        height: 500,
        margin: 10
    };

    // const yinyang = new YinYang(contentContainer).init();

    // const ornament = new Ornament(
    //     contentContainer,
    //     conf.width,
    //     conf.height,
    //     conf.margin,
    //     {
    //         stroke: "#eee",
    //         fill: "rgba(0, 0, 0, 0)"
    //     }
    // ).init();

    // const mandebrot = new Mandelbrot(contentContainer).init();

    const dragoncurve = new DragonCurve(contentContainer).init();
}