const GM = require('gm').subClass({imageMagick:true })

GM('../../public/test.png').size((a, b) => {
  console.log(a, b);
});
