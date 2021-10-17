import { CreateForm, FieldType, FormField } from "../../components/form/Create";

const CategoryForm = () => {
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
      rules: { required: true },
    },
  ];

  return <CreateForm endpoint="category" fields={fields} />;
};

export default CategoryForm;
