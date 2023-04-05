import React, { useState, useEffect } from 'react';
import { Form, Divider, Button } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { crm } from '@/redux/crm/actions';
import { selectRecordPaymentItem } from '@/redux/crm/selectors';

import { useCrmContext } from '@/context/crm';

import Loading from '@/components/Loading';

import PaymentInvoiceForm from '@/forms/PaymentInvoiceForm';

export default function RecordPayment({ config }) {
  let { entity, CREATE_ENTITY } = config;
  const { crmContextAction } = useCrmContext();
  const { recordPanel } = crmContextAction;
  const dispatch = useDispatch();

  const { isLoading, isSuccess, current: currentInvoice } = useSelector(selectRecordPaymentItem);

  const [form] = Form.useForm();

  const [maxAmount, setMaxAmount] = useState(0);

  useEffect(() => {
    if (currentInvoice) {
      const { credit, total, discount } = currentInvoice;
      setMaxAmount(total - discount - credit);
    }
  }, [currentInvoice]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(crm.resetAction({ actionType: 'recordPayment' }));
      recordPanel.close();
      dispatch(crm.list({ entity }));
    }
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    if (currentInvoice) {
      const { _id: invoice } = currentInvoice;
      const client = currentInvoice.client && currentInvoice.client._id;
      fieldsValue = {
        ...fieldsValue,
        invoice,
        client,
      };
    }

    dispatch(
      crm.recordPayment({
        entity: 'paymentInvoice',
        jsonData: fieldsValue,
      })
    );
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <PaymentInvoiceForm maxAmount={maxAmount} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Record Payment
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </>
  );
}
