const photoDao = require('./photographDao')
const fileUtil = require('../utils/file')

// {
//   id: Number,
//    name: String,
//   type: Number, // 0 原创， 2 转载
//   description: String,
//   author: String,
//   likeCount: Number,
//   downloadCount: Number,
//   mainTag: String,
//   tags: Array,
//   takeTime: Date,
//   uploadTime: { type: Date, default: Date.now },
//   identify: {
//     fileSize: String,
//       size: {
//       height: Number,
//         width: {
//         type: Number,
//           min: 500
//       }
//     },
//     format: String,
//       geometry: String,
//       compression: String
//   },
//   urls: {
//     s: String,
//       m: String,
//       l: String
//   }
// }


async function uploadPhoto(files) {
  let msg = []
  for(let i = 0; i < files.length; i++) {
    let file = files[i]
    if(file && /^image\/(png|jpeg|jpg)$/g.test(file.type)) {
      fileUtil.makeDir('tag/l')
      fileUtil.makeDir('tag/s')
      await fileUtil.writePhotograph(file, 'tag').then(res => {
        console.log(res)
        msg.push(res)
      }).catch(e => {
        msg.push({
          originName: file.name,
          err: 'picture upload failed.'
        })
      })
    } else {
      msg.push({
        originName: file.name,
        err: 'file is not a picture'
      })
    }
  }
  return msg
}