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

    setDataPoint(p, c) {
        if (this.isInsideGrid(p))
            this.data[p.y][p.x] = c;
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