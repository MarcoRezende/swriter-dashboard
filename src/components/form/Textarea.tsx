import { RegisterOptions } from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea as ChakraTextarea } from "@chakra-ui/textarea";

interface TextAreaProps {
  error: any;
  entity: any;
  register: any;
  rules: RegisterOptions;
  field: {
    name: string;
    label?: string;
    placeholder?: string;
  };
}

export const Textarea: React.FC<TextAreaProps> = ({
  error,
  entity,
  register,
  rules,
  field: { name, label, placeholder },
}) => {
  return (
    <FormControl mb="1.5rem" isInvalid={error}>
      {name && (
        <FormLabel fontSize="1.3rem" htmlFor={name}>
          {label}.
        </FormLabel>
      )}
      <Input
        as={ChakraTextarea}
        defaultValue={entity[name]}
        id={name}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
