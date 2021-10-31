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

export function retrieveValueOnly(data: Record<string, any>) {
  let obj: any = {};

  Object.entries(data).forEach(([key]) => {
    if (data[key].label) {
      obj[key] = data[key].value;
      return;
    }

    obj[key] = data[key];
  });

  return obj;
}

export function optionsFormatter(
  options: SelectValue[],
  label: string
): SelectOption[] {
  return options.map((option) => ({
    label: option ? option[label] : "",
    value: { id: option?.id || "" },
  }));
}

export const Select: React.FC<SelectProps> = ({ children, ...rest }) => {
  return (
    <ChakraSelect closeMenuOnSelect={false} colorScheme="blue" {...rest} />
  );
};
