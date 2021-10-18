import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import base from "@emotion/styled/types/base";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { createOneBase } from "../../services/common";
import { retrieveValueOnly, Select, SelectOption } from "./Select";

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
}

interface FormProps {
  endpoint: string;
  fields: FormField[];
  title: string;
}

export const CreateForm: React.FC<FormProps> = ({
  fields,
  endpoint,
  title,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

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

  return (
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
        Criar {title}.
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
          ({ name, placeholder, label, rules, type, selectOptions }) =>
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
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          mb="1.5rem"
                          key={"form-control-" + name}
                          isInvalid={errors[name]}
                        >
                          <FormLabel fontSize="1.3rem" htmlFor={name}>
                            {label}.
                          </FormLabel>
                          <Select
                            {...field}
                            options={selectOptions}
                            id={name}
                            placeholder={placeholder}
                            noOptionsMessage={() => "Nenhum valor disponível"}
                          />
                          <FormErrorMessage>
                            {errors[name] && errors[name].message}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                      rules={rules}
                    />
                  );

                case FieldType.MULTI_SELECT:
                  return (
                    <Controller
                      name={name}
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          mb="1.5rem"
                          key={"form-control-" + name}
                          isInvalid={errors[name]}
                        >
                          <FormLabel fontSize="1.3rem" htmlFor={name}>
                            {label}.
                          </FormLabel>
                          <Select
                            {...field}
                            isMulti
                            options={selectOptions}
                            id={name}
                            placeholder={placeholder}
                            noOptionsMessage={() => "Nenhum valor disponível"}
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
        <Button w="100%" mt={4} isLoading={isSubmitting} type="submit">
          Criar
        </Button>
      </Box>
    </Flex>
  );
};
