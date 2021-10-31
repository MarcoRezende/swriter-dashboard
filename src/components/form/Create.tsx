import { useRouter } from "next/router";
import { useCallback, useEffect, useState, memo } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";

import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";

import {
  createOneBase,
  deleteOneBase,
  getOneBase,
} from "../../services/common";
import {
  optionsFormatter,
  retrieveValueOnly,
  Select,
  SelectOption,
} from "./Select";

export enum FieldType {
  TEXT = "TEXT",
  TEXTAREA = "textarea",
  SELECT = "SELECT",
  MULTI_SELECT = "MULTI_SELECT",
  RADIO = "RADIO",
}

export interface FormField {
  label: string;
  placeholder: string;
  name: string;
  rules: RegisterOptions;
  type: FieldType;
  selectOptions?: SelectOption[];
  selectOptionKey?: string;
}

interface FormProps {
  idName?: string;
  endpoint: string;
  fields: FormField[];
  title: string;
  mode?: "edit" | "create";
}

type Entity = {
  [key: string]: any;
};

export const CreateForm: React.FC<FormProps> = memo(function CreateForm({
  idName,
  fields,
  endpoint,
  title,
  mode = "create",
}) {
  const [entity, setEntity] = useState<Entity>({} as Entity);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { theme: { value: "marco", label: "marco" } } as any,
  });

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
    // retrieve only the value from custom the select
    const data = retrieveValueOnly(rawData);

    try {
      await createOneBase({ resource: endpoint, data });
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOne = useCallback(async () => {
    try {
      await deleteOneBase({ resource: endpoint, id: entityId ?? "" });
      router.back();
    } catch (err) {
      console.error(err);
    }
  }, [endpoint, entityId, router]);

  useEffect(() => {
    const isEditMode = mode === "edit";

    if (entityId && isEditMode) {
      let cancel = false;

      const fetchData = async () => {
        try {
          const fetchedEntity = await getOneBase<Entity>({
            resource: endpoint,
            id: entityId,
          });

          if (cancel) return;

          setEntity(fetchedEntity as Entity);

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
        console.error(`Key is required at select "${field.label}".`);
        return;
      }

      return (
        field.selectOptionKey &&
        entity[field.name] &&
        entity[field.name][field.selectOptionKey]
      );
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
            {filteredFields.map(
              ({
                name,
                placeholder,
                label,
                rules,
                type,
                selectOptions,
                selectOptionKey,
              }) =>
                (() => {
                  switch (type) {
                    case FieldType.TEXTAREA:
                      return (
                        // TODO: abstrair para um componente.
                        <FormControl
                          mb="1.5rem"
                          key={"form-control-" + name}
                          isInvalid={errors[name]}
                        >
                          <FormLabel fontSize="1.3rem" htmlFor={name}>
                            {label}.
                          </FormLabel>
                          <Input
                            as={Textarea}
                            id={name}
                            placeholder={placeholder}
                            {...register(name, rules)}
                          />
                          <FormErrorMessage>
                            {errors[name] && errors[name].message}
                          </FormErrorMessage>
                        </FormControl>
                      );

                    case FieldType.TEXT:
                      return (
                        <FormControl
                          mb="1.5rem"
                          key={"form-control-" + name}
                          isInvalid={errors[name]}
                        >
                          <FormLabel fontSize="1.3rem" htmlFor={name}>
                            {label}.
                          </FormLabel>
                          <Input
                            id={name}
                            placeholder={placeholder}
                            defaultValue={entity[name]}
                            {...register(name, rules)}
                          />
                          <FormErrorMessage>
                            {errors[name] && errors[name].message}
                          </FormErrorMessage>
                        </FormControl>
                      );

                    case FieldType.SELECT:
                      return (
                        <Controller
                          name={name}
                          key={"form-control-" + name}
                          control={control}
                          rules={rules}
                          render={({ field: { ref, value, ...rest } }) => (
                            <FormControl mb="1.5rem" isInvalid={errors[name]}>
                              <FormLabel fontSize="1.3rem" htmlFor={name}>
                                {label}.
                              </FormLabel>
                              <Select
                                {...rest}
                                options={selectOptions}
                                id={name}
                                defaultValue={optionsFormatter(
                                  [entity[name]],
                                  selectOptionKey ?? ""
                                )}
                                placeholder={placeholder}
                                noOptionsMessage={() =>
                                  "Nenhum valor disponível"
                                }
                              />
                              <FormErrorMessage>
                                {errors[name] && errors[name].message}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        />
                      );

                    case FieldType.MULTI_SELECT:
                      return (
                        <Controller
                          name={name}
                          key={"form-control-" + name}
                          control={control}
                          render={({ field: { ref, ...rest } }) => (
                            <FormControl mb="1.5rem" isInvalid={errors[name]}>
                              <FormLabel fontSize="1.3rem" htmlFor={name}>
                                {label}.
                              </FormLabel>
                              <Select
                                {...rest}
                                isMulti
                                options={selectOptions}
                                id={name}
                                placeholder={placeholder}
                                noOptionsMessage={() =>
                                  "Nenhum valor disponível"
                                }
                              />
                              <FormErrorMessage>
                                {errors[name] && errors[name].message}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                          rules={rules}
                        />
                      );

                    default:
                      <Text>Tipo inválido</Text>;
                  }
                })()
            )}
            <Flex gridGap={"10px"}>
              {mode === "edit" ? (
                <>
                  <Button
                    onClick={() => deleteOne()}
                    bg="red.800"
                    w="100%"
                    mt={4}
                    isLoading={isSubmitting}
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
                    isLoading={isSubmitting}
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
                  isLoading={isSubmitting}
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
});
