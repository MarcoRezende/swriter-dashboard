import { Category } from "../entities/Category";
import { CrudModel } from "./crud.model";

class CategoriesModel extends CrudModel<Category> {
  constructor() {
    super("category");
  }
}

export default new CategoriesModel();
