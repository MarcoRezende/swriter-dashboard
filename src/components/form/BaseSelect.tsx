import { Select as ChakraSelect } from "chakra-react-select";
import { ChakraSelectProps } from "chakra-react-select/dist/types/types";

export type SelectValue = {
  id: string;
  [key: string]: any;
};

export type SelectOption = {
  label: string;
  value: SelectValue | SelectValue[];
  isFixed?: boolean;
};

export interface SelectProps extends ChakraSelectProps {
  options?: SelectOption[];
  isMulti?: boolean;
}

/**
 * Turns the BaseSelect response - `{ label: string, value: any }` - into
 * the entity format - `{ relation: [{ id: value.id, prop: label, [key: string]: any }], [key: string]: any }`
 * @param data { [key: string]: any }
 * @returns { [key: string]: any }
 */
export function retrieveValueOnly(data: Record<string, any>) {
  let obj: any = {};

  Object.entries(data).forEach(([key]) => {
    if (data[key] instanceof Array) {
      data[key].map((select: any) => {
        if (select.label) {
          obj[key] ? obj[key].push(select.value) : (obj[key] = [select.value]);
        }
      });

      return;
    } else {
      if (data[key].label) {
        obj[key] = data[key].value;
        return;
      }
    }

    obj[key] = data[key];
  });

  return obj;
}

/**
 * Formats entity to BaseSelect format (SelectOption)
 * @param options { id: string }[]
 * @param label property to retrieve from entity and use it as name
 * @returns { label: string, value: string }
 */
export function optionsFormatter(
  options: SelectValue[],
  label: string
): SelectOption[] {
  return (options || []).map((option) => ({
    label: option ? option[label] : "",
    value: { id: option?.id || "" },
  }));
}

export const BaseSelect: React.FC<SelectProps> = ({ children, ...rest }) => {
  return (
    <ChakraSelect closeMenuOnSelect={false} colorScheme="blue" {...rest} />
  );
};
