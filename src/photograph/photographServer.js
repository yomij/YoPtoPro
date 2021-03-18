const photoDao = require('./photographDao')
const fileUtil = require('../utils/file')

async function uploadPhoto(files, tag) {
  debugger
  let msg = [];
  try {
    if (!files.length) files = [files]
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (file && /^image\/(png|jpeg|jpg)$/g.test(file.type)) {
        debugger
        const res = await fileUtil.uploadPhotograph(file, tag)
        debugger
        await photoDao.insertPhotograpth(res, tag)
        msg.push()
      } else {
        msg.push({
          status: 500,
          originName: file.name,
          message: 'file is not a picture'
        })
      }
    }
  } catch (e) {
    msg.push({
      code: 500,
      message: e.message
    })
  }
  return {
    status: 200,
    message: msg
  }
}

async function getPhoto (t ,n ,s) {
  return await photoDao.getPhotographList(t,n, s)
}

module.exports = {
  uploadPhoto,
  getPhoto
}
