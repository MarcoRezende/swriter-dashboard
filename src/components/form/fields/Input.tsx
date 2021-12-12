import { RegisterOptions } from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input as ChakraInput } from "@chakra-ui/input";

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

export const Input: React.FC<TextAreaProps> = ({
  error,
  entity,
  register,
  rules,
  field: { name, label, placeholder },
}) => {
  return (
    <FormControl mb="1.5rem" key={"form-control-" + name} isInvalid={error}>
      <FormLabel fontSize="1.3rem" htmlFor={name}>
        {label}.
      </FormLabel>
      <ChakraInput
        id={name}
        placeholder={placeholder}
        defaultValue={entity[name]}
        {...register(name, rules)}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
