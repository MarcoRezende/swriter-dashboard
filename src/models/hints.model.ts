import { Hint } from '../entities/Hint';
import categoriesModel from './categories.model';
import { CrudModel } from './crud.model';

class HintsModel extends CrudModel<Hint> {
  constructor() {
    super('hint', [{ key: 'categories', model: categoriesModel }]);
  }
}

export default new HintsModel();
