import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { RegisterOptions, useForm } from "react-hook-form";
import { MultiSelect } from "./MultiSelect";

export enum FieldType {
  text = "text",
  textarea = "textarea",
  select = "select",
  multi_select = "multi_select",
  radio = "radio",
}

export interface FormField {
  label: string;
  placeholder: string;
  name: string;
  rules: RegisterOptions;
  type: FieldType;
}

interface FormProps {
  fields: FormField[];
}

export const CreateForm: React.FC<FormProps> = ({ fields }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchedFields = watch();

  const filteredFields = fields.map((field) => {
    if (typeof field.rules.required === "string") return field;
    else if (typeof field.rules.required === "boolean")
      return {
        ...field,
        rules: { ...field.rules, required: "Campo obrigatório" },
      };

    return field;
  });

  const onSubmit = () => {};

  return (
    <Flex
      p="2rem"
      maxW="70%"
      h="100%"
      m="auto"
      align="center"
      justifyContent="center"
    >
      <Box
        w="100%"
        as="form"
        bg="gray.800"
        boxShadow="xl"
        borderRadius="0.5rem"
        p="2rem"
        onSubmit={handleSubmit(onSubmit)}
      >
        {filteredFields.map(({ name, placeholder, label, rules, type }) =>
          (() => {
            switch (type) {
              case FieldType.textarea:
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
                      value={watchedFields[name]}
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

              case FieldType.text:
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
                      value={watchedFields[name]}
                      id={name}
                      placeholder={placeholder}
                      {...register(name, rules)}
                    />
                    <FormErrorMessage>
                      {errors[name] && errors[name].message}
                    </FormErrorMessage>
                  </FormControl>
                );

              case FieldType.multi_select:
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
                      value={watchedFields[name]}
                      as={MultiSelect}
                      id={name}
                      placeholder={placeholder}
                      noOptionsMessage={() => "Nenhum valor disponível"}
                      {...register(name, rules)}
                    />
                    <FormErrorMessage>
                      {errors[name] && errors[name].message}
                    </FormErrorMessage>
                  </FormControl>
                );

              default:
                <Text>Tipo inválido</Text>;
            }
          })()
        )}
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Criar
        </Button>
      </Box>
    </Flex>
  );
};
