import TagDao , { Tag } from '../Dao/tagDao';
import Response from '../utils/response';

export async function createTag(tag: Tag) {
  try {
    return Response(200, 'success', await TagDao.createTag(tag));
  } catch (e) {
    return Response(500, e.message);
  }
}

export async function getTagsByGroup(group: string) {
  try {
    const data =  await TagDao.queryByGroup(group);
    return Response(200, 'success', data);
  } catch (e) {
    return Response(500, e.message);
  }
}
