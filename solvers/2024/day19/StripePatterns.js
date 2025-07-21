import { AocArray } from "../../../aoc/lib/AocArray.js";
import { LinearEqSys } from "../../../aoc/lib/LinearEqSys.js";
import {Solver} from "../../../aoc/Solver.js";

// private variables go here
const _patterns = new WeakMap();
const _designs = new WeakMap();

export default class StripePatterns extends Solver {

    initialise(data) {
        _patterns.set(this, data[0].split(',').map(s => s.trim()));
        _designs.set(this, data.slice(2))
    }

    getInputData() {
        return [_patterns.get(this), _designs.get(this)];
    }

    cache = new Map();

    getCountOfPatternCombinations(pattern, availablePatterns) {
        if (this.cache.has(pattern))
            return this.cache.get(pattern);
        var count = 0;
        const matchedPtrns = availablePatterns.filter(p => pattern.endsWith(p))
        matchedPtrns.forEach(mPtrn => {
            const prevPtrn = pattern.substring(0, pattern.length - mPtrn.length);
            count += (prevPtrn.length === 0 ? 1 : this.getCountOfPatternCombinations(prevPtrn, availablePatterns))
        });
        this.cache.set(pattern, count);
        return count;
    }

    solvePart1() {
        const [patterns, designs] = this.getInputData();  
        return designs.map(p => this.getCountOfPatternCombinations(p, patterns)).filter(d => d != 0).length;
    }

    solvePart2() {
        const [patterns, designs] = this.getInputData();  
        return designs.map(p => this.getCountOfPatternCombinations(p, patterns)).reduce((acc, curr) => acc + curr, 0);
    }
}
