import { Table } from '../../components/common/Table';
import themesModel from '../../models/themes.model';

import type { NextPage } from 'next';
import { PageWrapper } from '../../components/base/PageWrapper';
const Theme: NextPage = () => {
  const columns = ['name', 'createdDate', 'updatedDate'];

  return (
    <PageWrapper tabTitle="Temas">
      <Table model={themesModel} title="Temas" columns={columns} />
    </PageWrapper>
  );
};

export default Theme;
