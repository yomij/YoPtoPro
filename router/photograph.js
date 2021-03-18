const Router = require('koa-router');
const pServer = require('../src/photograph/photographServer')
const fileUtil = require('../src/utils/file')

let photograph = new Router({
  prefix: '/api/ym/photograph'
});

// 直接访问
photograph.get('/*.jpg', async (ctx, next) => {
  ctx.set({
    'Cache-Control': 'max-age=2592000',
    'Content-Type': 'image/jpeg',
    // 'Etag': 'aaa',
  });
  await fileUtil.readPhotograph('1ba2203f661e599f8080a3ed0e3497b5.jpeg', 'l', 'tag').then(data => {
    ctx.body = data
  })

})

// 上传
photograph.post('/upload', async (ctx, next) => {
  debugger
  try {
    let files = ctx.request.files.file; // 获取上传文件
    const tag = ctx.request.body.tag || 'yomi'
    const res = await pServer.uploadPhoto(files, tag)
    ctx.body = res
  } catch (e) {
    console.log(e)
  }
});

// 获取照片列表
photograph.get('/list', async (ctx, next) => {
  const query = ctx.query
  console.log(query)
  try {
    const res = await pServer.getPhoto(query.tag, ~~query.pageNo, ~~query.pageSize)
    ctx.body = {
      status: 200,
      data: res
    }
  } catch (e) {
    ctx.body = {
      status: 500,
      message: e.message
    }
  }
})

module.exports = photograph;
