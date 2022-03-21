const fs = require('fs');

export default function deleteFile(path: string) {
  fs.unlink(path, (err: NodeJS.ErrnoException) => {
    if (err) {
      throw err;
    }
    console.log('successfully deleted');
  });
}
