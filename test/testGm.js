const ph = require('../src/photograph/photographDao')

// ph.insertPhotograpth({
//   id: 1,
//   name: 'test',
//   type: 0, // 0 原创， 2 转载
//   description: '我不是猪',
//   author: 'yomi',
//   likeCount: 1,
//   downloadCount: 1,
//   mainTag: '1',
//   tags: ['1', '2'],
//   takeTime: new Date(),
//   uploadTime: new Date(),
//   identify: {
//     fileSize: '100x100',
//     size: {
//       height: 100,
//       width: 500
//     },
//     format: '1',
//     geometry: '1',
//     compression: '1'
//   },
//   urls: {
//     s: '1',
//     m: '1',
//     l: '1'
//   }
// });

ph.getPhotographList('1', '1', 1)