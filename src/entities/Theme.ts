import { BaseEntity } from "./base_entity";
import { Category } from "./Category";

export class Theme extends BaseEntity<Theme> {
  name!: string;
  categories!: Category[];
}
