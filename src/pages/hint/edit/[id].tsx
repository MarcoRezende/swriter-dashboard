import { memo } from "react";
import { EntityCrud } from "../../../components/form/EntityCrud";
import { Hint } from "../../../entities/Hint";
import hintsModel from "../../../models/hints.model";

const EditField = () => {
  const formFields = ["tip", "book", "author", "categories"];

  return (
    <EntityCrud<Hint>
      model={hintsModel}
      mode="edit"
      title="sentença"
      idName="id"
      formFields={formFields}
    />
  );
};

export default memo(EditField);
