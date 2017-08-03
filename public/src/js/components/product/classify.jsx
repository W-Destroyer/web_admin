/**
 * Create By Piny
 * 2017.08.03
 */
import React, { Component }from 'react';
import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd/dist/antd';
// import { Table, Icon,  } from 'antd/dist/antd';

import {} from '../../actions/classify';

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



    render() {
        return (
            <div>
                <Table bordered dataSource={[{key: '11', typename: "1234567", describe: '1234567890-'}]} rowSelection={{}} columns={this.columns} pagination={false} size="middle"/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        classify: state.classify
    }
}

export default connect(mapStateToProps)(Classify)