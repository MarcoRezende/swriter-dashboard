import { memo } from "react";
import { EntityCrud } from "../../../components/form/EntityCrud";
import { Category } from "../../../entities/Category";
import categoriesModel from "../../../models/categories.model";

const EditField = () => {
  const formFields = ["name", "theme"];

  return (
    <EntityCrud<Category>
      model={categoriesModel}
      mode="edit"
      title="categoria"
      idName="id"
      formFields={formFields}
    />
  );
};

export default memo(EditField);
