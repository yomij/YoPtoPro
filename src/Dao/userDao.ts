import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop({
    require: true,
    type: String,
  })
  public username!: string;

  @prop({
    require: true,
    type: String,
  })
  public password!: string;

  @prop({ type: String })
  public avatarUrl?: string;

  @prop({ type: Date, default: Date.now() })
  public createTime?: Date;

  @prop({ type: () => [String] })
  public permission?: string[];

  @prop({ type: String })
  public type!: 'admin' | 'consumer' | 'visitor';
}

const userModel = getModelForClass(User);

export default {
  createUser: async (user: User) => await userModel.create(user),
  findUserByUsername: async (username: string) => await userModel.findOne({ username }),
};
