import { createStandaloneToast, UseToastOptions } from "@chakra-ui/toast";
import { api } from "../config/axios";

interface DTO<T> {
  resource: string;
  data?: T;
  id?: number;
}

const toast = createStandaloneToast();
const baseToastProps: UseToastOptions = {
  title: "Erro.",
  position: "bottom-right",
  status: "error",
  duration: 9000,
  isClosable: true,
};

export const createOneBase = async <K>({
  resource,
  data,
}: DTO<K>): Promise<K> => {
  try {
    return (await api.post<K>(resource, data || ({} as K))).data;
  } catch (err) {
    console.error(err);

    toast({
      ...baseToastProps,
      description: "Falha ao obter criar.",
    });

    return {} as K;
  }
};

export const getManyBase = async <K>({ resource }: DTO<K>) => {
  try {
    return (await api.get<K[]>(resource)).data;
  } catch (err) {
    console.error(err);

    toast({
      ...baseToastProps,
      description: "Falha ao obter conteúdo.",
    });

    return [];
  }
};

export const deleteOneBase = async <K>({ resource, id }: DTO<K>) => {
  try {
    api.delete<K>(`${resource}/${id}`);
  } catch (err) {
    console.error(err);

    toast({
      ...baseToastProps,
      description: "Falha ao deletar conteúdo.",
    });
  }
};
