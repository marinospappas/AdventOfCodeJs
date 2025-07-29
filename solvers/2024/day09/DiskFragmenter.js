import { AocArray } from "../../../aoc/lib/AocArray.js";
import {Solver} from "../../../aoc/Solver.js";

// private variables go here
const _fileSystem = new WeakMap();
const FREE = -1;

export class File {
    constructor(id, size, defrag) {
        this.id = id;
        this.size = size;
        this.defrag = defrag;
    }
}

export class Free {
    constructor(size) {
        this.size = size;
    }
}

export default class DiskFragmenter extends Solver {

    initialise(data) {
        const inputData = [...data[0]].map(c => c.charCodeAt(0) - '0'.charCodeAt(0));
        //const filesSize = [...Array(inputData.length).keys()].filter(i => i % 2 === 0).map(i => inputData[i]);
        //const freeSpaceSize = [...Array(inputData.length).keys()].filter(i => i % 2 === 1).map(i => inputData[i]);
        const fileSystem = [];
        for (const i in inputData) {
            fileSystem.push(i % 2 === 0 ? new File(i / 2, inputData[i], false) : new Free(inputData[i]));
        }
        fileSystem[0].defrag = true;
        _fileSystem.set(this, fileSystem);
    }

    getInputData() {
        return _fileSystem.get(this);
    }

    fileSystemToBlocks(fileSystem) {
        const blocks = [];
        fileSystem.forEach(item =>
            blocks.push(...Array.from({ length: item.size }, () => (item instanceof File) ? item.id : -1))
        );
        return blocks;
    }

    blocksToString(blocks) {
        return blocks.map(n => n >= 0 ? n.toString() : '.').join('');
    }

    defragmentDisk(fileSystem) {
        const blocks = this.fileSystemToBlocks(fileSystem);
        let nextFile = AocArray.lastIndexWhere(blocks, (b) => b >= 0);
        let nextFree = AocArray.indexWhere(blocks, (b) => b < 0);
        while (nextFile > nextFree) {
            blocks[nextFree] = blocks[nextFile];
            blocks[nextFile] = FREE;
            nextFile = AocArray.lastIndexWhere(blocks, (b) => b >= 0, nextFile);
            nextFree = AocArray.indexWhere(blocks, (b) => b < 0, nextFree);
        }
        return blocks;
    }

    solvePart1() {
        const fileSystem = this.getInputData();
        const defragBlocks = this.defragmentDisk(fileSystem);
        if (this.test)
            console.log(this.blocksToString(defragBlocks));
        return defragBlocks.filter(b => b >= 0).reduce((acc, curr, indx) => acc + indx * curr, 0);
    }

    findNextFreeBlock(fs, fileSize, fileIndex) {
        const index = AocArray.indexWhere(fs, (f) => (f instanceof Free) && f.size >= fileSize);
        if (index > 0 && index < fileIndex)
            return [index, fs[index].size];
        return [-1, -1];
    }

    findNextFileToMove(fs, startIndex) {
        const index = AocArray.lastIndexWhere(fs, (f) => (f instanceof File) && !f.defrag, startIndex);
        if (index > 0)
            return [index, fs[index].id, fs[index].size];
        return [0, 0, 0];
    }

    defragmentFileSystem(fileSystem) {
        const newFs = [...fileSystem];
        let [fileIndexInDisk, fileId, fileSize] = this.findNextFileToMove(newFs);
        if (this.test) console.log(this.blocksToString(this.fileSystemToBlocks(newFs)));
        while (fileIndexInDisk > 0) {
            const [nextFreeIndexOnDisk, freeBlockSize] = this.findNextFreeBlock(newFs, fileSize, fileIndexInDisk);
            if (nextFreeIndexOnDisk > 0) {   // move file and free up the space
                newFs[fileIndexInDisk] = new Free(fileSize);
                if (freeBlockSize == fileSize)
                    newFs[nextFreeIndexOnDisk] = new File(fileId, fileSize, true);
                else {
                    newFs[nextFreeIndexOnDisk] = new Free(freeBlockSize - fileSize);
                    newFs.splice(nextFreeIndexOnDisk, 0, new File(fileId, fileSize, true));
                }
                if (this.test) console.log(this.blocksToString(this.fileSystemToBlocks(newFs)));
            }
            else    // file cannot be moved, mark it anyway
                newFs[fileIndexInDisk] = new File(fileId, fileSize, true);
            const nextFile = this.findNextFileToMove(newFs, fileIndexInDisk - 1);
            fileIndexInDisk = nextFile[0];
            fileId = nextFile[1];
            fileSize = nextFile[2];
        }
        return newFs;
    }

    solvePart2() {
        const fileSystem = this.getInputData();
        const defragFs = this.defragmentFileSystem(fileSystem);
        const defragBlocks = this.fileSystemToBlocks(defragFs);
        return defragBlocks.reduce((acc, curr, indx) => acc + (curr > 0 ? indx * curr : 0), 0);
    }
}
