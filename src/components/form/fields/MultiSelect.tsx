import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { useCallback, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form';

import { BaseSelect, optionsFormatter, SelectOption } from './BaseSelect';

interface TextAreaProps {
  error: any;
  entity: any;
  control?: Control<FieldValues, object>;
  rules: RegisterOptions;
  isEditMode: boolean;
  setValue: UseFormSetValue<FieldValues>;
  field: {
    name: string;
    label?: string;
    placeholder?: string;
    selectOptions?: SelectOption[];
    selectKey?: string;
  };
}

export const MultiSelect: React.FC<TextAreaProps> = ({
  error,
  entity,
  control,
  rules,
  isEditMode,
  setValue,
  field: { name, label, placeholder, selectOptions = [], selectKey },
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(
    optionsFormatter(entity[name], selectKey ?? '')
  );

  const filterSelectOptions = useCallback(() => {
    if (isEditMode && !!selectedOptions.length) {
      return selectOptions.filter((option) => {
        return !selectedOptions.find(
          (defaultOption) => defaultOption.label === option.label
        );
      });
    }

    return selectOptions;
  }, [selectedOptions, isEditMode, selectOptions]);

  const [visibleOptions, setVisibleOptions] = useState<SelectOption[]>(
    filterSelectOptions()
  );

  useEffect(() => {
    setVisibleOptions(filterSelectOptions());
    setValue(name, selectedOptions);
  }, [selectedOptions, filterSelectOptions, setValue, name]);

  return (
    <Controller
      name={name}
      key={'form-control-' + name}
      control={control}
      render={({ field: { ref, ...rest } }) => (
        <FormControl mb="1.5rem" isInvalid={error}>
          <FormLabel fontSize="1.3rem" htmlFor={name}>
            {label}.
          </FormLabel>
          <BaseSelect
            {...rest}
            value={selectedOptions}
            onChange={(newValues: any) => {
              setSelectedOptions([...(newValues as SelectOption[])]);
            }}
            isMulti
            options={visibleOptions}
            id={name}
            placeholder={placeholder}
            noOptionsMessage={() => 'Nenhum valor disponível'}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
      rules={rules}
    />
  );
};
