import { getModelForClass, prop } from '@typegoose/typegoose';

export class Tag {
  @prop({
    require: true,
    type: String,
    unique: true,
  })
  public tag!: string;

  @prop({
    require: true,
    type: String,
    unique: true,
  })
  public group!: string;
}

const tagModel = getModelForClass(Tag);

export default {
  createTag: async (tag: Tag) => await tagModel.create(tag),
  queryByGroup: async (group: string) => await tagModel.find({group}, 'tag _id'),
};
