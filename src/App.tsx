import React, { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import Register from './pages/Register';  // 导入 Register 页面
import 'antd/dist/reset.css';
import './App.css';
import { UserAddOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = React.memo(() => {
    const navigate = useNavigate();

    const handleMenuClick = useCallback(
        (info: { key: string }) => {
            const routes: Record<string, string> = {
                '1': '/',
                '2': '/ads',
                '3': '/recharge',
                '4': '/history',
                '5': '/invoice',
                '6': '/register', // 注册页面
            };
            navigate(routes[info.key] || '/');
        },
        [navigate]
    );

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <h1 className="header-title">广告投放平台</h1>
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
                        <Menu.Item key="6" icon={<UserAddOutlined />}>
                            用户注册
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
                            <Route path="/register" element={<Register />} /> {/* 添加注册路由 */}
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                广告投放平台 ©2024 Created by Your Company
            </Footer>
        </Layout>
    );
});

const App = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
};

export default App;
