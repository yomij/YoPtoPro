const path = require('path')


module.exports = {
	APP_PORT: 3003,
	PHOTOGRAPH_PATH: path.join(process.cwd(), 'public', 'photograph'),
	PHOTOGRAPH_SIZE_SMALL: 416,
  PHOTOGRAPH_SIZE_MIDDLE: 1000,
	DB_NAME: 'YomiWebside',
	DB_PROT: 27017,
	DB_HOST: '121.4.172.117',
	IMG_SERVER: 'http://img.yomij.cn/',
  QINIU_ACCESS_KEY: 'FRCRP7V2kY12Pt3EOoxhO3T4sgKkwvOoG12pBqaT',
  QINIU_SECRET_KEY: 'y55ZOLjQ9yeSJjpOvHR45gT4KShU0HBzKfgzcs4Z',
  QINIU_SCOPE: 'yomi-pic-test'
}
