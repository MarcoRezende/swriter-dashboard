import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

import { optionsFormatter } from "../../../components/form/BaseSelect";
import {
  CreateForm,
  FieldType,
  FormField,
} from "../../../components/form/EntityCrud";
import { Hint } from "../../../entities/Hint";
import { Theme } from "../../../entities/Theme";
import hintsModel from "../../../models/hints.model";
import { categoryResource } from "../../../services/category";
import { getManyBase } from "../../../services/common";
import { hintResource } from "../../../services/hint";

const EditField = () => {
  const [categories, setCategories] = useState<Theme[]>([]);
  const router = useRouter();
  const hintId = router.query.id as string | undefined;

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      try {
        const fetchedCategories = await getManyBase<Theme>({
          resource: categoryResource,
        });

        if (cancel) return;

        setCategories(fetchedCategories);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [hintId]);

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
      selectOptionKey: "name",
    },
  ];

  return (
    <CreateForm<Hint>
      model={hintsModel}
      mode="edit"
      title="sentença"
      endpoint={hintResource}
      fields={fields}
      idName="id"
    />
  );
};

export default memo(EditField);
