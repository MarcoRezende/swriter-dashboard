import { CreateForm, FieldType, FormField } from "../../components/form/Create";

const CategoryForm = () => {
  const fields: FormField[] = [
    {
      name: "hint",
      label: "Dica",
      placeholder: "frase ou palavra",
      type: FieldType.textarea,
      rules: {},
    },
    {
      name: "category",
      label: "Categoria",
      placeholder: "selecione",
      type: FieldType.text,
      rules: {},
    },
  ];

  return <CreateForm fields={fields} />;
};

export default CategoryForm;
