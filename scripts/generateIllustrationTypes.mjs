import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function run() {
  const iconsFolderPath = path.resolve('src/illustrations');
  const destPath = path.resolve('src/constants/illustrations.ts');

  const folder = fs.readdirSync(iconsFolderPath);
  const filenames = folder.map(file => file.replace(/\.tsx$/, ''));

  const content = `export const ILLUSTRATION_NAMES = [${filenames
    .map(name => `'${name}'`)
    .join(', ')}] as const;`;

  fs.writeFileSync(destPath, content);

  exec(`prettier --write ${destPath}`);
}

run();
