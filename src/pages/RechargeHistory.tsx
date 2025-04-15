import React, { useState } from 'react';
import { Table, Card, DatePicker, Space, Button, Tag } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface RechargeRecord {
  id: string;
  amount: number;
  paymentMethod: string;
  status: 'success' | 'failed' | 'pending';
  createTime: string;
  orderNo: string;
}

const RechargeHistory: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // 模拟数据
  const mockData: RechargeRecord[] = [
    {
      id: '1',
      amount: 1000,
      paymentMethod: '支付宝',
      status: 'success',
      createTime: '2024-03-15 14:30:00',
      orderNo: 'CZ202403150001',
    },
    {
      id: '2',
      amount: 2000,
      paymentMethod: '微信支付',
      status: 'success',
      createTime: '2024-03-14 16:20:00',
      orderNo: 'CZ202403140002',
    },
    {
      id: '3',
      amount: 500,
      paymentMethod: '银行卡',
      status: 'pending',
      createTime: '2024-03-14 10:15:00',
      orderNo: 'CZ202403140003',
    },
  ];

  const columns: TableProps<RechargeRecord>['columns'] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      filters: [
        { text: '支付宝', value: '支付宝' },
        { text: '微信支付', value: '微信支付' },
        { text: '银行卡', value: '银行卡' },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          success: { color: 'success', text: '成功' },
          failed: { color: 'error', text: '失败' },
          pending: { color: 'processing', text: '处理中' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
      filters: [
        { text: '成功', value: 'success' },
        { text: '失败', value: 'failed' },
        { text: '处理中', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '充值时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => dayjs(a.createTime).unix() - dayjs(b.createTime).unix(),
    },
  ];

  const handleSearch = () => {
    setLoading(true);
    // 这里添加实际的搜索逻辑
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Card title="充值记录">
      <Space style={{ marginBottom: 16 }}>
        <RangePicker />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          搜索
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        loading={loading}
        pagination={{
          total: mockData.length,
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条记录`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </Card>
  );
};

export default RechargeHistory; 