import mongoose from 'mongoose';
import photographDao from '../Dao/photographDao';
import {uploadPhotograph} from '../utils/file';
import Response from '../utils/response';

const ObjectId = mongoose.Types.ObjectId;

export async function upload(file: any) {
  if (!file) {
    return Response(400, 'No file');
  }
  const url = await uploadPhotograph(file);
  return Response(200, 'Success', { url });
}

export async function add() {
 await photographDao.insertPhotos({
   name: 'yomi',
   blurStr: '',
   id: 0,
   mainTag: ObjectId('60e5d37264026633062079a7'),
   tags: [ObjectId('60e5d37264026633062079a7'), ObjectId('60e9daf69aced2498d6862be')],
   type: '',
   url: '',
   meta: {
     width: 12,
     height: 12,
   },
 });
}
