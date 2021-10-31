import { useEffect, useState } from "react";

import { CreateForm, FieldType, FormField } from "../../components/form/Create";
import { optionsFormatter } from "../../components/form/Select";
import { Category } from "../../models/Category";
import { categoryResource } from "../../services/category";
import { getManyBase } from "../../services/common";

const HintForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategory = await getManyBase<Category>({
        resource: categoryResource,
      });

      setCategories(fetchedCategory);
    };

    fetchData();
  }, []);

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
      name: "categories",
      label: "Categorias",
      placeholder: "selecione",
      type: FieldType.MULTI_SELECT,
      selectOptions: optionsFormatter(categories, "name"),
      rules: { required: true },
    },
  ];

  return <CreateForm title="sentença" endpoint="hint" fields={fields} />;
};

export default HintForm;
