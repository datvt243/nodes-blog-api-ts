/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const moduleAlias = require('module-alias');

const env = process.env.NODE_ENV || 'development';

function getPath(path: string, key: string) {
    const _str = `${key}/${key}`;
    if (path.includes(_str)) {
        return path.replace(_str, key);
    }
    return path;
}

if (env === 'production') {
    const _path = getPath(path.join(__dirname, 'dist'), 'dist');
    moduleAlias.addAlias('@', _path);
} else {
    /* const _path = getPath(path.join(__dirname, 'src'), 'src'); */
    moduleAlias.addAlias('@', path.join(__dirname, ''));
}
