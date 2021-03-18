const fs = require('fs'),
	gm = require('gm'),
  path = require('path');

const uuidv1 = require('uuid/v1');

function getUUID() {
  return uuidv1().replace(/-/g, '')
}

function resize(filePath, fileName, width = 416) {
  let photo = gm(filePath)
  return new Promise((resolve, reject) => {
    photo.resize(width)
      .noProfile()
      .write(path.join(filePath, getUUID() + '.jpg'), function (err) {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      });
  })

}

var crypto = require('crypto');

// 第二部逻辑处理

//todo:这里处理二维码的封装
//循环result，调用 reduce的Boxer方法，然后保存加密后的结果，并且在结果前加网址http://jaunsoo.com
//加密开始
var str = JSON.stringify('user'); //明文
var secret = 'luoliangfeigenius007'; //密钥--可以随便写
var cipher = crypto.createCipher('aes192', secret);
var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
enc += cipher.final('hex'); //编码方式从转为hex;
console.log(enc)//输出加密后结果

console.log(path.join(process.cwd(),'a'))
