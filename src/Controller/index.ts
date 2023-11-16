import {getRouterFromClass} from '../lib/route';
import PhotographController from './Photograph.Controller';
import PhotographController2C from './Photograph.Controller.2C';
import TagController from './Tag.Controller';
import TagController2C from './Tag.Controller.2C';
import UCController from './User.Controller';
import UtilController, { HealthController } from './Util.Controller';
export default (app: any) => {
  // register(app);
  app.use(getRouterFromClass(UCController));
  app.use(getRouterFromClass(PhotographController));
  app.use(getRouterFromClass(TagController));
  app.use(getRouterFromClass(PhotographController2C));
  app.use(getRouterFromClass(TagController2C));
  app.use(getRouterFromClass(UtilController));
  app.use(getRouterFromClass(HealthController));
};
