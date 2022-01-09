import { EntityProvider } from './entity';

export const AppProvider: React.FC = ({ children }) => {
  return <EntityProvider>{children}</EntityProvider>;
};
