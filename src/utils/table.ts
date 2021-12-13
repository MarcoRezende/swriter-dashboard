import { EntityDescriptionProps } from "../models/crud.model";
import get from "lodash.get";
import { formatDate } from "./date";

export type TableColumnProps = {
  entityId: string;
  values: string[];
};

export interface TableColumnsProps {
  tableHeader: string[];
  tableBody: TableColumnProps[];
}

export function formatTableContent(
  columns: string[],
  entityDescription: EntityDescriptionProps[],
  entities: { [key: string]: any }[]
): TableColumnsProps {
  const tableHeader = columns.map((key) => {
    const description = entityDescription.find((description) => {
      if (description?.relation) {
        return key.split(".")[0] === description.key;
      }

      return description.key === key;
    });

    return description?.subject ?? "";
  });

  const tableBody = entities.map((entity) => {
    return {
      entityId: entity.id,
      values: columns.map((key) => {
        const description = entityDescription.find((description) => {
          if (description?.relation) {
            return key.split(".")[0] === description.key;
          }

          return description.key === key;
        });

        if (description?.type === "dateTime") {
          return formatDate(get(entity, key), { relative: true });
        }

        return get(entity, key) ?? "";
      }),
    };
  });

  return { tableBody, tableHeader };
}
