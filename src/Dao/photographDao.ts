import {getModelForClass, prop, Ref} from '@typegoose/typegoose';
import {Tag} from './tagDao';

export  class ImageMeta {
  @prop({ type: Number })
  width!: number;

  @prop({ type: Number })
  height!: number;
}

export class Photograph {
  @prop({ require: true, type: Number })
  public id!: number;

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

  @prop({ type: String })
  public url!: string; // 照片Url

  @prop({ type: Date, default: Date.now() })
  public createTime?: Date; // 拍摄时间

  @prop({ type: String })
  public blurStr!: string;

  @prop({ type: () => ImageMeta })
  public meta!: ImageMeta;

}

const photographModel = getModelForClass(Photograph);

export default {
  /**
   * 批量插入
   * @param photos
   */
  insertPhotos: async (photos: Photograph[] | Photograph) => await photographModel.insertMany(photos),
  /**
   * 通过tag查询
   * @param tag
   * @param pageNo
   * @param pageSize
   */
  async getPhotographListByTag(tag: Tag, pageNo: number, pageSize: number) {
    const query = photographModel.find({ tags: {$in: [tag]} });
    const total = await query.countDocuments();
    const list = await query.skip((pageNo - 1) * pageSize).limit(pageSize);
    return { total, list };
  },
};
