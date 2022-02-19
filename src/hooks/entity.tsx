import { createContext, useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

import { RequestQueryBuilder } from '@nestjsx/crud-request';

import { FormField } from '../components/form/EntityField';
import { CrudModel } from '../models/crud.model';
import { formatTableContent, TableColumnsProps } from '../utils/table';
import { optionsFormatter } from '../components/form/fields/BaseSelect';

interface EntityContextData {
  generateTableContent(
    model: CrudModel<any>,
    columns: string[],
    page: number
  ): UseQueryResult<TableColumnsProps, unknown>;

  loadRelationOptions(
    model: CrudModel<any>,
    formFields: string[]
  ): UseQueryResult<FormField[], unknown>;
}

const EntityContext = createContext<EntityContextData>({} as EntityContextData);

const requestQuery = RequestQueryBuilder.create().sortBy({
  field: 'createdDate',
  order: 'DESC',
});
export const EntityProvider: React.FC = ({ children }) => {
  const generateTableContent = (
    model: CrudModel<any>,
    columns: string[],
    page: number
  ) => {
    async function fetchData(): Promise<TableColumnsProps> {
      const entityDescription = await model.entityDescription();
      const foundEntities = await model.getMany(
        requestQuery.setPage(page).queryObject
      );

      return formatTableContent(columns, entityDescription, foundEntities);
    }

    return useQuery([model.endpoint, page], fetchData, {
      staleTime: 5 * 500, // 5s
    });
  };

  const loadRelationOptions = (model: CrudModel<any>, formFields: string[]) => {
    const fetchData = async (): Promise<FormField[]> => {
      const entityDescription = await model.entityDescription();
      const relationOptions = await model.loadRelationOptions();

      const formattedFields = formFields.reduce<FormField[]>(
        (allFields: FormField[], key) => {
          const description = entityDescription.find(
            (desc) => desc.key === key
          );

          if (description?.type) {
            const {
              placeholder,
              subject: label,
              type,
              rules = {},
              key: name,
              relation,
              selectKey = 'name',
            } = description;

            const fieldProps = {
              placeholder: placeholder ?? '',
              label,
              type,
              name,
              rules,
            };

            if (relation) {
              const selectOptions =
                relationOptions.find((relation) => relation.key === key)
                  ?.data ?? [];

              if (!selectKey) {
                console.warn(
                  'Using default key (name) to generate select values.'
                );
              }

              Object.assign(fieldProps, {
                selectKey,
                selectOptions: optionsFormatter(selectOptions, selectKey),
              });
            }

            allFields.push(fieldProps);
          }

          return allFields;
        },
        []
      );

      return formattedFields;
    };

    return useQuery(model.endpoint + '-relations', fetchData, {
      refetchOnWindowFocus: false,
      staleTime: 5 * 500, // 5m
    });
  };

  return (
    <EntityContext.Provider
      value={{ generateTableContent, loadRelationOptions }}
    >
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
