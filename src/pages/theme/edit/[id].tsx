import { memo } from "react";

import {
  CreateForm,
  FieldType,
  FormField,
} from "../../../components/form/EntityCrud";
import { Theme } from "../../../entities/Theme";
import themesModel from "../../../models/themes.model";
import { themeResource } from "../../../services/theme";

const EditField = () => {
  const fields: FormField[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "nome do tema",
      type: FieldType.TEXT,
      rules: { required: true },
    },
  ];

  return (
    <CreateForm<Theme>
      model={themesModel}
      mode="edit"
      title="tema"
      endpoint={themeResource}
      fields={fields}
      idName="id"
    />
  );
};

export default memo(EditField);
