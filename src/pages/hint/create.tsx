import { CreateForm, FieldType, FormField } from "../../components/form/Create";

const HintForm = () => {
  const fields: FormField[] = [
    {
      name: "tip",
      label: "Dica",
      placeholder: "frase ou palavra",
      type: FieldType.TEXTAREA,
      rules: { required: true },
    },
    {
      name: "book",
      label: "Livro",
      placeholder: "obra",
      type: FieldType.TEXT,
      rules: {},
    },
    {
      name: "author",
      label: "Autor",
      placeholder: "criador da obra",
      type: FieldType.TEXT,
      rules: {},
    },
    {
      name: "category",
      label: "Categoria",
      placeholder: "selecione",
      type: FieldType.MULTI_SELECT,
      rules: { required: true },
    },
  ];

  return <CreateForm title="sentença" endpoint="hint" fields={fields} />;
};

export default HintForm;
