import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';

import { Button, PageHeader, Row, Statistic, Tag } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { crm } from '@/redux/crm/actions';
import { selectCreatedItem } from '@/redux/crm/selectors';

import { useCrmContext } from '@/context/crm';
import uniqueId from '@/utils/uinqueId';

import Loading from '@/components/Loading';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

function SaveForm({ form, config }) {
  let { CREATE_ENTITY } = config;
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {CREATE_ENTITY}
    </Button>
  );
}

export default function CreateItem({ config, CreateForm }) {
  let { entity, CREATE_ENTITY } = config;
  const { crmContextAction } = useCrmContext();
  const { createPanel } = crmContextAction;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const handelValuesChange = (changedValues, values) => {
    const items = values['items'];
    let subTotal = 0;

    if (items) {
      items.map((item) => {
        if (item) {
          if (item.quantity && item.price) {
            let total = item['quantity'] * item['price'];
            //sub total
            subTotal += total;
          }
        }
      });
      setSubTotal(subTotal);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(crm.resetAction({ actionType: 'create' }));
      setSubTotal(0);
      createPanel.close();
      dispatch(crm.list({ entity }));
    }
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    if (fieldsValue) {
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items];
        newList.map((item) => {
          item.total = item.quantity * item.price;
        });
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        };
      }
    }
    dispatch(crm.create({ entity, jsonData: fieldsValue }));
  };

  return (
    <>
      <PageHeader
        onBack={() => createPanel.close()}
        title={CREATE_ENTITY}
        ghost={false}
        tags={<Tag color="volcano">Draft</Tag>}
        // subTitle="This is create page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => createPanel.close()}
            icon={<CloseCircleOutlined />}
          >
            Cancel
          </Button>,
          <SaveForm form={form} config={config} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handelValuesChange}>
          <CreateForm subTotal={subTotal} />
        </Form>
      </Loading>
    </>
  );
}
