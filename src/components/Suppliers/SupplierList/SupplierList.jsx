import React, {Component, PropTypes} from 'react';
import {Table, Pagination, Popconfirm, Button} from 'antd';
import dateFormat from '../../../utils/dateFormat';
import {PAGE_SIZE} from '../../../constants/constants';
import Spliter from '../../Spliter/Spliter';
import {supplierList} from './index.css';

const SupplierList = ({
    total,
    current,
    loading,
    dataSource,
    onPageChange,
    onModify,
    onDel
}) => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            render: (text, record, index)=><span>{index + 1}</span>
        },
        {
            title: '客户名称',
            dataIndex: 'supplierName',
            key: 'supplierName'
        },
        {
            title: '联系人',
            dataIndex: 'contactPeople',
            key: 'contactPeople'
        },
        {
            title: '联系方式',
            dataIndex: 'contactPhone',
            key: 'contactPhone'
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '备注',
            dataIndex: 'mem',
            key: 'mem',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record)=>(
                <p>
                    <a onClick={()=> onModify(record)}>编辑</a>
                    <Spliter spliterText="|"/>
                    <Popconfirm title="确定删除该条记录？" onConfirm={()=> onDel(record['_id'])}>
                        <a type='ghost'>删除</a>
                    </Popconfirm>
                </p>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
    };

    return (
        <div className={supplierList}>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record=>record._id}
                pagination={false}
                rowSelection={rowSelection}
            />
            <Pagination
                className="ant-table-pagination"
                total={total}
                current={parseInt(current)}
                pageSize={PAGE_SIZE}
                onChange={onPageChange}
            />
        </div>
    );
};

SupplierList.propTypes = {
    onPageChange: PropTypes.func,
    onModify: PropTypes.func,
    onDel: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    total: PropTypes.any,
    current: PropTypes.any
};

export default SupplierList;