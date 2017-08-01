/**
 * Create By Piny
 * 2017.07.04
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd/dist/antd';
const Panel = Collapse.Panel;

import {
    showModal,
    hideModal,
    addFriendLink,
    editFriendLink,
    initCompanyName,
    editCompanyName,
    saveCompanyName,
} from '../../actions/baseinfo'

class CompanyName extends Component {
    constructor() {
        super();
        // this.state = {
        //     isEdit: false
        // }
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

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    handleOk = () => {
        this.props.onHandleOk(this.data);
    }
    handleCancel = () => {
        this.props.onHandleCancel();
    }

    handleChange = (key, e) => {
        console.log(e.target.value)
        this.data[key] = e.target.value;
    }

    render() {
        const { title, data, visible } = this.props;
        this.data = data ? Object.assign({}, data) : {
            name: '',
            address: ''
        };
        console.log(data);

        return (
            <Modal title={title}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
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

        // this.modalTitle = '';
    }

    onAdd = () => {
        const { dispatch } = this.props;
        dispatch(showModal());
    }

    onEdit(index) {
        const { dispatch } = this.props;
        dispatch(showModal(index))
    }

    onDelete(index) {
        const data = [...this.state.data];
        data.splice(index, 1);
        this.setState({ data });
    }
    
    onHandleOk = (changeData) => {
        const { dispatch, data } = this.props;
        const { changeId } = data;
        if(changeId === -1) 
            dispatch(addFriendLink(changeData));
        else 
            dispatch(editFriendLink(changeId, changeData));
    }

    onHandleCancel = () => {
        const { dispatch } = this.props;
        dispatch(hideModal());
    }

    render() {

        const { data } = this.props;

        // const dataSource = data.list.map((item) => {
        //     const obj = {};
        //     Object.keys(item).forEach((key) => {
        //         obj[key] = key === 'key' ? item[key] : item[key].value;
        //     });
        //     return obj;
        // });

        const { showModal, list, changeId } = data;
        
        const columns = this.columns;

        return (
            <div>
                <FriendModal
                    key={changeId}
                    data={list[changeId]}
                    title={'友情链接设置'}
                    visible={showModal}
                    onHandleOk={(data) => this.onHandleOk(data)}
                    onHandleCancel={() => this.onHandleCancel()}
                />
                <div style={{padding: '10px'}}>
                    <Button className="editable-add-btn" type="primary" onClick={this.onAdd}>添加</Button>
                </div>
                <Table bordered dataSource={list} columns={columns} pagination={false} />
            </div>
        )
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
                    <FriendlyLink data={baseinfo.friendLink} dispatch={dispatch}/>
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