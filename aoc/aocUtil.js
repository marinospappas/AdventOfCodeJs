import fs from 'node:fs'

export const year = 2024

export function readInput(day, test = false) {
    try {
        const fileName = `input${day < 10 ? '0' + day : day}.txt`
        const dirName = `../data/${year}${test ? '/test' : ''}`
        const data = fs.readFileSync(`${dirName}/${fileName}`, 'utf8');
        return data.split(/\r?\n/)
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

export function runWithElapsed(func, scope) {
    const start = new Date()
    const result = func.call(scope)
    const end = new Date()
    return { elapsed: end - start, value: result }
}