import { Theme } from '../entities/Theme';
import { CrudModel } from './crud.model';

class ThemesModel extends CrudModel<Theme> {
  constructor() {
    super('admin/theme');
  }
}

export default new ThemesModel();
