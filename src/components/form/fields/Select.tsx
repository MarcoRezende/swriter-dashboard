import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { BaseSelect, optionsFormatter, SelectOption } from './BaseSelect';

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
    selectKey?: string;
  };
}

export const Select: React.FC<TextAreaProps> = ({
  error,
  entity,
  control,
  rules,
  isEditMode,
  field: { name, label, placeholder, selectOptions, selectKey },
}) => {
  return (
    <Controller
      name={name}
      key={'form-control-' + name}
      control={control}
      rules={rules}
      render={({ field: { ref, value, ...rest } }) => (
        <FormControl mb="1.5rem" isInvalid={error}>
          <FormLabel fontSize="1.3rem" htmlFor={name}>
            {label}.
          </FormLabel>
          <BaseSelect
            {...rest}
            options={selectOptions}
            id={name}
            defaultValue={
              isEditMode && optionsFormatter([entity[name]], selectKey ?? '')
            }
            placeholder={placeholder}
            noOptionsMessage={() => 'Nenhum valor disponível'}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};
