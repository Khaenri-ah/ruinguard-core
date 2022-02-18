import fs from 'fs/promises';
import Discord from 'discord.js';
import { getDir } from 'file-ez';
import { basename, relative, extname } from 'path';

const esm = await getDir('./dist/esm').recursive().then(files => files.filter(f => extname(f.path) === '.js' && !basename(f.path).startsWith('.')));

await fs.writeFile('./index.mjs',
`
import Discord from 'discord.js';

${esm.map(f => `import _${basename(f.path, '.js')} from './${relative(getDir('./').path, f.path)}';`).join('\n')}

export default {
  ...Discord,
  ${esm.map(f => `${basename(f.path, '.js')}: _${basename(f.path, '.js')},`).join('\n  ')}
};

${esm.map(f => `export const ${basename(f.path, '.js')} = _${basename(f.path, '.js')};`).join('\n')}

${Object.keys(Discord).map(k => `export const ${k} = Discord.${k};`).join('\n')}
`);

const cjs = await getDir('./dist/cjs').recursive().then(files => files.filter(f => extname(f.path) === '.js' && !basename(f.path).startsWith('.')));

await fs.writeFile('./index.cjs', 
`
const Discord = require('discord.js');

module.exports = {
  ...Discord,
  ${cjs.map(f => `${basename(f.path, '.js')}: require('./${relative(getDir('./').path, f.path)}'),`).join('\n  ')}
}
`)