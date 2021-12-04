import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { BaseSelect, optionsFormatter, SelectOption } from "./BaseSelect";

interface TextAreaProps {
  error: any;
  entity: any;
  control?: Control<FieldValues, object>;
  rules: RegisterOptions;
  isEditMode: boolean;
  field: {
    name: string;
    label?: string;
    placeholder?: string;
    selectOptions?: SelectOption[];
    selectOptionKey?: string;
  };
}

export const MultiSelect: React.FC<TextAreaProps> = ({
  error,
  entity,
  control,
  rules,
  isEditMode,
  field: { name, label, placeholder, selectOptions, selectOptionKey },
}) => {
  const filterSelectOptions = (
    options: SelectOption[],
    defaultOptions: SelectOption[]
  ) => {
    // TODO: list all options when empty
    return isEditMode
      ? options.filter((option) =>
          defaultOptions.find(
            (defaultValue) => defaultValue.label !== option.label
          )
        )
      : options;
  };

  return (
    <Controller
      name={name}
      key={"form-control-" + name}
      control={control}
      render={({ field: { ref, ...rest } }) => (
        <FormControl mb="1.5rem" isInvalid={error}>
          <FormLabel fontSize="1.3rem" htmlFor={name}>
            {label}.
          </FormLabel>
          <BaseSelect
            {...rest}
            isMulti
            options={filterSelectOptions(
              selectOptions as SelectOption[],
              optionsFormatter(entity[name], selectOptionKey ?? "")
            )}
            id={name}
            defaultValue={
              isEditMode &&
              optionsFormatter(entity[name], selectOptionKey ?? "")
            }
            placeholder={placeholder}
            noOptionsMessage={() => "Nenhum valor disponível"}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
      rules={rules}
    />
  );
};
