import process from 'child_process';
import fs from 'fs';
import path from 'path';

export default function() {
  const dir = path.join(__dirname, '../../public/yomi');
  console.log(dir);
  if (!fs.existsSync(dir)) {
    console.log(`git clone -b develop git@github.com:yomij/yomi.git ${dir}`);
    process.execSync(`git clone -b develop git@github.com:yomij/yomi.git ${dir}`);
  }
  process.execSync(`cd ${dir} && git pull && npm i && node node_modules/esbuild/install.js && npm run build`);
}
