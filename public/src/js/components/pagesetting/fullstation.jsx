/**
 * Create By Piny
 * 2017.07.04
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon, Select } from 'antd';
const Panel = Collapse.Panel;
const Option = Select.Option;

import {
    initCompanyName,
    editCompanyName,
    saveCompanyName,
    cancelCompanyNameEdit,
    clearCompanyNameNotify,
    initFriendLink,
    editFriendLink,
    addFriendLink,
    saveFriendLink,
    delFriendLink,
    cancelFriendLinkModal,
    clearFriendLinkNotify
} from '../../actions/baseinfo'

class CompanyName extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { data, dispatch } = this.props;
        if (!data.data)
            dispatch(initCompanyName());
    }

    componentDidUpdate() {
        var { data, dispatch } = this.props;

        if (data.saveSuccessful) {
            message.success(data.message);
            dispatch(cancelCompanyNameEdit())
            dispatch(clearCompanyNameNotify())
            dispatch(initCompanyName());
        }

        if (data.invalidate) {
            message.error(data.message);
            dispatch(clearCompanyNameNotify());
        }
    }

    onEdit(e) {
        const { dispatch } = this.props;
        dispatch(editCompanyName());
    }

    onChange(e) {
        this.data = e.target.value;
    }

    handleClick(e) {
        const { dispatch } = this.props;
        dispatch(saveCompanyName(this.data));
    }

    handleCancel(e) {
        const { data, dispatch } = this.props;
        if (data.isFetching) return;
        dispatch(cancelCompanyNameEdit());
    }

    render() {
        var { data } = this.props;
        this.data = data.data;

        if (!data.isEdit)
            return (
                <div style={{padding: "0 20px"}}>
                    <div style={{paddingBottom: '10px'}}>{data.data}</div>
                    <Button onClick={e => this.onEdit(e)}>编辑</Button>
                </div>
            )

        return (
            <div style={{padding: "0 20px"}}>
                <div style={{paddingBottom: '10px'}}>
                    <Input type="text"
                        defaultValue={this.data}
                        onChange={(e) => this.onChange(e)}
                    />
                </div>
                <div>
                    <Button
                        style={{marginRight: '10px'}}
                        onClick={e => this.handleCancel(e)}
                    >取消</Button>
                    <Button
                        style={{marginLeft: '10px'}}
                        onClick={e => this.handleClick(e)}
                        loading={data.isFetching}
                    >保存</Button>
                </div>
            </div>
        )
    }
}

class FriendModal extends Component {
    
    constructor() {
        super();

        this.modalKey = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isEdit && this.props.data.id !== nextProps.data.id)
            this.modalKey++;
    }

    handleOk() {
        this.props.onHandleOk(this.data);
    }

    handleCancel() {
        this.props.onHandleCancel();
    }

    handleChange(key, e) {
        console.log(e.target.value)
        this.data[key] = e.target.value;
    }

    render() {
        const {title, data, isEdit, confirmLoading } = this.props;
        this.data = data;
        console.log(this.data);
        const selectBefore = (
            <Select defaultValue="Http://" style={{ width: 80 }}>
                <Option value="Http://">Http://</Option>
                <Option value="Https://">Https://</Option>
            </Select>
        );
        const selectAfter = (
            <Select defaultValue=".com" style={{ width: 70 }}>
                <Option value=".com">.com</Option>
                <Option value=".jp">.jp</Option>
                <Option value=".cn">.cn</Option>
                <Option value=".org">.org</Option>
            </Select>
        );
        return (
            <Modal 
                key={this.modalKey}
                title={title}
                visible={isEdit}
                confirmLoading={confirmLoading}
                onOk={() => this.handleOk()}
                onCancel={() => this.handleCancel()}
            >
                <div>
                    <div style={{ padding: '5px' }}>网站名称：</div>
                    <Input
                        type="text"
                        defaultValue={this.data.name}
                        onChange={e => this.handleChange('name', e)}
                    />
                    <div style={{ padding: '5px' }}>网站地址：</div>
                    <Input
                        type="text"
                        defaultValue={this.data.value}
                        onChange={e => this.handleChange('value', e)}
                        // addonBefore={selectBefore}
                        // addonAfter={selectAfter}
                    />
                </div>
            </Modal>
        );
    }
}

class FriendlyLink extends React.Component {
    constructor(props) {
        super(props);

        this.tableOptions = {
            size: 'middle',
            pagination: false,
            columns: [{
                title: '网站名称',
                dataIndex: 'name',
                width: '25%',
                render: (text, record, index) => (<div className="editable-row-text">{ text }</div>),
            }, {
                title: '网站地址',
                dataIndex: 'value',
                width: '65%',
                render: (text, record, index) => {
                    var textDOM = <a href={text} target='_black'>{text}</a>;
                    return (<div className="editable-row-text">{ textDOM || text }</div>)
                },
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        <div className="editable-row-operations">
                            <div>
                                <a onClick={() => this.onEdit(record)}>
                                    <Icon type="edit" />
                                </a>
                                <span>&nbsp;&nbsp;</span>
                                <Popconfirm title="确定删除？" onConfirm={() => this.onDelete(record)}>
                                    <a><Icon type="delete" /></a>
                                </Popconfirm>
                            </div>
                        </div>
                    );
                }
            }],
            rowKey: function(record) { return record.id.toString() }
        }

        this.modalTitle = '添加友情链接';
    }

    componentDidMount() {
        const { dispatch, friendLink } = this.props;
        if (!friendLink.data.length)
            dispatch(initFriendLink());
    }

    componentDidUpdate() {
        const { dispatch, friendLink } = this.props;
        if (friendLink.invalidate) {
            message.error(friendLink.message);
            dispatch(clearFriendLinkNotify());
        }

        if (friendLink.saveSuccessful) {
            message.success(friendLink.message);
            dispatch(cancelFriendLinkModal());
            dispatch(clearFriendLinkNotify());
            dispatch(initFriendLink());
        }

        if (friendLink.deleteSuccessful) {
            message.success(friendLink.message);
            dispatch(clearFriendLinkNotify());
            dispatch(initFriendLink());
        }
    }

    onAdd() {
        const { dispatch } = this.props;
        this.modalTitle = '添加友情链接';
        dispatch(addFriendLink(true))
    }

    onEdit(data) {
        const { dispatch } = this.props;
        this.modalTitle = '编辑友情链接';
        dispatch(editFriendLink(data))
    }

    onDelete(data) {
        const { dispatch } = this.props;
        dispatch(delFriendLink(data));
    }
    
    onHandleOk(changeData) {
        const { dispatch, friendLink } = this.props;
        dispatch(saveFriendLink(changeData));
    }

    onHandleCancel() {
        const { dispatch } = this.props;
        dispatch(cancelFriendLinkModal());
    }

    render() {
        const { friendLink } = this.props;
        const { isEdit, isFetching, data, changeData } = friendLink;

        return (
            <div>
                <div style={{padding: '10px 0'}}>
                    <Button className="editable-add-btn" type="primary" onClick={e => this.onAdd(e)}>添加</Button>
                </div>
                <Table
                    bordered
                    dataSource={friendLink.data}
                    {...this.tableOptions}
                />
                <FriendModal
                    data={changeData}
                    title={this.modalTitle}
                    isEdit={isEdit}
                    confirmLoading={isFetching}
                    onHandleOk={data => this.onHandleOk(data)}
                    onHandleCancel={() => this.onHandleCancel()}
                />
            </div>
        );
    }
}


const customPanelStyle = {
    // background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
};

class FullStation extends Component {
    render() {
        const { companyName, friendLink, baseinfo, dispatch } = this.props;

        return (
            <Collapse bordered={false} defaultActiveKey={[]}>
                <Panel header={<div style={{fontWeight: 600}}>公司名称设置</div>} key="1" style={customPanelStyle}>
                    <CompanyName
                        data={ companyName }
                        dispatch={dispatch}
                    />
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>友情链接设置</span>} key="2" style={customPanelStyle}>
                    <FriendlyLink
                        friendLink={ friendLink }
                        dispatch={dispatch}
                    />
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>技术支持设置</span>} key="3" style={customPanelStyle}>
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>博客资讯设置</span>} key="4" style={customPanelStyle}>
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>关于公司设置</span>} key="5" style={customPanelStyle}>
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>备案号设置</span>} key="6" style={customPanelStyle}>
                </Panel>
            </Collapse>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        companyName: state.baseinfo.companyName,
        friendLink: state.baseinfo.friendLink,
        baseinfo: state.baseinfo
    }
}

export default connect(mapStateToProps)(FullStation)