import { RegisterOptions } from 'react-hook-form';

import {
  createOneBase,
  deleteAllBase,
  deleteOneBase,
  getManyBase,
  getOneBase,
  patchOneBase,
  uploadFile,
} from '../services/common';

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type RelationType =
  | 'one-to-one'
  | 'one-to-many'
  | 'many-to-one'
  | 'many-to-many';

export interface DescriptionProps {
  subject: string;
  key: string;
  relation?: RelationType;
  type?: 'dateTime' | 'text' | 'textarea' | 'select' | 'multi-select' | 'radio';
  selectKey?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export type EntityDescriptionProps = AtLeast<
  DescriptionProps,
  'subject' | 'key' | 'type'
>;

interface RequestQueryBuilderObject {
  [key: string]: any;
}

interface JoinProps<T> {
  model: T;
  key: string;
}

interface RelationProps {
  key: string;
  data: any;
}

export class CrudModel<Entity> {
  public localEntityDescription: EntityDescriptionProps[] = [];

  public constructor(
    public endpoint: string,
    private joins: JoinProps<CrudModel<any>>[] = []
  ) {}

  async getOne(id: string) {
    return getOneBase({ resource: this.endpoint, id });
  }

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

  async importCsv(file: File) {
    await uploadFile({ resource: `${this.endpoint}/importCsv`, file });
  }

  async entityDescription(): Promise<EntityDescriptionProps[]> {
    if (this.localEntityDescription.length) {
      return this.localEntityDescription;
    }

    const entityDescription =
      (await getOneBase<EntityDescriptionProps[]>({
        resource: `${this.endpoint}/entityDescription`,
        id: '',
      })) ?? [];

    this.localEntityDescription = entityDescription;

    return entityDescription;
  }

  async loadRelationOptions() {
    const relationOptions: RelationProps[] = [];

    await Promise.all(
      this.joins.map(async (join) => {
        relationOptions.push({
          data: await join.model.getMany(),
          key: join.key,
        });
      })
    );

    return relationOptions;
  }
}
