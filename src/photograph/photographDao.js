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
        min: 10
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
  insertPhotograpth(photograph, tag = ['yomi']) {
    if(typeof tag === 'string') {
      tag = [tag]
    }
    photograph.tags = tag
    photograph = Object.assign(photograph, {
      name: photograph.fileName,
      type: 0, // 0 原创， 2 转载
      description: '这是一张不想写描述的照片',
      author: 'Yomi (Ps:Maybe)',
      likeCount: 0,
      downloadCount: 0,
      mainTag: 'yomi',
      takeTime: new Date(),
    })
    console.log(photograph)
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
  },
  getPhotographList(tag, pageNo, pageSize) {
    const res = {}
    const query1 = photographModel.find({
      tags: {$in: [tag]}
    });
    const query2 = photographModel.find({
      tags: {$in: [tag]}
    });
    return new Promise((resolve, reject) => {
      query1.countDocuments().exec((e, c) => {
        if(e) reject(e)
        res.total = c
        query2.skip((pageNo - 1) * pageSize)
          .limit(pageSize).exec((e, c) => {
          e && reject(e)
          res.photoList = c
          resolve(res)
        })
      });
    })
  }
};
