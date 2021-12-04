import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

import {
  CreateForm,
  FieldType,
  FormField,
} from "../../../components/form/Create";
import { optionsFormatter } from "../../../components/form/BaseSelect";
import { Theme } from "../../../models/Theme";
import { categoryResource } from "../../../services/category";
import { hintResource } from "../../../services/hint";
import { getManyBase } from "../../../services/common";

const EditField = () => {
  const [categories, setCategories] = useState<Theme[]>([]);
  const router = useRouter();
  const hintId = router.query.hintId as string | undefined;

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
    <CreateForm
      mode="edit"
      title="sentença"
      endpoint={hintResource}
      fields={fields}
      idName="hintId"
    />
  );
};

export default memo(EditField);
