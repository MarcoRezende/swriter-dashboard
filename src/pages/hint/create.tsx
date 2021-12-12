import { useEffect, useState } from "react";

import {
  EntityCrud,
  FieldType,
  FormField,
} from "../../components/form/EntityCrud";
import { optionsFormatter } from "../../components/form/fields/BaseSelect";
import { Category } from "../../entities/Category";
import { Hint } from "../../entities/Hint";
import { categoryResource } from "../../services/category";
import { getManyBase } from "../../services/common";
import hintsModel from "../../models/hints.model";

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

  return (
    <EntityCrud<Hint>
      model={hintsModel}
      title="sentença"
      endpoint="hint"
      fields={fields}
    />
  );
};

export default HintForm;
