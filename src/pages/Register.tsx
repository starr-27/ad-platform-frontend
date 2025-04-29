// src/pages/Register.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        // 这里可以发送请求到服务器，处理用户注册逻辑
        // 假设注册成功后返回一个成功消息
        setTimeout(() => {
            setLoading(false);
            message.success('sucess');
        }, 1000);
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', paddingTop: 50 }}>
            <h2>用户注册</h2>
            <Form
                name="register"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
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
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
