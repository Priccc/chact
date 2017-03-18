import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './style'
import { Table ,Pagination} from 'antd';

class Details extends Component {
    constructor(props) {
        super(props)
        this.getColumns = this.getColumns.bind(this);
    }
    getColumns() {
        const {list} = this.props;
        const filters = Object.assign([],list.map(value=>{
            return {text:value,value}
        }))
        return [
        {
            title: 'type',
            dataIndex: 'type',
            filters,
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            sorter: (a, b) => a.type.length - b.type.length,
        }, {
            title: 'qid',
            dataIndex: 'qid',
            sorter: (a, b) => a.qid - b.qid,
        }, {
            title: 'ptid',
            dataIndex: 'ptid',
            sorter: (a, b) => a.ptid.length - b.ptid.length,
        }, {
            title: 'csuid',
            dataIndex: 'csuid',
            sorter: (a, b) => a.csuid.length - b.csuid.length,
        }, {
            title: 'qids',
            dataIndex: 'qids'
        }]
    }
    render() {
        const {data,list} = this.props;
        
        data.map((value,index)=>{
            const querystring = JSON.parse(value.querystring);
            return Object.assign(value,{
                key:index,
                qids:querystring.qids.join(','),
                debug:JSON.stringify(querystring.debug)
            })
        })
        return (
            <div style={{position:'relative'}}>
                <div styleName="details">
                    <Table columns={this.getColumns()} dataSource={data} pagination={{defaultPageSize:8}} 
                    expandedRowRender={record => <p>{`debug:${record.debug}`}</p>} />
                </div>
            </div>
            
        )
    }
}
export default CSSModules(Details,styles)