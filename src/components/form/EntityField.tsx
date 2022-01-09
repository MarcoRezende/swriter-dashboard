import { Text } from '@chakra-ui/layout';
import {
  Control,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { SelectOption } from './fields/BaseSelect';
import { Input } from './fields/Input';
import { MultiSelect } from './fields/MultiSelect';
import { Select } from './fields/Select';
import { Textarea } from './fields/Textarea';

export type FieldType =
  | 'dateTime'
  | 'text'
  | 'textarea'
  | 'select'
  | 'multi-select'
  | 'radio';

export interface FormField {
  label: string;
  placeholder: string;
  name: string;
  rules: RegisterOptions;
  type: FieldType;
  selectOptions?: SelectOption[];
  selectKey?: string;
}

interface EntityFieldProps {
  entity: { [key: string]: any };
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, object>;
  field: FormField;
  errors: { [key: string]: any };
  isEditMode: boolean;
  setValue: UseFormSetValue<FieldValues>;
}

export const EntityField: React.FC<EntityFieldProps> = ({
  field: { label, placeholder, rules, type, selectOptions, selectKey, name },
  entity,
  register,
  setValue,
  control,
  errors,
  isEditMode,
}) => {
  return (
    <>
      {(() => {
        switch (type) {
          case 'textarea':
            return (
              <Textarea
                error={errors[name]}
                entity={entity}
                field={{ name, label, placeholder }}
                register={register}
                rules={rules}
                key={'form-control-' + name}
              />
            );

          case 'text':
            return (
              <Input
                error={errors[name]}
                entity={entity}
                field={{ name, label, placeholder }}
                register={register}
                rules={rules}
                key={'form-control-' + name}
              />
            );

          case 'select':
            return (
              <Select
                error={errors[name]}
                entity={entity}
                isEditMode={isEditMode}
                field={{
                  name,
                  label,
                  placeholder,
                  selectOptions,
                  selectKey,
                }}
                rules={rules}
                key={'form-control-' + name}
                control={control}
              />
            );

          case 'multi-select':
            return (
              <MultiSelect
                error={errors[name]}
                entity={entity}
                setValue={setValue}
                isEditMode={isEditMode}
                field={{
                  name,
                  label,
                  placeholder,
                  selectOptions,
                  selectKey,
                }}
                rules={rules}
                key={'form-control-' + name}
                control={control}
              />
            );

          default:
            <Text>Tipo inválido</Text>;
        }
      })()}
    </>
  );
};
