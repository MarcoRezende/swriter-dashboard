import { useEffect, useState } from "react";

import {
  CreateForm,
  FieldType,
  FormField,
} from "../../../components/form/Create";
import { optionsFormatter } from "../../../components/form/Select";
import { Theme } from "../../../models/Theme";
import { getManyBase } from "../../../services/common";
import { themeResource } from "../../../services/theme";

const EditField = () => {
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
    <CreateForm
      mode="edit"
      title="categoria"
      endpoint="category"
      fields={fields}
      idName="categoryId"
    />
  );
};

export default EditField;
