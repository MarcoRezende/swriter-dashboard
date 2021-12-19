import { Category } from '../entities/Category';
import { CrudModel } from './crud.model';
import themesModel from './themes.model';

class CategoriesModel extends CrudModel<Category> {
  constructor() {
    super('category', [{ key: 'theme', model: themesModel }]);
  }
}

export default new CategoriesModel();
