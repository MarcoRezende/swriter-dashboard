import { createContext, useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

import { RequestQueryBuilder } from '@nestjsx/crud-request';

import { CrudModel } from '../models/crud.model';
import { formatTableContent, TableColumnsProps } from '../utils/table';

interface EntityContextData {
  generateTableContent(
    model: CrudModel<any>,
    columns: string[]
  ): UseQueryResult<TableColumnsProps, unknown>;
}

const EntityContext = createContext<EntityContextData>({} as EntityContextData);

const requestQuery = RequestQueryBuilder.create().sortBy({
  field: 'createdDate',
  order: 'DESC',
}).queryObject;

export const EntityProvider: React.FC = ({ children }) => {
  const generateTableContent = (model: CrudModel<any>, columns: string[]) => {
    async function fetchData(): Promise<TableColumnsProps> {
      const localEntityDescription = await model.entityDescription();
      const foundEntities: any[] = await model.getMany(requestQuery);

      return formatTableContent(columns, localEntityDescription, foundEntities);
    }

    return useQuery(model.endpoint, fetchData);
  };

  return (
    <EntityContext.Provider value={{ generateTableContent }}>
      {children}
    </EntityContext.Provider>
  );
};

export const useEntity = (): EntityContextData => {
  const context = useContext(EntityContext);

  if (!context) {
    throw new Error('useEntity must be within a EntityContext');
  }

  return context;
};
