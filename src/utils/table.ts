import { EntityDescriptionProps } from '../models/crud.model';
import get from 'lodash.get';
import { formatDate } from './date';
import { NextPaginateResponse } from '../services/common';

export type TableColumnProps = {
  entityId: string;
  values: string[];
};

export interface TableColumnsProps {
  tableHeader: string[];
  tableBody: TableColumnProps[];
  total: number;
  count: number;
}

export function formatTableContent(
  columns: string[],
  entityDescription: EntityDescriptionProps[],
  entities: NextPaginateResponse<{ [key: string]: any }>
): TableColumnsProps {
  const tableHeader = columns.map((key) => {
    const description = entityDescription.find((description) => {
      if (description?.relation) {
        return key.split('.')[0] === description.key;
      }

      return description.key === key;
    });

    return description?.subject ?? '';
  });

  const { data, total, count } = entities;

  const tableBody = data.map((entity) => {
    return {
      entityId: entity.id,
      values: columns.map((key) => {
        const description = entityDescription.find((description) => {
          if (description?.relation) {
            return key.split('.')[0] === description.key;
          }

          return description.key === key;
        });

        if (description?.type === 'dateTime') {
          return formatDate(get(entity, key), { relative: true });
        }

        return get(entity, key) ?? '';
      }),
    };
  });

  return { tableBody, tableHeader, total, count };
}
