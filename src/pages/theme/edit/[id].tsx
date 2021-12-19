import { memo } from 'react';

import { EntityCrud } from '../../../components/form/EntityCrud';
import { Theme } from '../../../entities/Theme';
import themesModel from '../../../models/themes.model';

const EditField = () => {
  const formFields = ['name'];

  return (
    <EntityCrud<Theme>
      model={themesModel}
      mode="edit"
      title="tema"
      formFields={formFields}
      idName="id"
    />
  );
};

export default memo(EditField);
