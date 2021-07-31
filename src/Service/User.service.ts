import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserDao, { User } from '../Dao/userDao';
import Response from '../utils/response';

const encrypt = (str: string) => {
  const sha256 = crypto.createHash('sha256');
  sha256.update(str);
  return sha256.digest('hex');
};

export const createUser = async (user: User) => {
  const userInfo = await UserDao.findUserByUsername(user.username);
  if (userInfo) {
    return Response(400, 'User existed');
  }
  user.password = encrypt(user.password);
  await UserDao.createUser(user);
  return Response(200, 'create success');
};

export const login = async (username: string, password: string) => {
  const userInfo = await UserDao.findUserByUsername(username);
  if (!userInfo) {
    return Response(400, 'User not find');
  }
  if (userInfo.password === encrypt(password)) {
    const token = jwt.sign({
      id: userInfo._id,
      username: userInfo.username,
    }, config.SECRET, {expiresIn: '24h'});
    return Response(200, 'Success', { token });
  }
  return Response(400, 'Verify failed');
};
