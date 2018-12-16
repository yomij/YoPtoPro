const fs = require('fs');
const path = require('path');

const gm = require('gm');
const uuidv5 = require('uuid/v5');

const fmtTime = require('./fmtTime');
const config = require('../../config');

function getUUID(name) {
  return uuidv5(name, uuidv5.DNS).replace(/-/g, '')
}

function makeDir(dir) {
  let p = config.PHOTOGRAPH_PATH;
  if (fs.existsSync(path.join(p, dir))) {
    return
  }
  dir.split('/').forEach(item => {
    p = path.join(p, item);
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p, err => {
        if (err) {
          console.log('文件夹创建失败', err);
        } else {
          console.log('文件夹创建成功');
        }
      })
    }
  })
}

function readPhotograph(name, size, mainTag) {
  let data = [];
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(path.join(config.PHOTOGRAPH_PATH, mainTag, size, name));
    reader.on('data', function (chunk) {
      data.push(chunk)
    });
    reader.on('end', function () {
      resolve(Buffer.concat(data))
    });
    reader.on('error', function (err) {
      reject(err)
    });
  })
}

function getIdentify(file) {
  return new Promise((resolve, reject) => {
    gm(file).identify((err, value) => {
      if (err) {
        reject(err)
      } else {
        console.log(value);
        resolve({
          fileSize: value.Filesize,
          size: value.size,
          format: value.format,
          geometry: value.Geometry,
          compression: value.Compression,
        })
      }
    })
  })
}

function writePhotograph(file, tag, smallWidth = 416) {
  let p = path.join(config.PHOTOGRAPH_PATH, tag)

  return new Promise((resolve, reject) => {
    let reader = fs.createReadStream(file.path);
    let type = file.type.split('/')[1];
    let doc = {};
    let fileName = getUUID(file.name);

    try {
      const upStream = fs.createWriteStream(`${p}/l/${fileName}.${type}`);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
    } catch (err) {
      reject(err)
    }

    gm(reader).resize(smallWidth)
      .noProfile()
      .write(`${p}/s/${fileName}.${type}`, err => {
        if (err) {
          reject(err)
        } else {
          doc.fileName = fileName;
          doc.originName = file.name;
          // resolve(doc)
          getIdentify(file.path).then(res => {
            doc.identify = res;
            resolve(doc)
          }).catch(e => {
            reject(e)
          })
        }
      });
  })
}

module.exports = {
  makeDir,
  writePhotograph,
  readPhotograph,
};
