import { BaseEntity } from "./base_entity";
import { Hint } from "./Hint";
import { Theme } from "./Theme";

export class Category extends BaseEntity<Category> {
  hint?: Hint;
  name!: string;
  theme!: Theme;
}
