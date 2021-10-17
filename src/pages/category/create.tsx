import { useEffect, useState } from "react";
import { CreateForm, FieldType, FormField } from "../../components/form/Create";
import { SelectOption } from "../../components/form/Select";
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

  const themeOptions: SelectOption[] = themes.map((theme) => ({
    label: theme.name,
    value: theme.name,
  }));

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
      type: FieldType.MULTI_SELECT,
      selectOptions: themeOptions,
      rules: { required: true },
    },
  ];

  return <CreateForm title="categoria" endpoint="category" fields={fields} />;
};

export default CategoryForm;
