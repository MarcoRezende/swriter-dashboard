import { Select } from "chakra-react-select";
import { ChakraSelectProps } from "chakra-react-select/dist/types/types";

export type MultiSelectOption = {
  label: string;
  value: string;
  isFixed?: boolean;
};

export interface MultiSelectProps extends ChakraSelectProps {
  options?: MultiSelectOption[];
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  noOptionsMessage,
  children,
  placeholder,
}) => {
  return (
    <Select
      closeMenuOnSelect={false}
      colorScheme="blue"
      isMulti
      options={options}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
    />
  );
};
