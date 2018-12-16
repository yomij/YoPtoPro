const DB = require('../utils/dbConnect.js');

const yomiDb = new DB(),
  db = yomiDb.connect();

const photograph = yomiDb.createSchema({ //模式，架构
  id: Number,
  name: String,
  type: Number, // 0 原创， 2 转载
  description: String,
  author: String,
  likeCount: Number,
  downloadCount: Number,
  mainTag: String,
  tags: Array,
  takeTime: Date,
  uploadTime: {type: Date, default: Date.now},
  identify: {
    fileSize: String,
    size: {
      height: Number,
      width: {
        type: Number,
        min: 500
      }
    },
    format: String,
    geometry: String,
    compression: String
  },
  urls: {
    s: String,
    m: String,
    l: String
  }
});

const photographModel = db.model('photograph', photograph); //创建collection

module.exports = {
  insertPhotograpth(photograph) {
    return new Promise((reslove, reject) => {
      photograph.uploadTime = new Date(); //添加修改时间
      const nt = new photographModel(photograph);

      photographModel.create();

      nt.save((err, doc) => {
        if (err) {
          reject(err)
        } else {
          console.log(doc);
          reslove(doc)
        }
      })
    })
  }
};