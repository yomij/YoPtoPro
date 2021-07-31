const photoDao = require('./photographDao');
const fileUtil = require('../utils/file');

async function uploadPhoto(files: any, tag: string[]) {
  let msg = [];
  try {
    if (!Array.isArray(files)) { files = [files]; }
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (file && /^image\/(png|jpeg|jpg)$/g.test(file.type)) {
        const res = await fileUtil.uploadPhotograph(file, tag);
        await photoDao.insertPhotograpth(res, tag);
        msg.push();
      } else {
        msg.push({
          status: 500,
          originName: file.name,
          message: 'file is not a picture',
        });
      }
    }
  } catch (e) {
    msg.push({
      code: 500,
      message: e.message,
    });
  }
  return {
    status: 200,
    message: msg,
  };
}

async function getPhoto(t: any , n: any , s: any) {
  return await photoDao.getPhotographList(t, n, s);
}

module.exports = {
  uploadPhoto,
  getPhoto,
};
