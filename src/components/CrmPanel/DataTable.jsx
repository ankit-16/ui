import React, { useCallback, useEffect } from 'react';
import { Dropdown, Table } from 'antd';
import { Button, PageHeader } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { crm } from '@/redux/crm/actions';
import { settings } from '@/redux/settings/actions';
import { selectListItems } from '@/redux/crm/selectors';
import { useCrmContext } from '@/context/crm';
import uniqueId from '@/utils/uinqueId';

import { RedoOutlined, PlusOutlined } from '@ant-design/icons';
function AddNewItem({ config }) {
  const { ADD_NEW_ENTITY } = config;
  const { crmContextAction } = useCrmContext();
  const { createPanel } = crmContextAction;
  const handelClick = () => {
    createPanel.open();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, DataTableDropMenu }) {
  let { entity, dataTableColumns } = config;
  const { DATATABLE_TITLE } = config;
  dataTableColumns = [
    ...dataTableColumns,
    {
      title: '',
      render: (row) => (
        <Dropdown overlay={DataTableDropMenu({ row, entity })} trigger={['click']}>
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    const options = { page: pagination.current || 1 };
    dispatch(crm.list({ entity, options }));
  }, []);
  useEffect(() => {
    dispatch(crm.list({ entity }));
  }, []);

  return (
    <>
      <PageHeader
        title={DATATABLE_TITLE}
        ghost={true}
        extra={[
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<RedoOutlined />}>
            Refresh
          </Button>,
          <AddNewItem config={config} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handelDataTableLoad}
      />
    </>
  );
}
