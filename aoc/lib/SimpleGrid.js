import {Point} from "./Point.js";

export class SimpleGrid {
    constructor(data) {
        this.data = data.map(line => Array.from(line));
        this.maxX = this.data[0].length - 1;
        this.maxY = this.data.length - 1;
    }

    clone() {
        return new SimpleGrid(
            Array.from(this.data.map(row => Array.from(row).join('')))
        );
    }

    isInsideGrid(p) {
        return p.x >= 0 && p.x <= this.maxX && p.y >= 0 && p.y <= this.maxY;
    }

    getDataPoint(p) {
        return this.isInsideGrid(p) ? this.data[p.y][p.x] : null;
    }

    getAllDataValues() {
        return new Set(this.data.flat());
    }

    setDataPoint(p, c) {
        if (this.isInsideGrid(p))
            this.data[p.y][p.x] = c;
    }

    getAllPoints() {
        const points = [];
        for (let y = 0; y <= this.maxY; ++y)
            for (let x = 0; x <= this.maxX; ++x)
                points.push(new Point(x, y));
        return points;
    }

    getAdjacentDataPoints(p) {
        return p.adjacent().filter(p => this.isInsideGrid(p)).map(p => this.getDataPoint(p))
    }

    getAdjacentDataPointsCardinal(p) {
        return p.adjacentCardinal().filter(p => this.isInsideGrid(p)).map(p => this.getDataPoint(p))

    }

    getColumn(x) {
        return [...Array(this.maxY + 1).keys()].map(i => this.data[i][x]);
    }

    getRow(y) {
        return this.data[y];
    }

    getMaxX() {
        return this.maxX;
    }

    findFirst(item) {
        for (let y = 0; y <= this.maxY; ++y)
            for (let x = 0; x <= this.maxX; ++x)
                if (this.data[y][x] === item)
                    return new Point(x, y);
        return null;
    }

    findAll(item) {
        const points = [];
        for (let y = 0; y <= this.maxY; ++y)
            for (let x = 0; x <= this.maxX; ++x)
                if (this.data[y][x] === item)
                    points.push(new Point(x, y));
        return points;
    }

    getDimensions() {
        return [this.maxX + 1, this.maxY + 1]
    }

    toString() {
        let s = '';
        for (const i in this.data) {
            s += `\n${i.toString().padStart(2, '0')} ${this.data[i].join('')}`
        }
        let s1 = '\n   ';
        for (const i in this.data[0]) {
            s1 += i % 10 === 0 ? ((i / 10) % 10).toString() : ' ';
        }
        s += s1;
        s1 = '\n   ';
        for (const i in this.data[0]) {
            s1 += (i % 10).toString();
        }
        return s + s1;
    }
}