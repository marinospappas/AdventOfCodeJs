export class Direction {
    constructor (symbol) {
        this.symbol = symbol;
        switch (symbol) {
            case 'N': case '^': case 'U':
                this.increment = new Point(0, -1);
                break;
            case 'E': case '>': case 'R':
                this.increment = new Point(1, 0);
                break;
            case 'S': case 'v': case 'D':
                this.increment = new Point(0, 1);
                break;
            case 'W': case '<': case 'L':
                this.increment = new Point(-1, 0);
                break;

            case 'NE': case 'UR':
               this.increment = new Point(1, -1);
               break;
            case 'NW': case 'UL':
                this.increment = new Point(-1, -1);
                break;
            case 'SE': case 'DR':
                this.increment = new Point(1, 1);
                break;
            case 'SW': case 'DL':
                this.increment = new Point(-1, 1);
                break;
            default:
                this.increment = new Point(0, 0);    
                this.symbol = 'INVALID';
        }
    }

    turn(direction) {
        if (typeof direction === 'number') {
            return direction === 1 ? this.turnRight : this.turnLeft;
        } else if (direction instanceof Direction) {
            if (direction.isEqual(Direction.E) || direction.isEqual(Direction.R) || direction.isEqual(new Direction('>')))
                return this.turnRight;
            else
                return this.turnLeft;
        }
        else
            return this;
    }

    turnRight() {
        switch(this.symbol) {
            case 'N': return new Direction('E'); 
            case 'E': return new Direction('S'); 
            case 'S': return new Direction('W'); 
            case 'W': return new Direction('N'); 
            case '^': return new Direction('>'); 
            case '>': return new Direction('v'); 
            case 'v': return new Direction('<'); 
            case '<': return new Direction('^'); 
        }
    }

    turnLeft() {
        switch(this.symbol) {
            case 'N': return new Direction('W'); 
            case 'W': return new Direction('S'); 
            case 'S': return new Direction('E'); 
            case 'E': return new Direction('N'); 
            case '^': return new Direction('<'); 
            case '<': return new Direction('v'); 
            case 'v': return new Direction('>'); 
            case '>': return new Direction('^'); 
        }
    }

    reverse() {
        switch(this.symbol) {
            case 'N': return new Direction('S'); 
            case 'W': return new Direction('E'); 
            case 'S': return new Direction('N'); 
            case 'E': return new Direction('W'); 
            case '^': return new Direction('v'); 
            case '<': return new Direction('>'); 
            case 'v': return new Direction('^'); 
            case '>': return new Direction('<'); 
        }
    }

    isEqual(other) {
        return this.symbol === other.symbol;
    }

    toString() {
        return `Dir(${this.symbol})`
    }

    static N = new Direction('N');
    static E = new Direction('E');
    static S = new Direction('S');
    static W = new Direction('W');
    static NE = new Direction('NE');
    static NW = new Direction('NW');
    static SE = new Direction('SE');
    static SW = new Direction('SW');
    
    static U = new Direction('U');
    static R = new Direction('R');
    static D = new Direction('D');
    static L = new Direction('L');

    static ALL_DIRECTIONS_CARDINAL = [Direction.N, Direction.E, Direction.S, Direction.W];
    static ALL_DIRECTIONS = Array.from(this.ALL_DIRECTIONS_CARDINAL).concat([Direction.NE, Direction.NW, Direction.SE, Direction.SW]);
}