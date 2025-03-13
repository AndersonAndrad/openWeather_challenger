import fs from 'fs';
import path from 'path';

const distFolder = './dist';

function renameFilesToMjs(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
        const fullPath = path.join(folder, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            renameFilesToMjs(fullPath);
        } else if (file.endsWith('.js')) {
            const newFile = fullPath.replace(/\.js$/, '.mjs');
            fs.renameSync(fullPath, newFile);
        }
    }
}

renameFilesToMjs(distFolder);
