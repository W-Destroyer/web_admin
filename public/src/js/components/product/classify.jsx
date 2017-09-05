/**
 * Create By Piny
 * 2017.08.03
 */
import React, { Component }from 'react';
import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd';

import {
    initClassify,
    addClassify,
    editClassify,
    saveClassify,
    deleteClassify,
    cancelClassifyModal
} from '../../actions/classify';

class Classify extends Component {
    constructor() {
        super();
        this.columns = [{
            title: '分类名称',
            dataIndex: 'typename',
            width: '25%',
            render: (text, record, index) => (<div className="editable-row-text">{ text }</div>),
        }, {
            title: '描述',
            dataIndex: 'describe',
            width: '60%',
            render: (text, record, index) => {
                // var textDOM = <a href={text} target='_black'>{text}</a>;
                return (<div className="editable-row-text">{ text }</div>)
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

        this.rowSelection = {

        }

        this.classifyModalKey = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classify.isEdit && this.props.classify.changeId !== nextProps.classify.changeId)
            this.classifyModalKey++;
    }

    componentDidMount() {
        const { dispatch, classify } = this.props;
        if (!classify.data.length)
            dispatch(initClassify());
    }

    componentDidUpdate() {
        const { dispatch, classify } = this.props;
        if (classify.saveSuccessful)
            dispatch(editClassify(false));
    }

    onAdd() {
        const { dispatch } = this.props;
        dispatch(addClassify());
    }

    onEdit(index) {
        const { dispatch } = this.props;
        dispatch(editClassify(index));
    }

    onDelete() {
        const { dispatch } = this.props;
        dispatch(deleteClassify());
    }

    onSave = (data) => {
        const { dispatch } = this.props;
        dispatch(saveClassify(data));
    }

    onCancel = () => {
        const { dispatch } = this.props;
        dispatch(cancelClassifyModal());
    }

    render() {
        var { classify } = this.props;
        var { isEdit, changeId, isFetching } = classify;
        
        var dataSource = classify.data.map((item, index) => {
            return {
                key: index,
                typename: item['t_typename'],
                describe: item['t_desp']
            }
        });
        var editData = dataSource[changeId] || {
            id: changeId,
            typename: '',
            describe: ''
        }
        return (
            <div >
                <div style={{padding: '10px 0'}}>
                    <Button className="editable-add-btn" style={{marginRight: '20px'}} type="primary" onClick={e => this.onAdd(e)}>添加</Button>
                    <Button className="editable-delete-btn" type="primary" onClick={e => this.onDelete(e)}>删除</Button>
                </div>
                <Table bordered dataSource={dataSource} rowSelection={this.rowSelection} columns={this.columns} pagination={false} size="middle"/>
                <AddClassifyModal 
                    modalKey={this.classifyModalKey}
                    title="添加产品分类"
                    data={editData}
                    isEdit={isEdit}
                    onOk={this.onSave}
                    onCancel={this.onCancel}
                    confirmLoading={isFetching}
                />
            </div>
        )
    }
}

class AddClassifyModal extends Component {
    constructor() {
        super();
    }

    handleOk() {
        this.props.onOk(this.data);
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleChange(key, value) {
        this.data[key] = value;
    }

    render() {
        const { modalKey, title, data, isEdit, confirmLoading } = this.props;
        this.data = {
            typename: data['typename'] || '',
            describe: data['describe'] || ''
        }
        return (
            <Modal 
                key={modalKey}
                title={title}
                visible={isEdit}
                confirmLoading={confirmLoading}
                onOk={() => this.handleOk()}
                onCancel={() => this.handleCancel()}
            >
                <div>
                    <div style={{ padding: '5px' }}>分类名称：</div>
                    <Input
                        type="text"
                        defaultValue={this.data.typename}
                        onChange={e => this.handleChange('typename', e.target.value)}
                    />
                    <div style={{ padding: '5px' }}>分类描述：</div>
                    <Input
                        type="textarea"
                        style={{height: '100px'}}
                        defaultValue={this.data.describe}
                        onChange={e => this.handleChange('describe', e.target.value)}
                    />
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        classify: state.commodity.classify,
    }
}

export default connect(mapStateToProps)(Classify)