import { CategoryProvider } from "./useCategory";
import { HintProvider } from "./useHint";

const AppProvider: React.FC = ({ children }) => (
  <CategoryProvider>
    <HintProvider>{children}</HintProvider>
  </CategoryProvider>
);

export default AppProvider;
