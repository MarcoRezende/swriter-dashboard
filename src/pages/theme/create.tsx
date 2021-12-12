import { EntityCrud } from "../../components/form/EntityCrud";
import { FieldType, FormField } from "../../components/form/EntityField";
import { Theme } from "../../entities/Theme";
import themesModel from "../../models/themes.model";

const ThemeForm = () => {
  const fields: FormField[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "nome do tema",
      type: FieldType.TEXT,
      rules: { required: true },
    },
  ];

  return (
    <EntityCrud<Theme>
      model={themesModel}
      title="tema"
      endpoint="theme"
      fields={fields}
    />
  );
};

export default ThemeForm;
