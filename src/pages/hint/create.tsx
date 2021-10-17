import { CreateForm, FieldType, FormField } from "../../components/form/Create";

const CategoryForm = () => {
  const fields: FormField[] = [
    {
      name: "tip",
      label: "Dica",
      placeholder: "frase ou palavra",
      type: FieldType.textarea,
      rules: { required: true },
    },
    {
      name: "author",
      label: "Autor",
      placeholder: "criador da obra",
      type: FieldType.text,
      rules: {},
    },
    {
      name: "category",
      label: "Categoria",
      placeholder: "selecione",
      type: FieldType.multi_select,
      rules: { required: true },
    },
  ];

  return <CreateForm endpoint="hint" fields={fields} />;
};

export default CategoryForm;
