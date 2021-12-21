import fs from 'fs/promises';
import Discord from 'discord.js';
import { File, getDir } from 'file-ez';
import { basename, relative } from 'path';

const ruinguard = await getDir('./src').read().then(files => files.filter(f => f instanceof File && !basename(f.path).startsWith('.')));

await fs.writeFile('./index.js', `
import Discord from 'discord.js';

${ruinguard.map(f => `import _${basename(f.path, '.js')} from './${relative(getDir('./').path, f.path)}';`).join('\n')}

export default {
  ...Discord,
  ${ruinguard.map(f => `${basename(f.path, '.js')}: _${basename(f.path, '.js')},`).join('\n  ')}
};

${ruinguard.map(f => `export const ${basename(f.path, '.js')} = _${basename(f.path, '.js')};`).join('\n')}

${Object.keys(Discord).map(k => `export const ${k} = Discord.${k};`).join('\n')}
`);