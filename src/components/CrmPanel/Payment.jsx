import React, { useState, useEffect, useRef } from 'react';
import { Divider } from 'antd';

import { Button, PageHeader, Row, Col, Descriptions, Tag } from 'antd';
import { FileTextOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';

import { useCrmContext } from '@/context/crm';
import uniqueId from '@/utils/uinqueId';

import { selectRecordPaymentItem } from '@/redux/crm/selectors';
import { useMoney } from '@/settings';

import RecordPayment from './RecordPayment';

export default function Payment({ config }) {
  const { entity, ENTITY_NAME } = config;

  const { crmContextAction } = useCrmContext();

  const { current: currentItem } = useSelector(selectRecordPaymentItem);

  const { readPanel, recordPanel } = crmContextAction;
  const money = useMoney();

  const [itemslist, setItemsList] = useState([]);
  const [currentCrm, setCurrentCrm] = useState({
    status: '',
    client: {
      company: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  });

  useEffect(() => {
    if (currentItem) {
      const { items } = currentItem;

      setItemsList(items);
      setCurrentCrm(currentItem);
    }
  }, [currentItem]);

  useEffect(() => {
    console.info('itemslist', itemslist);
  }, [itemslist]);

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 20, push: 2 }}
        >
          <PageHeader
            onBack={() => readPanel.close()}
            title={`Record Payment for ${ENTITY_NAME} # ${currentCrm.number}/${
              currentCrm.year || ''
            }`}
            ghost={false}
            tags={<Tag color="volcano">{currentCrm.status}</Tag>}
            // subTitle="This is cuurent crm page"
            extra={[
              <Button
                key={`${uniqueId()}`}
                onClick={() => recordPanel.close()}
                icon={<CloseCircleOutlined />}
              >
                Cancel
              </Button>,
              <Button
                key={`${uniqueId()}`}
                onClick={() => readPanel.open()}
                icon={<FileTextOutlined />}
              >
                Show Invoice
              </Button>,
            ]}
            style={{
              padding: '20px 0px',
            }}
          ></PageHeader>
          <Divider dashed />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col
          className="gutter-row"
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 10, order: 2, push: 2 }}
          lg={{ span: 10, order: 2, push: 4 }}
        >
          <div className="space50"></div>
          <Descriptions title={`Client : ${currentCrm.client.company}`} column={1}>
            <Descriptions.Item label="E-mail">{currentCrm.client.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{currentCrm.client.phone}</Descriptions.Item>
            <Divider dashed />
            <Descriptions.Item label="Payment Status">{currentCrm.paymentStatus}</Descriptions.Item>
            <Descriptions.Item label="SubTotal">
              {money.amountFormatter({ amount: currentCrm.subTotal })}
            </Descriptions.Item>
            <Descriptions.Item label="Total">
              {money.amountFormatter({ amount: currentCRm.total })}
            </Descriptions.Item>
            <Descriptions.Item label="Discount">
              {money.amountFormatter({ amount: currentCrm.discount })}
            </Descriptions.Item>
            <Descriptions.Item label="Balance">
              {money.amountFormatter({ amount: currentCrm.credit })}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 12, order: 1 }}
          lg={{ span: 10, order: 1, push: 2 }}
        >
          <RecordPayment config={config} />
        </Col>
      </Row>
    </>
  );
}
