import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Table,
  Space,
  Tag,
  Modal,
  message,
  Tabs,
  InputNumber,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

interface InvoiceRecord {
  id: string;
  amount: number;
  type: string;
  title: string;
  taxNumber: string;
  status: string;
  createTime: string;
  invoiceNo?: string;
}

const { Option } = Select;

const Invoice: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // 模拟数据
  const mockData: InvoiceRecord[] = [
    {
      id: '1',
      amount: 1000,
      type: '增值税普通发票',
      title: '北京科技有限公司',
      taxNumber: '91110105MA12345X',
      status: 'pending',
      createTime: '2024-03-15 14:30:00',
    },
    {
      id: '2',
      amount: 2000,
      type: '增值税专用发票',
      title: '上海贸易有限公司',
      taxNumber: '91310115MA67890Y',
      status: 'completed',
      createTime: '2024-03-14 16:20:00',
      invoiceNo: 'FP202403140001',
    },
  ];

  const columns = [
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '发票金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '发票类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '发票抬头',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '税号',
      dataIndex: 'taxNumber',
      key: 'taxNumber',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          pending: { color: 'processing', text: '处理中' },
          completed: { color: 'success', text: '已开具' },
          failed: { color: 'error', text: '失败' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      render: (text: string) => text || '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: InvoiceRecord) => (
        <Space size="middle">
          {record.status === 'completed' && (
            <Button type="link" onClick={() => handleDownload(record)}>
              下载
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // 这里添加实际的发票申请逻辑
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('发票申请已提交');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('申请失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (record: InvoiceRecord) => {
    // 这里添加实际的发票下载逻辑
    message.success('发票下载中...');
  };

  const items: TabsProps['items'] = [
    {
      key: 'records',
      label: '发票记录',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              申请发票
            </Button>
          </div>
          <Table columns={columns} dataSource={mockData} rowKey="id" />
        </>
      ),
    },
    {
      key: 'info',
      label: '发票信息管理',
      children: (
        <Card title="默认开票信息">
          <Form layout="vertical">
            <Form.Item label="发票类型" name="defaultType">
              <Select placeholder="请选择发票类型">
                <Option value="普票">增值税普通发票</Option>
                <Option value="专票">增值税专用发票</Option>
              </Select>
            </Form.Item>
            <Form.Item label="发票抬头" name="defaultTitle">
              <Input placeholder="请输入发票抬头" />
            </Form.Item>
            <Form.Item label="税号" name="defaultTaxNumber">
              <Input placeholder="请输入纳税人识别号" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">保存</Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Tabs defaultActiveKey="records" items={items} />
      </Card>

      <Modal
        title="申请发票"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="amount"
            label="发票金额"
            rules={[{ required: true, message: '请输入发票金额' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={999999}
              placeholder="请输入发票金额"
            />
          </Form.Item>
          <Form.Item
            name="type"
            label="发票类型"
            rules={[{ required: true, message: '请选择发票类型' }]}
          >
            <Select placeholder="请选择发票类型">
              <Option value="普票">增值税普通发票</Option>
              <Option value="专票">增值税专用发票</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="发票抬头"
            rules={[{ required: true, message: '请输入发票抬头' }]}
          >
            <Input placeholder="请输入发票抬头" />
          </Form.Item>
          <Form.Item
            name="taxNumber"
            label="税号"
            rules={[{ required: true, message: '请输入纳税人识别号' }]}
          >
            <Input placeholder="请输入纳税人识别号" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Invoice; 