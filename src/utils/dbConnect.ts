import mongoose from 'mongoose';
import config from '../config';

const uri = `mongodb://${config.DB_HOST}:${config.DB_PROT}/${config.DB_NAME}`;

module.exports = () => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
      console.log('Database connect success,time:' + new Date().toLocaleString());
    },
    err => {
      console.log('Database connect failed' + err);
    },
  );
};
