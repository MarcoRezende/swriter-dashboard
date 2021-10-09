import { api } from "../config/axios";

interface DTO<T> {
  resource: string;
  data?: T;
  id?: number;
}

export const createOneBase = async <K>({ resource, data }: DTO<K>) => {
  return api.post<K>(resource, data || ({} as K));
};

export const getManyBase = async <K>({ resource }: DTO<K>) => {
  return api.get<K[]>(resource);
};

export const deleteOneBase = async <K>({ resource, id }: DTO<K>) => {
  return api.delete<K>(`${resource}/${id}`);
};
