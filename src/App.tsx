import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  HistoryOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import Home from './pages/Home';
import AdManagement from './pages/AdManagement';
import Recharge from './pages/Recharge';
import RechargeHistory from './pages/RechargeHistory';
import Invoice from './pages/Invoice';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();

  const handleMenuClick = (info: { key: string }) => {
    switch (info.key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/ads');
        break;
      case '3':
        navigate('/recharge');
        break;
      case '4':
        navigate('/history');
        break;
      case '5':
        navigate('/invoice');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <h1 style={{ color: 'white' }}>广告投放平台</h1>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            onClick={handleMenuClick}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              平台首页
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
              购买广告
            </Menu.Item>
            <Menu.Item key="3" icon={<DollarOutlined />}>
              账户充值
            </Menu.Item>
            <Menu.Item key="4" icon={<HistoryOutlined />}>
              充值记录
            </Menu.Item>
            <Menu.Item key="5" icon={<FileTextOutlined />}>
              发票管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ads" element={<AdManagement />} />
              <Route path="/recharge" element={<Recharge />} />
              <Route path="/history" element={<RechargeHistory />} />
              <Route path="/invoice" element={<Invoice />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        广告投放平台 ©2024 Created by Your Company
      </Footer>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
