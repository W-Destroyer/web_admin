/**
 * Create By Piny
 * 2017.08.03
 */
import React, { Component }from 'react';
import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd';
// import { Table, Icon,  } from 'antd/dist/antd';

import {
    initClassify
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
            width: '65%',
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
    }

    componentDidMount() {
        const { dispatch, classify } = this.props;
        if (!classify.data.length)
            dispatch(initClassify())
    }

    onAdd() {

    }

    render() {
        var { classify } = this.props;
        var dataSource = classify.data.map((item, index) => {
            return {
                key: index,
                typename: item['t_typename'],
                describe: item['t_desp']
            }
        })
        return (
            <div >
                <div style={{padding: '10px 0'}}>
                    <Button className="editable-add-btn" style={{marginRight: '20px'}} type="primary" onClick={e => this.onAdd(e)}>添加</Button>
                    <Button className="editable-delete-btn" type="primary" onClick={e => this.onAdd(e)}>删除</Button>
                </div>
                <Table bordered dataSource={dataSource} rowSelection={{}} columns={this.columns} pagination={false} size="middle"/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        classify: state.commodity.classify
    }
}

export default connect(mapStateToProps)(Classify)