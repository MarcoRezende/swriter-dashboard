import { Select as ChakraSelect } from "chakra-react-select";
import { ChakraSelectProps } from "chakra-react-select/dist/types/types";

export type SelectOption = {
  label: string;
  value: string;
  isFixed?: boolean;
};

export interface SelectProps extends ChakraSelectProps {
  options?: SelectOption[];
  isMulti?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  isMulti,
  noOptionsMessage,
  children,
  placeholder,
}) => {
  return (
    <ChakraSelect
      closeMenuOnSelect={false}
      colorScheme="blue"
      isMulti={isMulti}
      options={options}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
    />
  );
};
