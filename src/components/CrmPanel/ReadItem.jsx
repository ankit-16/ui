import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, PageHeader, Row, Col, Descriptions, Statistic, Tag } from 'antd';
import { EditOutlined, FilePdfOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { crm } from '@/redux/crm/actions';

import { useCrmContext } from '@/context/crm';
import uniqueId from '@/utils/uinqueId';

import { selectCurrentItem } from '@/redux/crm/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney } from '@/settings';

const Item = ({ item }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {moneyFormatter({ amount: item.price })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {moneyFormatter({ amount: item.total })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadItem({ config }) {
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const { crmContextAction } = useCrmContext();
  const { moneyFormatter } = useMoney();

  const { result: currentResult } = useSelector(selectCurrentItem);

  const { readPanel, updatePanel } = crmContextAction;

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
    if (currentResult) {
      const { items } = currentResult;

      setItemsList(items);
      setCurrentCrm(currentResult);
    }
  }, [currentResult]);

  useEffect(() => {
    console.info('itemslist', itemslist);
  }, [itemslist]);

  return (
    <>
      <PageHeader
        onBack={() => readPanel.close()}
        title={`${ENTITY_NAME} # ${currentCrm.number}/${currentCrm.year || ''}`}
        ghost={false}
        tags={<Tag color="volcano">{currentCrm.paymentStatus || currentCrm.status}</Tag>}
        // subTitle="This is cuurent crm page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => readPanel.close()}
            icon={<CloseCircleOutlined />}
          >
            Close
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentCrm._id}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            Download PDF
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                crm.currentAction({
                  actionType: 'update',
                  data: currentCrm,
                })
              );
              updatePanel.open();
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            Edit Crm
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
        <Row>
          <Statistic title="Status" value={currentCrm.status} />
          <Statistic
            title="SubTotal"
            value={moneyFormatter({ amount: currentCrm.subTotal })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title="Total"
            value={moneyFormatter({ amount: currentCrm.total })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title="Balance"
            value={moneyFormatter({ amount: currentCrm.credit })}
            style={{
              margin: '0 32px',
            }}
          />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`Client : ${currentCrm.client.company}`}>
        <Descriptions.Item label="Address">{currentCrm.client.address}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{currentCrm.client.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{currentCrm.client.phone}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>ITEM</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>PRICE</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>QUANTITY</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>TOTAL</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {itemslist.map((item) => (
        <Item key={item._id} item={item}></Item>
      ))}
      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>Sub Total :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentCrm.subTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>Tax Total ({currentCrm.taxRate * 100} %) :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentCrm.taxTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>Total :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentCrm.total })}</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
