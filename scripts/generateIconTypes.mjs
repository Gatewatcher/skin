import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function run() {
  const iconsFolderPath = path.resolve('src/icons');
  const destPath = path.resolve('src/constants/icons.ts');

  const folder = fs.readdirSync(iconsFolderPath);
  const filenames = folder.map(file => file.replace(/\.tsx$/, ''));

  const content = `export const ICON_NAMES = [${filenames
    .map(name => `'${name}'`)
    .join(', ')}] as const;`;

  fs.writeFileSync(destPath, content);

  exec(`prettier --write ${destPath}`);
}

run();
