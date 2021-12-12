import { useEffect, useState } from "react";

import { optionsFormatter } from "../../components/form/BaseSelect";
import {
  CreateForm,
  FieldType,
  FormField,
} from "../../components/form/EntityCrud";
import { Category } from "../../entities/Category";
import { Theme } from "../../entities/Theme";
import categoriesModel from "../../models/categories.model";
import { getManyBase } from "../../services/common";
import { themeResource } from "../../services/theme";

const CategoryForm = () => {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedThemes = await getManyBase<Theme>({
        resource: themeResource,
      });

      setThemes(fetchedThemes);
    };

    fetchData();
  }, []);

  const fields: FormField[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "nome da categoria",
      type: FieldType.TEXT,
      rules: { required: true },
    },
    {
      name: "theme",
      label: "Tema",
      placeholder: "tema",
      type: FieldType.SELECT,
      selectOptions: optionsFormatter(themes, "name"),
      rules: { required: true },
    },
  ];

  return (
    <CreateForm<Category>
      model={categoriesModel}
      title="categoria"
      endpoint="category"
      fields={fields}
    />
  );
};

export default CategoryForm;
