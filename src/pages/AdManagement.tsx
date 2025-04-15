import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Upload,
  InputNumber,
  Space,
  Table,
  Tag,
  Modal,
  message,
  Tabs,
  Timeline,
  Tooltip,
} from 'antd';
import type { TabsProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import {
  UploadOutlined,
  PlusOutlined,
  GlobalOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Option } = Select;
const { TextArea } = Input;

interface AdCampaign {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'paused';
  budget: number;
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  reviewInfo?: {
    status: 'pending' | 'approved' | 'rejected';
    comment?: string;
    reviewedAt?: string;
    reviewer?: string;
  };
  rejectReason?: string;
}

const AdManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAd, setSelectedAd] = useState<AdCampaign | null>(null);
  const [isReviewHistoryVisible, setIsReviewHistoryVisible] = useState(false);

  // 广告类型选项
  const adTypes = [
    { label: '横幅广告', value: 'banner', price: 50 },
    { label: '信息流广告', value: 'feed', price: 80 },
    { label: '开屏广告', value: 'splash', price: 200 },
    { label: '视频广告', value: 'video', price: 150 },
  ];

  // 模拟数据
  const mockData: AdCampaign[] = [
    {
      id: '1',
      name: '新品推广活动',
      type: '横幅广告',
      status: 'approved',
      budget: 5000,
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      impressions: 10000,
      clicks: 500,
      reviewInfo: {
        status: 'approved',
        comment: '广告内容符合规范',
        reviewedAt: '2024-03-14 15:30:00',
        reviewer: '审核员A',
      },
    },
    {
      id: '2',
      name: '品牌推广',
      type: '视频广告',
      status: 'pending',
      budget: 10000,
      startDate: '2024-03-20',
      endDate: '2024-04-20',
      impressions: 0,
      clicks: 0,
      reviewInfo: {
        status: 'pending',
      },
    },
    {
      id: '3',
      name: '促销活动',
      type: '信息流广告',
      status: 'rejected',
      budget: 3000,
      startDate: '2024-03-18',
      endDate: '2024-04-18',
      impressions: 0,
      clicks: 0,
      reviewInfo: {
        status: 'rejected',
        comment: '广告内容不符合规范，请修改后重新提交',
        reviewedAt: '2024-03-17 14:20:00',
        reviewer: '审核员B',
      },
      rejectReason: '广告文案存在夸大宣传',
    },
  ];

  const columns: ColumnType<AdCampaign>[] = [
    {
      title: '广告名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '广告类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '审核状态',
      dataIndex: 'reviewInfo',
      key: 'reviewStatus',
      render: (reviewInfo: AdCampaign['reviewInfo']) => {
        const statusConfig = {
          pending: { color: 'processing', text: '审核中' },
          approved: { color: 'success', text: '审核通过' },
          rejected: { color: 'error', text: '审核拒绝' },
        };
        const status = reviewInfo?.status || 'pending';
        const config = statusConfig[status];
        return (
          <Space>
            <Tag color={config.color}>{config.text}</Tag>
            {status === 'rejected' && (
              <Tooltip title="点击查看拒绝原因">
                <ExclamationCircleOutlined
                  style={{ color: '#ff4d4f', cursor: 'pointer' }}
                  onClick={() => handleViewRejectReason(reviewInfo)}
                />
              </Tooltip>
            )}
          </Space>
        );
      },
    },
    {
      title: '投放状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          active: { color: 'success', text: '投放中' },
          paused: { color: 'warning', text: '已暂停' },
          pending: { color: 'processing', text: '待投放' },
          rejected: { color: 'error', text: '已拒绝' },
          approved: { color: 'success', text: '待投放' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget: number) => `¥${budget.toLocaleString()}`,
    },
    {
      title: '展示/点击',
      key: 'stats',
      render: (_: unknown, record: AdCampaign) => (
        <span>
          {record.impressions.toLocaleString()} / {record.clicks.toLocaleString()}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AdCampaign) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => handleViewReviewHistory(record)}
            icon={<InfoCircleOutlined />}
          >
            审核记录
          </Button>
          {record.status === 'approved' && (
            <Button type="primary" size="small" onClick={() => handleStartAd(record)}>
              开始投放
            </Button>
          )}
          {record.status === 'active' && (
            <Button type="primary" danger size="small" onClick={() => handlePause(record)}>
              暂停投放
            </Button>
          )}
          {record.status === 'rejected' && (
            <Button type="primary" size="small" onClick={() => handleResubmit(record)}>
              重新提交
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // 这里添加实际的广告创建逻辑
      console.log('Form values:', values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('广告提交成功，请等待审核');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleViewRejectReason = (reviewInfo: AdCampaign['reviewInfo']) => {
    Modal.info({
      title: '审核拒绝原因',
      content: (
        <div>
          <p>审核时间：{reviewInfo?.reviewedAt}</p>
          <p>审核人员：{reviewInfo?.reviewer}</p>
          <p>拒绝原因：{reviewInfo?.comment}</p>
        </div>
      ),
    });
  };

  const handleViewReviewHistory = (record: AdCampaign) => {
    setSelectedAd(record);
    setIsReviewHistoryVisible(true);
  };

  const handleStartAd = (record: AdCampaign) => {
    Modal.confirm({
      title: '确认开始投放',
      content: '确定要开始投放该广告吗？投放后将立即产生费用。',
      onOk: () => {
        message.success('广告已开始投放');
      },
    });
  };

  const handlePause = (record: AdCampaign) => {
    Modal.confirm({
      title: '确认暂停投放',
      content: '暂停后广告将停止投放，但您可以随时重新启动',
      onOk: () => {
        message.success('广告已暂停');
      },
    });
  };

  const handleResubmit = (record: AdCampaign) => {
    Modal.confirm({
      title: '重新提交审核',
      content: '重新提交后需要重新进行审核，是否继续？',
      onOk: () => {
        message.success('广告已重新提交审核');
      },
    });
  };

  const items: TabsProps['items'] = [
    {
      key: 'buy',
      label: '购买广告',
      children: (
        <Card title="新建广告">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="广告名称"
              rules={[{ required: true, message: '请输入广告名称' }]}
            >
              <Input placeholder="请输入广告名称" />
            </Form.Item>

            <Form.Item
              name="type"
              label="广告类型"
              rules={[{ required: true, message: '请选择广告类型' }]}
            >
              <Select placeholder="请选择广告类型">
                {adTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label} (¥{type.price}/天)
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="budget"
              label="预算"
              rules={[{ required: true, message: '请输入预算金额' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={100}
                placeholder="请输入预算金额"
                prefix="¥"
                precision={2}
                step={100}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>

            <Form.Item
              name="targetUrl"
              label="目标链接"
              rules={[
                { required: true, message: '请输入目标链接' },
                { type: 'url', message: '请输入有效的URL' },
              ]}
            >
              <Input placeholder="请输入广告点击后跳转的链接" />
            </Form.Item>

            <Form.Item
              name="description"
              label="广告描述"
              rules={[{ required: true, message: '请输入广告描述' }]}
            >
              <TextArea rows={4} placeholder="请输入广告描述" />
            </Form.Item>

            <Form.Item
              name="materials"
              label="广告素材"
              rules={[{ required: true, message: '请上传广告素材' }]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                onPreview={async file => {
                  setPreviewImage(file.url || (file.preview as string));
                  setPreviewOpen(true);
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                提交广告
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'list',
      label: '我的广告',
      children: (
        <Card>
          <Table columns={columns} dataSource={mockData} rowKey="id" />
        </Card>
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="buy" items={items} />
      
      <Modal
        open={previewOpen}
        title="预览"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="预览" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Modal
        title="审核记录"
        open={isReviewHistoryVisible}
        footer={null}
        onCancel={() => setIsReviewHistoryVisible(false)}
      >
        {selectedAd && (
          <Timeline>
            <Timeline.Item>
              提交审核
              <p>时间：{selectedAd.startDate}</p>
            </Timeline.Item>
            {selectedAd.reviewInfo && (
              <Timeline.Item
                color={
                  selectedAd.reviewInfo.status === 'approved'
                    ? 'green'
                    : selectedAd.reviewInfo.status === 'rejected'
                    ? 'red'
                    : 'blue'
                }
              >
                {selectedAd.reviewInfo.status === 'approved'
                  ? '审核通过'
                  : selectedAd.reviewInfo.status === 'rejected'
                  ? '审核拒绝'
                  : '审核中'}
                {selectedAd.reviewInfo.reviewedAt && (
                  <p>时间：{selectedAd.reviewInfo.reviewedAt}</p>
                )}
                {selectedAd.reviewInfo.reviewer && (
                  <p>审核人：{selectedAd.reviewInfo.reviewer}</p>
                )}
                {selectedAd.reviewInfo.comment && (
                  <p>审核意见：{selectedAd.reviewInfo.comment}</p>
                )}
              </Timeline.Item>
            )}
          </Timeline>
        )}
      </Modal>
    </>
  );
};

export default AdManagement; 