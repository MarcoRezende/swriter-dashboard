import { Table } from '../../components/common/Table';
import hintsModel from '../../models/hints.model';
import { hintResource } from '../../services/hint';

import type { NextPage } from 'next';
import { PageWrapper } from '../../components/base/PageWrapper';

const Hint: NextPage = () => {
  const columns = [
    'author',
    'book',
    'tip',
    'timesDrawn',
    'createdDate',
    'updatedDate',
  ];

  return (
    <PageWrapper tabTitle="Sentenças">
      <Table model={hintsModel} title="Sentenças" columns={columns} />
    </PageWrapper>
  );
};

export default Hint;
