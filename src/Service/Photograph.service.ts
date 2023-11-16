import mongoose from 'mongoose';
import {Remote_Type} from '../Controller/Photograph.Controller';
import photographDao, {Photograph} from '../Dao/photographDao';
import {uploadPhotograph} from '../utils/file';
import Response from '../utils/response';

const ObjectId = mongoose.Types.ObjectId;

export async function upload(file: any, remote: Remote_Type) {
  if (!file) { return Response(400, 'No file'); }
  const url = await uploadPhotograph(file, remote);
  return Response(200, 'Success', { url });
}

export async function add(photos: Photograph[]) {
  try {
    return Response(200, 'Success', await photographDao.insertPhotos(photos));
  } catch (e: any) {
    return Response(400, e.message);
  }
}

export async function get(pageNo: number, pageSize: number, tags?: string[]) {
  try {
    let ids;
    if (Array.isArray(tags)) {
      ids = tags.map(item => new ObjectId(item));
    }
    return Response(200, 'Success', await photographDao.getPhotographList(pageNo, pageSize, ids));
  } catch (e: any) {
    return Response(500, e.message);
  }
}
