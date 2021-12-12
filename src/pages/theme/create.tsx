import {
  CreateForm,
  FieldType,
  FormField,
} from "../../components/form/EntityCrud";
import themesModel from "../../models/themes.model";
import { Theme } from "../../entities/Theme";

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
    <CreateForm<Theme>
      model={themesModel}
      title="tema"
      endpoint="theme"
      fields={fields}
    />
  );
};

export default ThemeForm;
