import {
  createOneBase,
  deleteAllBase,
  deleteOneBase,
  getManyBase,
  getOneBase,
  patchOneBase,
} from "../services/common";

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type RelationType =
  | "one-to-one"
  | "one-to-many"
  | "many-to-one"
  | "many-to-many";

export interface DescriptionProps {
  subject: string;
  key: string;
  relation: RelationType;
  type: "dateTime";
}

export type EntityDescriptionProps = AtLeast<
  DescriptionProps,
  "subject" | "key" | "type"
>;

export class CrudModel<Entity> {
  public constructor(private endpoint: string) {}

  async getMany() {
    return getManyBase({ resource: this.endpoint });
  }

  async create(data: Entity): Promise<void> {
    await createOneBase<Entity>({ resource: this.endpoint, data });
  }

  async patch(entityId: string, data: Entity): Promise<void> {
    await patchOneBase<Entity>({ resource: this.endpoint, id: entityId, data });
  }

  async delete(entityId: string): Promise<void> {
    await deleteOneBase<Entity>({ resource: this.endpoint, id: entityId });
  }

  async deleteAll() {
    await deleteAllBase({ resource: this.endpoint });
  }

  async entityDescription(): Promise<EntityDescriptionProps[]> {
    return getOneBase<any>({
      resource: `${this.endpoint}/entityDescription`,
      id: "",
    });
  }
}
