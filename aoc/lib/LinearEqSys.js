export class LinearEqSys {
/**
     * solves:
     * a1 * x + b1 * y = c1
     * a2 * x + b2 * y = c2
     */
    solve2(a, b, c) {
        const d = Number(b[0] * a[1]) - Number(a[0] * b[1]);
        if (d == 0.0)
            return (Double.NaN, Double.NaN);
        const y = (c[0] * a[1] - a[0] * c[1]) / d;
        const x = (b[0] * c[1] - c[0] * b[1]) / d;
        return {x: x, y: y};
    }

    solve2Long(a, b, c) {
        const {x, y} = this.solve2(a, b, c);
        if (Math.ceil(x) != Math.floor(x) || Math.ceil(y) != Math.floor(y))
            return null
        return {x: parseInt(x), y: parseInt(y) }
    }
}
