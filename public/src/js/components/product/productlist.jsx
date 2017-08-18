import React, { Component } from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd';
import {
    initProductList
} from '../../actions/product';

class Product extends Component {
    constructor() {
        super();
        this.columns = [{
            title: '产品名称',
            dataIndex: 'productName',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <div className="editable-row-text">
                        <Link to={{
                            pathname:'/production/productinfo',
                            search: `?id=${record.productId}`
                        }}>{ text }</Link>
                    </div>
                )
            }
        }, {
            title: '产品分类',
            dataIndex: 'typeName',
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
            width: '5%',
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
            width: '5%',
            render: (text, record, index) => {
                return (
                    <div className="editable-row-text">
                        { text }
                    </div>
                )
            }
        }, {
            title: '产品图片',
            dataIndex: 'picture',
            width: '20%',
            render: (text, record, index) => {
                // var textDOM = <a href={text} target='_black'>{text}</a>;
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
            render: (text, record, index) => {
                return (
                    <div className="editable-row-operations">
                        <div>
                            <Link to={{
                                pathname: '/production/editproduct',
                                search: `?id=${record.productId}`
                            }}><Icon type="edit" /></Link>
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
            type: 'checkbox',
            onSelect: this.onSelect
        }
    }

    state = {
        previewImage: '',
        previewVisible: false
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initProductList())
    }

    onDelete() {
        var selectedRowsId = this.selectedRows.map(item => item.productId);

    }

    onSelect = (record, selected, selectedRows) => {
        this.selectedRows = selectedRows;
        // console.log(record, selected, selectedRows);
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
        var dataSource = product.data.list.map((item, index) => {
            return {
                key: index,
                productId: item['p_id'],
                productName: item['p_name'],
                typeName: item['t_typename'],
                price: item['p_price'],
                amount: item['p_amount'],
                picture: item['p_masterPic'] && JSON.parse(item['p_masterPic']).path
            }
        });
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
                    rowSelection={{}}
                    columns={this.columns}
                    rowSelection={this.rowSelection}
                    pagination={true}
                    size="middle"
                />
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        product: state.commodity.product
    }
}

export default connect(mapStateToProps)(Product)