import {getModelForClass, prop} from '@typegoose/typegoose';
import { connect } from 'mongoose';
class User {
  @prop({ type: () => String })
  public name?: string;
  @prop({ type: () => [String] })
  public jobs?: string[];
}

const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types

(async () => {
  await connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test' });
  const { _id: id } = await UserModel.create({ name: 'JohnDoe' } as User); // an "as" assertion, to have types for all properties
  const user = await UserModel.findById(id).exec();
  console.log(user); // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
})();

export default {
  User,
}
