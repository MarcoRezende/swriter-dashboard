import { EntityCrud } from '../../components/form/EntityCrud';
import { Hint } from '../../entities/Hint';
import hintsModel from '../../models/hints.model';

const HintForm = () => {
  const formFields = ['tip', 'book', 'author', 'categories'];

  return (
    <EntityCrud<Hint>
      model={hintsModel}
      title="sentença"
      formFields={formFields}
    />
  );
};

export default HintForm;
