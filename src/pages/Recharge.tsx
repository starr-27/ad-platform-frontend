import React, { useState } from 'react';
import { Card, Radio, Button, Modal, Space, InputNumber, message } from 'antd';
import { WalletOutlined, CreditCardOutlined, AlipayOutlined, WechatOutlined } from '@ant-design/icons';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const Recharge: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  const paymentMethods: PaymentMethod[] = [
    { id: 'alipay', name: '支付宝', icon: <AlipayOutlined /> },
    { id: 'wechat', name: '微信支付', icon: <WechatOutlined /> },
    { id: 'card', name: '银行卡', icon: <CreditCardOutlined /> }
  ];

  const handleAmountSelect = (value: number) => {
    setAmount(value);
  };

  const handleCustomAmount = (value: number | null) => {
    if (value) {
      setAmount(value);
    }
  };

  const handlePaymentSelect = (e: any) => {
    setSelectedPayment(e.target.value);
  };

  const handleRecharge = () => {
    if (!amount) {
      message.error('请选择或输入充值金额');
      return;
    }
    if (!selectedPayment) {
      message.error('请选择支付方式');
      return;
    }
    setIsModalVisible(true);
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      // 这里添加实际的支付处理逻辑
      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟支付过程
      message.success('充值成功！');
      setIsModalVisible(false);
      setAmount(0);
      setSelectedPayment('');
    } catch (error) {
      message.error('充值失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <Card title="账户充值" extra={<WalletOutlined />}>
        <div style={{ marginBottom: 24 }}>
          <h3>选择充值金额</h3>
          <Space wrap>
            {presetAmounts.map(preset => (
              <Button
                key={preset}
                type={amount === preset ? 'primary' : 'default'}
                onClick={() => handleAmountSelect(preset)}
              >
                {preset}元
              </Button>
            ))}
          </Space>
          <div style={{ marginTop: 16 }}>
            <InputNumber
              addonBefore="自定义金额"
              style={{ width: 200 }}
              min={1}
              max={100000}
              value={amount}
              onChange={handleCustomAmount}
            />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h3>选择支付方式</h3>
          <Radio.Group onChange={handlePaymentSelect} value={selectedPayment}>
            <Space direction="vertical">
              {paymentMethods.map(method => (
                <Radio key={method.id} value={method.id}>
                  <Space>
                    {method.icon}
                    {method.name}
                  </Space>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>

        <Button type="primary" size="large" onClick={handleRecharge}>
          立即充值
        </Button>
      </Card>

      <Modal
        title="确认支付"
        open={isModalVisible}
        onOk={handleConfirmPayment}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        <p>充值金额：{amount}元</p>
        <p>支付方式：{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
      </Modal>
    </div>
  );
};

export default Recharge; 