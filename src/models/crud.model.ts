import {
  createOneBase,
  deleteAllBase,
  deleteOneBase,
  patchOneBase,
} from "../services/common";

export class CrudModel<Entity> {
  public constructor(private endpoint: string) {}

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
}
