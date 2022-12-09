import fs from 'fs';

const data = fs.readFileSync('day7/input', 'utf8').split('\n');

class File {
    name: string;
    size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }
}

class Dir {
    name: string;
    files: File[];
    parent: Dir | null;
    children: Dir[];

    constructor(name: string, parent: Dir | null) {
        this.name = name;
        this.parent = parent;
        this.files = [];
        this.children = [];
    }

    addFile(file: File) {
        this.files.push(file);
    }

    getSize(): number {
        return (
            this.files.reduce((size, file) => size + file.size, 0) +
            this.children.reduce((sum, dir) => sum + dir.getSize(), 0)
        );
    }
}

class FileSystem {
    static currentDir: Dir | null = null;
    static dirs: Dir[] = [];

    static cd(dirName: string) {
        const dirToSet = this.currentDir?.children.find((dir) => dir.name === dirName);

        if (dirToSet) {
            this.currentDir = dirToSet;
            return;
        }

        const newDir = new Dir(dirName, this.currentDir);
        this.currentDir = newDir;
        this.dirs.push(newDir);
    }

    static cdToParent() {
        const dirToSet = this.currentDir?.parent || null;
        this.currentDir = dirToSet;
    }

    static addDir(dirName: string) {
        const existingDir = this.currentDir?.children.find((dir) => dir.name === dirName);

        if (!existingDir) {
            const newDir = new Dir(dirName, this.currentDir);
            this.currentDir?.children.push(newDir);
            this.dirs.push(newDir);
        }
    }

    static addFileToCurrentDir(fileName: string, fileSize: number) {
        const doesFileExist = this.currentDir?.files.some((file) => file.name === fileName);

        if (!doesFileExist) {
            const newFile = new File(fileName, fileSize);
            this.currentDir?.addFile(newFile);
        }
    }

    static getRootDir() {
        return this.dirs.find((dir) => dir.name === '/');
    }
}

for (let line of data) {
    if (line.startsWith('$ ls')) {
        continue;
    } else if (line.startsWith('$ cd')) {
        const target = line.split(' ')[2];

        if (target === '..') {
            FileSystem.cdToParent();
        } else {
            FileSystem.cd(target);
        }
    } else if (line.startsWith('dir')) {
        const dirName = line.split(' ')[1];
        FileSystem.addDir(dirName);
    } else {
        const [fileSize, fileName] = line.split(' ');
        FileSystem.addFileToCurrentDir(fileName, Number(fileSize));
    }
}

const sizeLimit = 100000;

const getSumOfBelow100kDirs = (dir: Dir): number => {
    const childrenSizeSum = dir.children.reduce((sum, dir) => {
        const sizeOfDir = dir.getSize();

        return sizeOfDir < sizeLimit ? sum + sizeOfDir : sum;
    }, 0);

    return dir.children.reduce((sum, dir) => sum + getSumOfBelow100kDirs(dir), childrenSizeSum);
};

const rootDir = FileSystem.getRootDir();
if (!rootDir) {
    throw 'No rootDir found';
}

console.log(getSumOfBelow100kDirs(rootDir));
