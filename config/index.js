const path = require('path')


module.exports = {
	APP_PORT: 3000,
	PHOTOGRAPH_PATH: path.join(process.cwd(), 'public', 'photograph'),
	PHOTOGRAPH_SIZE_SMALL: 416,
  PHOTOGRAPH_SIZE_MIDDLE: 1000,
	DB_NAME: 'YomiWebside',
	DB_PROT: 27017,
	DB_HOST: '127.0.0.1',
	IMG_SERVER: 'http://img.yomij.cn/'
}