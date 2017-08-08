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
            width: '15%',
            render: (text, record, index) => {
                console.log(text, record)
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
            width: '15%',
            render: (text, record, index) => {
                return (
                    <div className="editable-row-text">
                        { text }
                    </div>
                )
            }
        }, {
            title: '描述',
            dataIndex: 'describe',
            width: '50%',
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
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initProductList())
    }

    onAdd() {

    }

    onDelete() {

    }

    render() {
        var { product } = this.props;
        var dataSource = product.data.list.map((item, index) => {
            return {
                key: index,
                productId: item['p_id'],
                productName: item['p_name'],
                typeName: item['t_typename'],
                describe: item['p_desp']
            }
        });
        return (
            <div >
                <div style={{padding: '10px 0'}}>
                    <Link to='/production/addproduct'>
                        <Button className="editable-add-btn" style={{marginRight: '20px'}} type="primary">添加</Button>
                    </Link>
                    <Button className="editable-delete-btn" type="primary" onClick={e => this.onAdd(e)}>删除</Button>
                </div>
                <Table bordered dataSource={dataSource} rowSelection={{}} columns={this.columns} pagination={true} size="middle"/>
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