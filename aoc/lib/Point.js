
export class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    compareTo(other) {
        // order is from top to bottom and from left to right
        // with y increasing downwards and x increasing to the right
        if (this.y == other.y)
            return this.x - other.x;
        else
            return this.y - other.y;
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    plus(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    minus(other) {
        return new Point(this.x - other.x, this.y - other.y);
    }

    times(n) {
        return new Point(n * this.x, n * this.y);
    }

    div(n) {
        return new Point(this.x / n, this.y / n);
    }

    manhattan(other) {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    adjacent(diagonally = true) {
        if (diagonally)
            return [
                new Point(x-1,y), new Point(x-1,y-1), new Point(x,y-1), new Point(x+1,y-1),
                new Point(x+1,y), new Point(x+1,y+1), new Point(x,y+1), new Point(x-1,y+1)
            ];
        else
            return [
                new Point(x-1,y), new Point(x,y-1), new Point(x+1,y), new Point(x,y+1)
            ];
    }

    adjacentCardinal() {
        return adjacent(false);
    }

    toString() {
        return `Point(${this.x},${this.y})`
    }

    static from(obj) {
        if (obj instanceof String) {
            const a = obj.split(",");
            return new Point(parseInt(a[0], 10), parseInt(a[1], 10));
        } else if (obj instanceof Point) {
            return new Point(obj.x, obj.y);
        }
    }
}
