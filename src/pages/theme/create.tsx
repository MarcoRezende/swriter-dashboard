import { EntityCrud } from "../../components/form/EntityCrud";
import { Theme } from "../../entities/Theme";
import themesModel from "../../models/themes.model";

const ThemeForm = () => {
  const formFields = ["name"];

  return (
    <EntityCrud<Theme>
      model={themesModel}
      title="tema"
      formFields={formFields}
    />
  );
};

export default ThemeForm;
