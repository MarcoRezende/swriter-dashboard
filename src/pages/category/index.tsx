import { Table } from '../../components/common/Table';
import categoriesModel from '../../models/categories.model';

import type { NextPage } from 'next';
import { PageWrapper } from '../../components/base/PageWrapper';

const Category: NextPage = () => {
  const columns = ['name', 'theme.name', 'createdDate', 'updatedDate'];

  return (
    <PageWrapper tabTitle="Categorias">
      <Table model={categoriesModel} title="Categorias" columns={columns} />
    </PageWrapper>
  );
};

export default Category;
