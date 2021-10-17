import { CreateForm, FieldType, FormField } from "../../components/form/Create";

const ThemeForm = () => {
  const fields: FormField[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "nome do tema",
      type: FieldType.text,
      rules: { required: true },
    },
  ];

  return <CreateForm endpoint="theme" fields={fields} />;
};

export default ThemeForm;
