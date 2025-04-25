import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, FileTextOutlined, HistoryOutlined } from '@ant-design/icons';
//首页
const Home: React.FC = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="广告余额"
              value={1128}
              prefix={<DollarOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在投广告"
              value={11}
              prefix={<ShoppingCartOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本月消耗"
              value={93}
              prefix={<DollarOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待开发票"
              value={2}
              prefix={<FileTextOutlined />}
              suffix="张"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 
