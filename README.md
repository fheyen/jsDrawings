# jsDrawings

Drawings in JavaScript / TypeScript. Suggestions are welcome.

1. [jsDrawings](#jsdrawings)
    1. [Finished](#finished)
        1. [Overview](#overview)
        2. [Yin Yang](#yin-yang)
        3. [Ornament](#ornament)
        4. [Mandelbrot](#mandelbrot)
        5. [Dragon Curve](#dragon-curve)
        6. [Gosper Curve](#gosper-curve)
        7. [Hilbert Curve](#hilbert-curve)
        8. [Osgood Curve](#osgood-curve)
        9. [Sierpinski Triangle](#sierpinski-triangle)
        10. [Sierpinski Carpet](#sierpinski-carpet)
        11. [Hexaflake](#hexaflake)
        12. [Rapidly-exploring Random Tree](#rapidly-exploring-random-tree)
        13. [Pythagoras Tree](#pythagoras-tree)
    2. [Usage](#usage)

## Finished

The finished drawings are displayed on the [GitHub.io page](https://fheyen.github.io/jsDrawings/).

### Overview

![](img/xs/yinyang.png?raw=true "Yin Yang")
![](img/xs/ornament.png?raw=true "Ornament")
![](img/xs/mandelbrot.png?raw=true "Mandelbrot")
![](img/xs/dragoncurve.png?raw=true "Dragon Curve")
![](img/xs/gospercurve.png?raw=true "Gosper Curve")
![](img/xs/hilbertcurve.png?raw=true "Hilbert Curve")
![](img/xs/osgoodcurve.png?raw=true "Osgood Curve")
![](img/xs/sierpinski.png?raw=true "Sierpinski Triangle (using color)")
![](img/xs/sierpinski2.png?raw=true "Sierpinski Triangle (using opacity)")
![](img/xs/sierpinskiCarpet.png?raw=true "Sierpinski Carpet")
![](img/xs/hexaflake.png?raw=true "Hexa Flake")
![](img/xs/rrt.png?raw=true "RRT")
![](img/xs/pythagorastree.png?raw=true "Pythagoras Tree")

### Yin Yang

[wikipedia](https://en.wikipedia.org/wiki/Yin_and_yang)

![](img/yinyang.png?raw=true "Yin Yang")

### Ornament

[wikipedia](https://en.wikipedia.org/wiki/Overlapping_circles_grid)

![](img/ornament.png?raw=true "Ornament")

### Mandelbrot

[wikipedia](https://en.wikipedia.org/wiki/Mandelbrot_set)

![](img/mandelbrot.png?raw=true "Mandelbrot")

### Dragon Curve

[wikipedia](https://en.wikipedia.org/wiki/Dragon_curve)

![](img/dragoncurve.png?raw=true "Dragon Curve")

### Gosper Curve

[wikipedia](https://en.wikipedia.org/wiki/Gosper_curve)

![](img/gospercurve.png?raw=true "Gosper Curve")

### Hilbert Curve

[wikipedia](https://en.wikipedia.org/wiki/Hilbert_curve)

![](img/hilbertcurve.png?raw=true "Hilbert Curve")

### Osgood Curve

[wikipedia](https://en.wikipedia.org/wiki/Osgood_curve)

![](img/osgoodcurve.png?raw=true "Osgood Curve")

### Sierpinski Triangle

[wikipedia](https://en.wikipedia.org/wiki/Sierpinski_triangle)

![](img/sierpinski.png?raw=true "Sierpinski Triangle (using color)")
![](img/sierpinski2.png?raw=true "Sierpinski Triangle (using opacity)")

### Sierpinski Carpet

[wikipedia](https://en.wikipedia.org/wiki/Sierpinski_carpet)

![](img/sierpinskiCarpet.png?raw=true "Sierpinski Carpet")

### Hexaflake

[wikipedia](https://en.wikipedia.org/wiki/Hexaflake)

![](img/hexaflake.png?raw=true "Hexa Flake")

### Rapidly-exploring Random Tree

[wikipedia](https://en.wikipedia.org/wiki/Rapidly-exploring_random_tree)

![](img/rrt.png?raw=true "RRT")

### Pythagoras Tree

[wikipedia](https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)#Varying_the_angle)

![](img/pythagorastree.png?raw=true "Pythagoras Tree")

## Usage

Drawings are created via their constructor. You can then set their size (or only width or height) and call init() to draw them.

```javascript
      const dc = new DragonCurve();
      dc.setSize(500, 500);
      dc.init();
```

Or via function chaining:

```javascript
      const dc = new DragonCurve().setSize(500, 500).init();
```

See [drawing.ts](./lib/drawing.ts) for all possible arguments.
