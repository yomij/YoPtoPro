import process from 'child_process';
import fs from 'fs';
import path from 'path';

export default function() {
  const dir = path.join(__dirname, '../../public/yomi');
  console.log(dir);
  if (!fs.existsSync(dir)) {
    process.execSync(`git clone -b develop https://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@github.com/yomij/yomi.git ${dir}`);
  }
  process.execSync(`cd ${dir} && npm i && node node_modules/esbuild/install.js && npm run build`);
}
