import { useRouter } from "next/router";
import { useEffect, useState, memo } from "react";

import {
  CreateForm,
  FieldType,
  FormField,
} from "../../../components/form/Create";
import { optionsFormatter } from "../../../components/form/BaseSelect";
import { Theme } from "../../../models/Theme";
import { categoryResource } from "../../../services/category";
import { getManyBase } from "../../../services/common";
import { themeResource } from "../../../services/theme";

const EditField = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const router = useRouter();
  const categoryId = router.query.id as string | undefined;

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      try {
        const fetchedThemes = await getManyBase<Theme>({
          resource: themeResource,
        });

        if (cancel) return;

        setThemes(fetchedThemes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [categoryId]);

  const fields: FormField[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "nome da categoria",
      type: FieldType.TEXT,
      rules: { required: true },
    },
    {
      name: "theme",
      label: "Tema",
      placeholder: "tema",
      type: FieldType.SELECT,
      selectOptions: optionsFormatter(themes, "name"),
      rules: { required: true },
      selectOptionKey: "name",
    },
  ];

  return (
    <CreateForm
      mode="edit"
      title="categoria"
      endpoint={categoryResource}
      fields={fields}
      idName="id"
    />
  );
};

export default memo(EditField);
