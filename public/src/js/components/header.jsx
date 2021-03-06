import React, { Component } from 'react';
import { Link } from 'react-router';

import { Layout, Menu, Dropdown, Icon } from 'antd';
const { Header } = Layout;

import axios from 'axios';

export class User extends Component {
    constructor() {
        super();
    }

    logout(e) {
        axios.post('/api/user/logout').then(body => {
            if (body.data.code !== 0)
                return ;
            window.location.href = '/login';
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        var {userinfo} = this.props;

        var userStyle = {
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '0 20px'

        }
        var userImgStyle = {
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            border: '1px solid #e1e1e1',
            margin: '12px',
            float: 'left',
            background: `url(${userinfo.userImg})`,
            backgroundSize: 'contain'
        }

        return (
            <div style={userStyle}>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item key="0">
                            <a href="http://www.alipay.com/">个人资料</a>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <a href="http://www.taobao.com/">个人设置</a>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3">
                            <a href="javascript:;" onClick={e => this.logout(e)}>退出</a>
                        </Menu.Item>
                    </Menu>
                } trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        <div style={userImgStyle}></div>
                    </a>
                </Dropdown>
                <div style={{float: 'left', margin: '0 12px'}}>{userinfo.nickname}</div>
            </div>
        )
    }
}

export default class extends Component {
    contructor() {
        // super();
    }

    render() {
        var {userinfo} = this.props;
        return (
            <Header className="header">
                <div className='title'>
                    <div style={{float: 'left', height: "100%", padding: '10px', boxSizing: 'border-box'}}>
                        <img height="100%" src="/images/logo.png" />
                    </div>
                    <div style={{float: 'left'}}>
                        江西艾麦达后台管理系统
                    </div>
                </div>
                <User userinfo={userinfo}/>
            </Header>
        )
    }
}