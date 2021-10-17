import { Select as ChakraSelect } from "chakra-react-select";
import { ChakraSelectProps } from "chakra-react-select/dist/types/types";

export type SelectOption = {
  label: string;
  value: any;
  isFixed?: boolean;
};

export interface SelectProps extends ChakraSelectProps {
  options?: SelectOption[];
  isMulti?: boolean;
}

export const retrieveValueOnly = (data: Record<string, any>) => {
  let obj: any = {};

  Object.entries(data).forEach(([key]) => {
    if (data[key].label) {
      obj[key] = data[key].value;
      return;
    }

    obj[key] = data[key];
  });

  return obj;
};

export const Select: React.FC<SelectProps> = ({
  options,
  isMulti,
  noOptionsMessage,
  children,
  placeholder,
  ...rest
}) => {
  return (
    <ChakraSelect
      closeMenuOnSelect={false}
      colorScheme="blue"
      isMulti={isMulti}
      options={options}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
      {...rest}
    />
  );
};
