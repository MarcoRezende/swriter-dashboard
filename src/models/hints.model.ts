import { Hint } from "../entities/Hint";
import { CrudModel } from "./crud.model";

class HintsModel extends CrudModel<Hint> {
  constructor() {
    super("hint");
  }
}

export default new HintsModel();
