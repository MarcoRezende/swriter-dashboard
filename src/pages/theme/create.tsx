import { CreateForm, FieldType, FormField } from "../../components/form/Create";

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

  return <CreateForm title="tema" endpoint="theme" fields={fields} />;
};

export default ThemeForm;
