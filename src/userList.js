import React, { Component } from 'react';
import {  Route,Link } from "react-router-dom";
import { Table } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    // here is that finding the name started with `value`
    sorter: (a, b) => a.name.length - b.name.length,
    }, {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
   }, {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
  }];
class UserList extends Component {
    onChange=(pagination, filters, sorter)=>{
        console.log('params', pagination, filters, sorter);
    }
  render() {
    const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }, {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      }];
      
    const {match,location}=this.props;
    console.log('props at userlist',this.props)
    return (
     <div> user list page 
          <Link to={{
            pathname: `${match.url}/1234`,
            search: '?sort=name',
            hash: '#the-hash',
            state: { userId: '234edgdfh34' }
          }}> go to users details page</Link>
          <div>
           <Table columns={columns} dataSource={data} onChange={this.onChange} />
         </div>
        </div>
    );
  }
}

export default UserList;
