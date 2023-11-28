import {ReturnModelType} from "@typegoose/typegoose";
import {tag} from "tencentcloud-sdk-nodejs";

const {  getModelForClass, index, prop } = require('@typegoose/typegoose');

@index({ tag: 1, group: 1 }, { unique: true })
export class Tag {
  @prop()
  public tag!: string;

  @prop()
  public group!: string;
  
  @prop()
  public parent?: typeof Tag;
}

const tagModel: ReturnModelType<typeof Tag, any> = getModelForClass(Tag);

export default {
  createTag: async (tag: Tag) => await tagModel.create(tag),
  queryByGroup: async (group: string) => await tagModel.find({group}, 'tag _id'),
  
  queryAll: async () => {
    // return await tagModel.find().populate('parent', '_id tag')
    return await tagModel.find()
  }
};
