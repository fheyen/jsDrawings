function init() {

    // configuration for all drawings
    const conf = {
        container: document.getElementById("content"),
        width: 500,
        height: 500,
        margin: 10
    };

    // const yinyang = new YinYang(conf.container).init();

    // const ornament = new Ornament(
    //     conf.container,
    //     conf.width,
    //     conf.height,
    //     conf.margin,
    //     {
    //         stroke: "#eee",
    //         fill: "rgba(0, 0, 0, 0)"
    //     }
    // ).init();

    // const mandebrot = new Mandelbrot(conf.container).init();

    // const dragoncurve = new DragonCurve(conf.container).init();

    const gospercurve = new GosperCurve(conf.container).init();

    // const sierpinski = new Sierpinski(conf.container).init();
}