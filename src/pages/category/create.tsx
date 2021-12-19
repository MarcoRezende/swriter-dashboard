import { EntityCrud } from "../../components/form/EntityCrud";
import { Category } from "../../entities/Category";
import categoriesModel from "../../models/categories.model";

const CategoryForm = () => {
  const formFields = ["name", "theme"];

  return (
    <EntityCrud<Category>
      model={categoriesModel}
      title="categoria"
      formFields={formFields}
    />
  );
};

export default CategoryForm;
