import React from "react";
import { Layout } from "antd";
import HeaderContent from './Header';

function App() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderContent />
            </Layout>
        </Layout>
    );
}

export default App;