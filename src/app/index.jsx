import React from "react";
import { Layout } from "antd";
import HeaderContent from './Header';
import Navigation from './Navigation'

function App() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navigation />
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderContent />
            </Layout>
        </Layout>
    );
}

export default App;