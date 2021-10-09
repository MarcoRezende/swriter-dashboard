import { CategoryProvider } from "./useCategory";

const AppProvider: React.FC = ({ children }) => (
  <CategoryProvider>{children}</CategoryProvider>
);

export default AppProvider;
