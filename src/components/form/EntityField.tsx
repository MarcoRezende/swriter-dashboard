import { Text } from "@chakra-ui/layout";
import {
  Control,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { SelectOption } from "./fields/BaseSelect";
import { Input } from "./fields/Input";
import { MultiSelect } from "./fields/MultiSelect";
import { Select } from "./fields/Select";
import { Textarea } from "./fields/Textarea";

export enum FieldType {
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
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

interface EntityFieldProps {
  entity: { [key: string]: any };
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, object>;
  field: FormField;
  errors: { [key: string]: any };
  isEditMode: boolean;
}

export const EntityField: React.FC<EntityFieldProps> = ({
  field: {
    label,
    placeholder,
    rules,
    type,
    selectOptions,
    selectOptionKey,
    name,
  },
  entity,
  register,
  control,
  errors,
  isEditMode,
}) => {
  return (
    <>
      {(() => {
        switch (type) {
          case FieldType.TEXTAREA:
            return (
              <Textarea
                error={errors[name]}
                entity={entity}
                field={{ name, label, placeholder }}
                register={register}
                rules={rules}
                key={"form-control-" + name}
              />
            );

          case FieldType.TEXT:
            return (
              <Input
                error={errors[name]}
                entity={entity}
                field={{ name, label, placeholder }}
                register={register}
                rules={rules}
                key={"form-control-" + name}
              />
            );

          case FieldType.SELECT:
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
                  selectOptionKey,
                }}
                rules={rules}
                key={"form-control-" + name}
                control={control}
              />
            );

          case FieldType.MULTI_SELECT:
            return (
              <MultiSelect
                error={errors[name]}
                entity={entity}
                isEditMode={isEditMode}
                field={{
                  name,
                  label,
                  placeholder,
                  selectOptions,
                  selectOptionKey,
                }}
                rules={rules}
                key={"form-control-" + name}
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
