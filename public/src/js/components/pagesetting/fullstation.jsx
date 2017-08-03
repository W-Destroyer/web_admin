/**
 * Create By Piny
 * 2017.07.04
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd/dist/antd';
const Panel = Collapse.Panel;

import {
    initCompanyName,
    editCompanyName,
    saveCompanyName,
    initFriendLink,
    editFriendLink,
    addFriendLink,
    saveFriendLink,
    delFriendLink
} from '../../actions/baseinfo'

class CompanyName extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initCompanyName());
    }

    componentDidUpdate() {
        var { data } = this.props;
        message.destroy();
        if (data.isFetching)
            message.loading('正在加载');

        if (data.invalidate)
            message.error(data.message);
    }

    onEdit(e) {
        const { dispatch } = this.props;
        dispatch(editCompanyName(true));
    }

    onChange(e) {
        console.log(e.target.value);
        this.data = e.target.value;
    }

    handleClick(e) {
        const { dispatch } = this.props;
        dispatch(saveCompanyName(this.data));
    }

    handleCancel(e) {
        const { dispatch } = this.props;
        dispatch(editCompanyName(false))
    }

    render() {
        var { data } = this.props;
        this.data = data.data;

        if (data.isEdit) {
            return (
                <div style={{padding: "0 20px"}}>
                    <div style={{paddingBottom: '10px'}}>
                        <Input type="text"
                            defaultValue={data.data}
                            onChange={(e) => this.onChange(e)}
                        />
                    </div>
                    <div>
                        <Button style={{marginRight: '10px'}} onClick={e => this.handleCancel(e)}>取消</Button>
                        <Button style={{marginLeft: '10px'}} onClick={e => this.handleClick(e)}>保存</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{padding: "0 20px"}}>
                    <div style={{paddingBottom: '10px'}}>{data.data}</div>
                    <Button onClick={e => this.onEdit(e)}>编辑</Button>
                </div>
            )
        }
    }
}

class FriendModal extends Component {
    
    constructor() {
        super();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true
    // }

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
        const { key, title, data, isEdit, confirmLoading } = this.props;
        this.data = {
            name: data['s_name'] || '',
            address: data['s_value'] || ''
        }
        console.log(this.data);

        return (
            <Modal 
                key={key}
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
                        defaultValue={this.data.address}
                        onChange={e => this.handleChange('address', e)}
                    />
                </div>
            </Modal>
        );
    }
}

class FriendlyLink extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '网站名称',
            dataIndex: 'name',
            width: '25%',
            render: (text, record, index) => (<div className="editable-row-text">{ text }</div>),
        }, {
            title: '网站地址',
            dataIndex: 'address',
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
                            <a onClick={() => this.onEdit(index)}>
                                <Icon type="edit" />
                            </a>
                            <span>&nbsp;&nbsp;</span>
                            <Popconfirm title="确定删除？" onConfirm={() => this.onDelete(index)}>
                                <a><Icon type="delete" /></a>
                            </Popconfirm>
                        </div>
                    </div>
                );
            }
        }];
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initFriendLink());
    }

    onAdd() {
        const { dispatch } = this.props;
        dispatch(addFriendLink(true))
    }

    onEdit(index) {
        const { dispatch } = this.props;
        dispatch(editFriendLink(true, index))
    }

    onDelete(index) {
        const { dispatch, friendLink } = this.props;
        const { data } = friendLink;
        dispatch(delFriendLink(index, data[index]));
    }
    
    onHandleOk(changeData) {
        const { dispatch, friendLink } = this.props;
        const { data, changeId } = friendLink;

        dispatch(saveFriendLink(data[changeId], changeData));
    }

    onHandleCancel() {
        const { dispatch } = this.props;
        dispatch(editFriendLink(false));
    }

    render() {
        const { friendLink } = this.props;
        const { isEdit, isFetching, data, changeId } = friendLink;
        const dataSource = friendLink.data.map(item => {
            return {
                key: item['s_id'],
                name: item['s_name'],
                address: item['s_value']
            }
        })
        const columns = this.columns;

        return (
            <div>
                <FriendModal
                    key={changeId}
                    data={data[changeId] || {}}
                    title='友情链接设置'
                    isEdit={isEdit}
                    confirmLoading={isFetching}
                    onHandleOk={data => this.onHandleOk(data)}
                    onHandleCancel={() => this.onHandleCancel()}
                />
                <div style={{padding: '10px'}}>
                    <Button className="editable-add-btn" type="primary" onClick={e => this.onAdd(e)}>添加</Button>
                </div>
                <Table bordered dataSource={dataSource} columns={columns} pagination={false} size="middle"/>
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
        const { baseinfo, dispatch } = this.props;

        return (
            <Collapse bordered={false} defaultActiveKey={[]}>
                <Panel header={<div style={{fontWeight: 600}}>公司名称设置</div>} key="1" style={customPanelStyle}>
                    <CompanyName data={baseinfo.name} dispatch={dispatch}/>
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>友情链接设置</span>} key="2" style={customPanelStyle}>
                    <FriendlyLink friendLink={baseinfo.friendLink} dispatch={dispatch}/>
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
        baseinfo: state.baseinfo
    }
}

export default connect(mapStateToProps)(FullStation)