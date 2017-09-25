/**
 * Create By Piny
 * 2017.08.03
 */
import React, { Component }from 'react';
import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, Select, TreeSelect, message, Icon, notification } from 'antd';
const { Option, OptGroup } = Select;

import {
    initClassify,
    addClassify,
    editClassify,
    saveClassify,
    deleteClassify,
    cancelClassifyModal,
    clearClassifyNotify
} from '../../actions/classify';

class Classify extends Component {
    constructor() {
        super();
        // 私有静态变量
        this.classifyModalKey = 0;
        this.modalTitle = '';

        this.tableSelectedRows = [];

        this.tableOptions = {
            columns: [{
                title: '分类名称',
                dataIndex: 'name',
                width: '25%',
                render: (text, record, index) => (<span className="editable-row-text">{ text }</span>),
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
                                <a onClick={() => this.onEdit(record)}>
                                    <Icon type="edit" />
                                </a>
                                <span>&nbsp;&nbsp;</span>
                                <Popconfirm title="确定删除？" onConfirm={() => this.deleteClassById([record.id])}>
                                    <a><Icon type="delete" /></a>
                                </Popconfirm>
                            </div>
                        </div>
                    );
                }
            }],
            rowSelection: {
                onSelect: (record, selected, selectRows) => {
                    this.tableSelectedRows = selectRows;
                    // console.log('onSelect:', record, selected, selectRows);
                },
                onSelectAll: (selected, selectRows, changeRows) => {
                    this.tableSelectedRows = selectRows;
                    // console.log('onSelect:', selected, selectRows, changeRows);
                }
            },
            rowKey: record => {
                return record.id;
            }
        }
    }
    /*      静态变量   Start             */
    
    /*      静态变量   End               */
    /*      React 生命周期 方法 Start     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.classify.isEdit && this.props.classify.changeData.id !== nextProps.classify.changeData.id)
            this.classifyModalKey++;
        if (this.props.classify.saveSuccessful)
            this.classifyModalKey++;

    }

    componentDidMount() {
        const { dispatch, classify } = this.props;
        if (!classify.data.length)
            dispatch(initClassify());
    }

    componentDidUpdate() {
        const { dispatch, classify } = this.props;
        if (classify.saveSuccessful) {
            message.success(classify.message);

            dispatch(cancelClassifyModal());
            dispatch(clearClassifyNotify());
            dispatch(initClassify());
        }
        
        if (classify.deleteSuccessful) {
            message.success(classify.message);
            dispatch(initClassify());
            dispatch(clearClassifyNotify());
        }
        
        if (classify.invalidate) {
            message.error(classify.message)
            dispatch(clearClassifyNotify());
            dispatch(initClassify());
        }
    }

    /*      React 生命周期 方法 End     */

    onAddBtnClick() {
        const { dispatch } = this.props;
        this.modalTitle = '添加产品分类';
        dispatch(addClassify());
    }

    onEdit(classData) {
        const { dispatch } = this.props;
        this.modalTitle = '编辑产品分类';
        dispatch(editClassify(classData));
    }

    onDeleteBtnClick(e) {
        if (!this.tableSelectedRows.length)
            return message.error('请选择数据进行删除！');

        Modal.confirm({
            title: '确定删除?',
            // content: 'Some descriptions',
            onOk: () => {
                console.log('OK');
                var classIds = this.tableSelectedRows.map(row => row.id);
                this.tableSelectedRows = [];
                this.deleteClassById(classIds);
            },
        })
        
    }    

    deleteClassById(classIds) {
        const { dispatch } = this.props;
        dispatch(deleteClassify(classIds));
    }

    onModalSave = (data) => {
        const { dispatch } = this.props;
        dispatch(saveClassify(data));
    }

    onModalCancel = () => {
        const { dispatch, classify } = this.props;
        const { isFetching } = classify;
        if (!isFetching)
            dispatch(cancelClassifyModal());
    }

    render() {
        var { classify } = this.props;
        var { data, isEdit, changeData, isFetching } = classify;
        
        return (
            <div >
                <div style={{padding: '10px 0'}}>
                    <Button className="editable-add-btn" style={{marginRight: '20px'}} type="primary" onClick={e => this.onAddBtnClick(e)}>添加</Button>
                    <Button className="editable-delete-btn" type="primary" onClick={e => this.onDeleteBtnClick(e)}>删除</Button>
                </div>
                <Table 
                    bordered
                    dataSource={data}
                    pagination={false}
                    size="middle"
                    {...this.tableOptions}
                />
                <AddClassifyModal 
                    modalKey={this.classifyModalKey}
                    title={this.modalTitle}
                    data={changeData}
                    parentData={data}
                    isEdit={isEdit}
                    onOk={this.onModalSave}
                    onCancel={this.onModalCancel}
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
        const { modalKey, title, data, parentData, isEdit, confirmLoading } = this.props;
        this.data = Object.assign({
            id: -1,
            name: '',
            parentId: 0,
            describe: ''
        }, data);

        var dataTranslate = (data, index) => {
            index = index || 0;
            return data.map(item => {
                var obj = {
                    key: item.id,
                    value: item.id.toString(),
                    label: item.name,
                }

                if (!!item.children && index < 1)
                    obj.children = dataTranslate(item.children, index + 1);

                return obj;
            });
        }

        var treeData = dataTranslate(parentData);

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
                        defaultValue={this.data.name}
                        onChange={e => this.handleChange('name', e.target.value)}
                    />
                    <div style={{ padding: '5px' }}>所属分类：</div>
                    <TreeSelect 
                        style={{ width: '100%' }}
                        placeholder='请选择父级分类'
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        treeDefaultExpandAll
                        allowClear
                        onChange={(value, label, extra) => this.handleChange('parentId', value, label, extra)}
                    ></TreeSelect>
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