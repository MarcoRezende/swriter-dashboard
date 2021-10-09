import { api } from "../config/axios";

interface DTO<T> {
  resource: string;
  data?: T;
  id?: number;
}

export const createOneBase = async <K>({
  resource,
  data,
}: DTO<K>): Promise<K> => {
  try {
    return (await api.post<K>(resource, data || ({} as K))).data;
  } catch (err) {
    console.error(err);
    return {} as K;
  }
};

export const getManyBase = async <K>({ resource }: DTO<K>) => {
  try {
    return (await api.get<K[]>(resource)).data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteOneBase = async <K>({ resource, id }: DTO<K>) => {
  try {
    api.delete<K>(`${resource}/${id}`);
  } catch (err) {
    console.error(err);
  }
};
