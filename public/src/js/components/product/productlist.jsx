import React, { Component } from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd';
import {
    initProductList,
    deleteProductList,
    clearProductListNotify
} from '../../actions/product';

class Product extends Component {
    constructor() {
        super();

        this.state = {
            previewImage: '',
            previewVisible: false
        }

        this.tableOptions = {
            columns: [{
                title: '产品名称',
                dataIndex: 'name',
                width: '10%',
                render: (text, record, index) => {
                    return (
                        <div className="editable-row-text">
                            <Link to={{
                                pathname:'/production/productinfo',
                                search: `?id=${record.id}`
                            }}>{ text }</Link>
                        </div>
                    )
                }
            }, {
                title: '产品分类',
                dataIndex: 'typename',
                width: '10%',
                render: (text, record, index) => {
                    return (
                        <div className="editable-row-text">
                            { text }
                        </div>
                    )
                }
            }, {
                title: '价格',
                dataIndex: 'price',
                width: '10%',
                render: (text, record, index) => {
                    return (
                        <div className="editable-row-text" style={{textAlign: 'right'}}>
                            { "￥" + text }
                        </div>
                    )
                }
            }, {
                title: '库存',
                dataIndex: 'amount',
                width: '10%',
                render: (text, record, index) => {
                    return (
                        <div className="editable-row-text">
                            { text }
                        </div>
                    )
                }
            }, {
                title: '产品图片',
                dataIndex: 'masterPic',
                // width: '20%',
                render: (text, record, index) => {
                    if (!text)
                        return (
                            <span>暂无图片</span>
                        )
                    return (
                        <div>
                            <a href="javascript:;" onClick={e => this.handlePreview(text)}>查看图片</a>
                        </div>
                    )
                },
            }, {
                title: '操作',
                dataIndex: 'operation',
                width: '10%',
                render: (text, record, index) => {
                    return (
                        <div className="editable-row-operations">
                            <div>
                                <Link to={{
                                    pathname: '/production/editproduct',
                                    search: `?id=${record.id}`
                                }}><Icon type="edit" /></Link>
                                <span>&nbsp;&nbsp;</span>
                                <Popconfirm title="确定删除？" onConfirm={() => this.deleteById(record.id)}>
                                    <a><Icon type="delete" /></a>
                                </Popconfirm>
                            </div>
                        </div>
                    );
                }
            }],
            rowSelection: {
                type: 'checkbox',
                onSelect: (record, selected, selectedRows) => {
                    this.tableSelectedRows = selectedRows;
                    // console.log(record, selected, selectedRows);
                },
                onSelectAll: (selected, selectRows, changeRows) => {
                    this.tableSelectedRows = selectRows;
                    // console.log('onSelect:', selected, selectRows, changeRows);
                }
            },
            rowKey: record => {
                return record.id;
            },
            pagination: true,
            size: "middle"
        }

        this.tableSelectedRows = [];

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initProductList());
    }

    componentDidUpdate() {
        const { product, dispatch } = this.props;
        if (product.deleteSuccessful) {
            message.success(product.message);
            dispatch(initProductList());
            dispatch(clearProductListNotify());
        }

    }

    deleteById = ids => {
        const { dispatch } = this.props;

        dispatch(deleteProductList(ids));
    }

    onDelete() {
        if (!this.tableSelectedRows.length)
            return message.error('请选择数据进行删除！');

        Modal.confirm({
            title: '确定删除?',
            onOk: () => {
                var selectedRowsId = this.tableSelectedRows.map(item => item.id);
                this.tableSelectedRows = [];
                this.deleteById(selectedRowsId);
            },
        });
    }

    handlePreview(picUrl) {
        this.setState({
            previewImage: picUrl,
            previewVisible: true,
        });
    }

    handleCancel = () => {
        this.setState({ previewVisible: false })
    }

    render() {
        var { product } = this.props;
        var dataSource = product.data.list;
        var { previewVisible, previewImage } = this.state;
        
        return (
            <div >
                <div style={{padding: '10px 0'}}>
                    <Link to='/production/addproduct'>
                        <Button className="editable-add-btn" style={{marginRight: '20px'}} type="primary">添加</Button>
                    </Link>
                    <Button className="editable-delete-btn" type="primary" onClick={e => this.onDelete(e)}>删除</Button>
                </div>
                <Table 
                    bordered
                    dataSource={dataSource}
                    {...this.tableOptions}
                />
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="产品主图" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        product: state.commodity.productList
    }
}

export default connect(mapStateToProps)(Product)