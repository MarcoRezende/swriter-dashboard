export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

export class BaseEntity<T> {
  constructor(obj?: DeepPartial<T>) {
    Object.assign(this, obj);
  }

  id?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
