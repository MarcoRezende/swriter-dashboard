import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";

import { CrudModel } from "../../models/crud.model";
import { getOneBase } from "../../services/common";
import { EntityField, FieldType, FormField } from "./EntityField";
import { retrieveValueOnly } from "./fields/BaseSelect";

interface FormProps<T> {
  idName?: string;
  endpoint: string;
  fields: FormField[];
  title: string;
  mode?: "edit" | "create";
  model: CrudModel<T>;
}

type GenericEntity = {
  [key: string]: any;
};

export function EntityCrud<Entity>({
  idName,
  fields,
  endpoint,
  title,
  model,
  mode = "create",
}: FormProps<Entity>) {
  const [loading, setLoading] = useState({
    updatingOrCreating: false,
    deleting: false,
  });
  const [entity, setEntity] = useState<GenericEntity>({} as GenericEntity);
  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const entityId = router.query[idName as string] as string | undefined;

  const filteredFields = fields.map((field) => {
    if (typeof field.rules.required === "string") return field;
    else if (typeof field.rules.required === "boolean")
      return {
        ...field,
        rules: { ...field.rules, required: "Campo obrigatório" },
      };

    return field;
  });

  const onSubmit = async (rawData: any) => {
    // retrieve only the value from select
    const data = retrieveValueOnly<Entity>(rawData);
    setLoading({ ...loading, updatingOrCreating: true });

    try {
      if (isCreateMode) {
        await model.create(data);
        reset();
      } else {
        await model.patch(entityId ?? "", data);
      }

      // redirect to entity table
      router.push(router.pathname.split("/").slice(0, 2).join("/"));
    } catch (err) {
      console.error(err);
    }

    setLoading({ ...loading, updatingOrCreating: false });
  };

  const deleteOne = useCallback(async () => {
    setLoading({ ...loading, deleting: true });

    try {
      await model.delete(entityId ?? "");
      router.push(router.pathname.split("/").slice(0, 2).join("/"));
    } catch (err) {
      console.error(err);
    }

    setLoading({ ...loading, deleting: false });
  }, [entityId, router, loading, model]);

  useEffect(() => {
    const isEditMode = mode === "edit";

    if (entityId && isEditMode) {
      let cancel = false;

      const fetchData = async () => {
        try {
          const fetchedEntity = await getOneBase<GenericEntity>({
            resource: endpoint,
            id: entityId,
          });

          if (cancel) return;

          setEntity(fetchedEntity as GenericEntity);

          return fetchedEntity;
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();

      return () => {
        cancel = true;
      };
    }
  }, [endpoint, entityId, mode]);

  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const isEntityOptionsLoaded = () => {
    const selectFields = fields.filter((field) =>
      [FieldType.MULTI_SELECT, FieldType.SELECT].includes(field.type)
    );

    return selectFields.every((field) => {
      if (!field.selectOptionKey) {
        throw new Error(`Key is required at select "${field.label}".`);
      }

      return field.selectOptionKey && entity[field.name];
    });
  };

  return (
    <>
      {(isCreateMode || (isEditMode && isEntityOptionsLoaded())) && (
        <Flex
          p="2rem"
          maxW={{ base: "70%", md: "600px" }}
          h="100%"
          m="auto"
          align="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Heading alignSelf="flex-start" mb="1rem">
            {mode === "edit" ? "Editar" : "Criar"} {title}.
          </Heading>
          <Box
            w="100%"
            as="form"
            bg="gray.800"
            boxShadow="xl"
            borderRadius="0.5rem"
            p="2rem"
            onSubmit={handleSubmit(onSubmit)}
          >
            {filteredFields.map((field) => (
              <EntityField
                field={field}
                setValue={setValue}
                entity={entity}
                register={register}
                errors={errors}
                isEditMode={isEditMode}
                control={control}
                key={"field-" + field.name}
              />
            ))}
            <Flex gridGap={"10px"}>
              {mode === "edit" ? (
                <>
                  <Button
                    onClick={() => deleteOne()}
                    bg="red.800"
                    w="100%"
                    mt={4}
                    isLoading={loading.deleting}
                    _hover={{
                      bg: "red.700",
                    }}
                  >
                    Deletar
                  </Button>

                  <Button
                    bg="green.700"
                    w="100%"
                    mt={4}
                    isLoading={loading.updatingOrCreating}
                    type="submit"
                    _hover={{
                      bg: "green.600",
                    }}
                  >
                    Atualizar
                  </Button>
                </>
              ) : (
                <Button
                  bg="blue.800"
                  w="100%"
                  mt={4}
                  isLoading={loading.updatingOrCreating}
                  type="submit"
                  _hover={{
                    bg: "blue.700",
                  }}
                >
                  Criar
                </Button>
              )}
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}
