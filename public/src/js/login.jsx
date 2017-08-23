import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { SHA1 } from 'cryptoJs';
import axios from 'axios';

import { Form, Icon, Input, Button, Checkbox, message, notification } from 'antd';
const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!!err)
                return notification.error({
                    message: '登录失败',
                    description: '用户名或密码错误！！！'
                })
            var data = {
                username: values.username,
                password: SHA1(values.password).toString(),
                remember: values.remember
            }
            axios.post('/api/user/login', {
                ...data
            }).then(res => {
                if (res.data.code != 0)
                    notification.error({
                        message: '登录失败',
                        description: res.data.message
                    });
                var search = window.location.search.split('?')[1];
                var url = !!search ? decodeURIComponent(search) : '/';
                window.location.href = url;
            }).catch(err => {
                notification.error({
                    message: '登录失败',
                    description: err.message
                })
            })
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '400px',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                border: '1px solid #e1e1e1',
                boxShadow: '0px 0px 30px silver'
            }}>
                <div style={{
                    paddingBottom: '20px',
                    textAlign: 'center',
                    fontSize: '24px'
                }}>
                    后台管理系统
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" style={{float: 'right'}} href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}} className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('main'));