import React from 'react';

import CrmContextLayout from '../CrmContextLayout';

import { Layout } from 'antd';

const { Content } = Layout;

export default function CrmLayout({ children, config }) {
  return (
    <CrmContextLayout>
      <Layout className="site-layout">
        <Content
          className="whiteBox shadow"
          style={{
            padding: '50px 40px',
            margin: '100px auto',
            width: '100%',
            maxWidth: '1100px',
          }}
        >
          {children}
        </Content>
      </Layout>
    </CrmContextLayout>
  );
}
