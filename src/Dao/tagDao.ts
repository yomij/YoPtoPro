import { getModelForClass, index, prop } from '@typegoose/typegoose';

@index({ tag: 1, group: 1 }, { unique: true })
export class Tag {
  @prop()
  public tag!: string;

  @prop()
  public group!: string;
}

const tagModel = getModelForClass(Tag);

export default {
  createTag: async (tag: Tag) => await tagModel.create(tag),
  queryByGroup: async (group: string) => await tagModel.find({group}, 'tag _id'),
};
