import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { RegisterOptions } from "react-hook-form";
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
  relation?: RelationType;
  type?: "dateTime" | "text" | "textarea" | "select" | "multi-select" | "radio";
  selectKey?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export type EntityDescriptionProps = AtLeast<
  DescriptionProps,
  "subject" | "key" | "type"
>;

interface RequestQueryBuilderObject {
  [key: string]: any;
}

interface JoinProps {
  model: CrudModel<any>;
  key: string;
}

export class CrudModel<Entity> {
  public relationOptions: Array<{
    key: string;
    data: any;
  }> = [];

  public constructor(
    public endpoint: string,
    private joins: JoinProps[] = []
  ) {}

  async getMany(requestQuery?: RequestQueryBuilderObject) {
    return getManyBase({ resource: this.endpoint, requestQuery });
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

  async entityDescription(
    loadRelations: boolean = false
  ): Promise<EntityDescriptionProps[]> {
    const entityDescription = (await getOneBase<EntityDescriptionProps[]>({
      resource: `${this.endpoint}/entityDescription`,
      id: "",
    })) as EntityDescriptionProps[];

    if (loadRelations) await this.loadedRelationOptions();

    return entityDescription;
  }

  private async loadedRelationOptions() {
    Promise.all(
      this.joins.map(async (join) => {
        this.relationOptions.push({
          data: await join.model.getMany(),
          key: join.key,
        });
      })
    );
  }
}
