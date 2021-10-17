import { useEffect, useState } from "react";
import { CreateForm, FieldType, FormField } from "../../components/form/Create";
import { MultiSelectOption } from "../../components/form/MultiSelect";
import { Theme } from "../../models/Theme";
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

  const themeOptions: MultiSelectOption[] = themes.map((theme) => ({
    label: theme.name,
    value: theme.name,
  }));

  const fields: FormField[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "nome da categoria",
      type: FieldType.text,
      rules: { required: true },
    },
    {
      name: "theme",
      label: "Tema",
      placeholder: "tema",
      type: FieldType.multi_select,
      selectOptions: themeOptions,
      rules: { required: true },
    },
  ];

  return <CreateForm endpoint="category" fields={fields} />;
};

export default CategoryForm;
