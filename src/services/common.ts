import { createStandaloneToast, UseToastOptions } from "@chakra-ui/toast";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../config/axios";

interface DTO<T> {
  resource: string;
  data?: T;
  file?: File;
  id?: string;
  requestQuery?: { [key: string]: any };
}

interface NextPaginateResponse {
  count: number;
  data: [];
  page: number;
  pageCount: number;
  total: number;
}

const toast = createStandaloneToast();
const baseErrorToastProps: UseToastOptions = {
  title: "Erro.",
  position: "bottom-right",
  status: "error",
  duration: 9000,
  isClosable: true,
};

const baseSuccessToastProps: UseToastOptions = {
  title: "Sucesso.",
  position: "bottom-right",
  status: "success",
  duration: 9000,
  isClosable: true,
};

export const createOneBase = async <K>({
  resource,
  data,
}: DTO<K>): Promise<K | undefined> => {
  try {
    const { data: response } = await api.post<K>(resource, data || ({} as K));

    toast({
      ...baseSuccessToastProps,
      description: "Criação realizada com sucesso.",
    });

    return response;
  } catch (err) {
    console.error(err);

    toast({
      ...baseErrorToastProps,
      description: handleErrorMessage(
        (err as AxiosError).response?.status as number,
        "Falha ao criar."
      ),
    });
  }
};

export const getManyBase = async <K>({ resource, requestQuery }: DTO<K>) => {
  try {
    const { data: response } = await api.get<
      K[],
      AxiosResponse<NextPaginateResponse>
    >(resource, {
      params: requestQuery,
    });

    return response.data;
  } catch (err) {
    console.error(err);

    toast({
      ...baseErrorToastProps,
      description: "Falha ao obter conteúdo.",
    });

    return [];
  }
};

export const getOneBase = async <K>({
  resource,
  id,
}: DTO<K>): Promise<K | undefined> => {
  try {
    return (await api.get<K>(`${resource}/${id}`)).data;
  } catch (err) {
    console.error(err);

    toast({
      ...baseErrorToastProps,
      description: "Falha ao obter conteúdo.",
    });
  }
};

export const deleteOneBase = async <K>({ resource, id }: DTO<K>) => {
  try {
    await api.delete<K>(`${resource}/${id}`);

    toast({
      ...baseSuccessToastProps,
      description: "Deleção realizada com sucesso.",
    });
  } catch (err) {
    console.error(err);

    toast({
      ...baseErrorToastProps,
      description: "Falha ao deletar conteúdo.",
    });
  }
};

export const patchOneBase = async <K>({ resource, id, data }: DTO<K>) => {
  try {
    await api.patch<K>(`${resource}/${id}`, data);

    toast({
      ...baseSuccessToastProps,
      description: "Atualização realizada com sucesso.",
    });
  } catch (err) {
    console.error(err);

    toast({
      ...baseErrorToastProps,
      description: "Falha ao atualizar conteúdo.",
    });
  }
};

export const uploadFile = async <K>({ resource, file }: DTO<K>) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);

    await api.post<FormData>(`${resource}`, formData);

    toast({
      ...baseSuccessToastProps,
      description: "Arquivo upado com sucesso.",
    });
  } catch (err) {
    console.error(err);

    toast({
      ...baseErrorToastProps,
      description: "Falha upar conteudo.",
    });
  }
};

const handleErrorMessage = (
  statusCode: number,
  defaultMessage: string
): string => {
  switch (statusCode) {
    case 409:
      return "Registro duplicado.";

    default:
      return defaultMessage;
  }
};
