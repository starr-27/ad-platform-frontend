// src/pages/Register.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        // ������Է������󵽷������������û�ע���߼�
        // ����ע��ɹ��󷵻�һ���ɹ���Ϣ
        setTimeout(() => {
            setLoading(false);
            message.success('sucess');
        }, 1000);
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', paddingTop: 50 }}>
            <h2>�û�ע��</h2>
            <Form
                name="register"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="�û���"
                    rules={[{ required: true, message: '�������û���!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="����"
                    rules={[{ required: true, message: '����������!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="ȷ������"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'comfirm' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('different');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        ע��
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
