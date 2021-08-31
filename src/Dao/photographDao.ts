import {getModelForClass, prop, Ref} from '@typegoose/typegoose';
import mongoose, {Types} from 'mongoose';
import {Tag} from './tagDao';

export  class ImageMeta {
  @prop({ type: Number })
  width!: number;

  @prop({ type: Number })
  height!: number;
}

export enum PhotographStatus {
  DELETED,
  NORMAL,
  HIDDEN,
}

export class Photograph {
  // @prop({ require: true, type: Number })
  // public id!: number;

  @prop({ require: true, type: String })
  public name!: string;

  @prop({ require: true, type: String })
  public type!: string;

  @prop({ type: String })
  public description?: string;

  @prop({ type: String })
  public author?: string;

  @prop({ type: Date, default: Date.now() })
  public uploadTime?: Date;

  @prop({ ref: () => Tag, required: true })
  public mainTag!: Ref<Tag>;

  @prop({ ref: () => Tag, required: true})
  public tags!: Ref<Tag>[];

  @prop({ unique: true })
  public url!: string; // 照片Url

  @prop({ type: Date, default: Date.now() })
  public createTime?: Date; // 拍摄时间

  @prop({ type: String })
  public blurStr!: string;

  // 图片元信息
  @prop({ type: () => ImageMeta })
  public meta!: ImageMeta;

  // 状态
  @prop({ default: PhotographStatus.NORMAL })
  public status!: PhotographStatus;

  // 评级
  @prop({ default: 3, max: 5, min: 1 })
  public rating!: number;
}

const photographModel = getModelForClass(Photograph);

export default {
  /**
   * 批量插入
   * @param photos
   */
  insertPhotos: async (photos: Photograph[] | Photograph) => await photographModel.insertMany(photos),
  /**
   * 分页查询
   * @param tags
   * @param pageNo
   * @param pageSize
   */
  async getPhotographList(pageNo: number, pageSize: number, tags?: Types.ObjectId[]) {
    const query = photographModel.find(tags ? { mainTag: {$in: tags} } : {}, { __v: 0 });
    const countQuery = photographModel.find(tags ? { mainTag: {$in: tags} } : {}, { __v: 0 });
    const list = await query
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .populate('tags mainTag', { __v: 0 });
    const total = await countQuery.countDocuments();
    return { total, list };
  },
  /**
   * 编辑单个
   * @param id
   * @param photo
   */
  updatePhoto: async (id: string, photo: Photograph) => await photographModel.findByIdAndUpdate(id, photo),
};
