const Router = require('koa-router');

const fileUtil = require('../src/utils/file')

let photograph = new Router({
	prefix: '/api/ym/photograph'
});

// 直接访问
photograph.get('/*.jpg',async (ctx, next) => {
  ctx.set({
		'Cache-Control': 'max-age=2592000',
		'Content-Type': 'image/jpeg',
    // 'Etag': 'aaa',
	});
  console.log(ctx.query)
  await fileUtil.readPhotograph('6a44dac0c71811e8926549aa5560d956.jpeg','l','tag').then(data => {
  	ctx.body = data
	})

})

// 上传
photograph.post('/upload', async (ctx, next) => {
	// 上传文件
  let msg = [];
  let files = ctx.request.files.file; // 获取上传文件
  // let body = ctx.request.body;
  // console.log(body)
  // for(let n in body) {
  //   body[n] = JSON.parse(body[n]);
  //   console.log(n)
  // }
  // console.log(body);
  if(!files.length) {
    files = [files]
  }
  for(let i = 0; i < files.length; i++) {
    let file = files[i];
    if(file && /^image\/(png|jpeg|jpg)$/g.test(file.type)) {
      fileUtil.makeDir('tag/l');
      fileUtil.makeDir('tag/s');
      await fileUtil.writePhotograph(file, 'tag').then(res => {
        console.log(res)
        msg.push(res)
      }).catch(e => {
        msg.push({
          code: 500,
          originName: file.name,
          err: 'picture upload failed.'
        })
      })
    } else {
      msg.push({
        code: 500,
        originName: file.name,
        err: 'file is not a picture'
      })
    }
  }
  ctx.body = {
	  code: 200,
    msg: msg
  }
});

// 获取照片列表
photograph.get('/getList', )


module.exports = photograph;