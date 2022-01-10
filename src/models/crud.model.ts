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

  async getOne(id: string): Promise<Entity> {
    return getOneBase<Entity>({ resource: this.endpoint, id });
  }

  async getMany(requestQuery?: RequestQueryBuilderObject): Promise<Entity[]> {
    return getManyBase<Entity>({ resource: this.endpoint, requestQuery });
  }

  async create(data: Entity): Promise<Entity> {
    return createOneBase<Entity>({ resource: this.endpoint, data });
  }

  async patch(entityId: string, data: Entity): Promise<void> {
    await patchOneBase<Entity>({ resource: this.endpoint, id: entityId, data });
  }

  async delete(entityId: string): Promise<void> {
    await deleteOneBase<Entity>({ resource: this.endpoint, id: entityId });
  }

  async deleteAll(): Promise<void> {
    await deleteAllBase({ resource: this.endpoint });
  }

  async importCsv(file: File): Promise<void> {
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

  async loadRelationOptions(): Promise<RelationProps[]> {
    return Promise.all(
      this.joins.map(async (join) => {
        return {
          data: await join.model.getMany(),
          key: join.key,
        };
      })
    );
  }
}
