import fs from 'node:fs'

export function readInput(day, year, test = false) {
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
