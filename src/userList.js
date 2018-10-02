import React, { Component } from 'react';
import {  Route,Link } from "react-router-dom";
import { Table , Input, Select,Button } from 'antd';
import axios from 'axios';

const InputGroup = Input.Group;
const Option = Select.Option;



const columns = [{
    title: 'Name',
    dataIndex: 'name',
    // here is that finding the name started with `value`
    sorter: (a, b) => a.name.length - b.name.length,
    }, 
    {
      title: 'Phone No.',
      dataIndex: 'phone',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.phone - b.phone,
     },
    {
      title: 'Email',
      dataIndex: 'email',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.email - b.email,
     },{
      title: 'Verified',
      dataIndex: 'verified',
      defaultSortOrder: 'descend',
      sorter: (a, b) =>{ let a_temp=a.verified=='yes'?2:1
                       let b_temp=b.verified=='yes'?2:1 
                       return a_temp - b_temp;}
   }, 
   {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => { let a_temp=a.status=='active now'?2:1
                        let b_temp=b.status=='active now'?2:1 
                         return a_temp - b_temp;}
  }, 
  {
   title: 'Join Date',
   dataIndex: 'joindate',
   sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
  }];

class UserList extends Component {
  constructor(props){
    super(props);
    this.state={
      dataSource:[],
      searchVlaue:'',
      searchType:'name',
      orderType:'id',
      order:'TOP',
      page:'1',
      pagination:{},
    }
  }
 
    componentDidMount(){
      this.getUserListData(null);
    }
  getUserListData=(seachObj)=>{
    let finalUrl;
    if(seachObj){
      let searchType=seachObj['searchType'];
      let searchVlaue=seachObj['searchVlaue']
      finalUrl=`http://13.232.26.169/api/goplayadmin/v1/allusers_list/?order_type=${this.state.orderType}&order=${this.state.order}&page=${this.state.page}&search_type=${searchType}&search=${searchVlaue}`;
    }else{
      finalUrl=`http://13.232.26.169/api/goplayadmin/v1/allusers_list/?order_type=${this.state.orderType}&order=${this.state.order}&page=${this.state.page}`;
    }
    axios({
      method: 'get',
      url: finalUrl,
      // data: {
      //   firstName: 'Fred',
      //   lastName: 'Flintstone'
      // },
      headers: { Authorization: `Bearer u5pScEvKQgAeLHlhhd8lEbuN6rqgbP` }
    }).then((res)=>{
      console.log('on success' , res)
      // for pagination
      const pagination = { ...this.state.pagination };
      pagination.total = res.data.last_page;

      let dataSource = res.data.data.map((value,index)=>{
       let joindateObj= new Date(value.created_at);
       let joint_String=joindateObj?joindateObj.getMonth() + '/' + joindateObj.getDay() + '/' +joindateObj.getFullYear():'';
      return({
              'name':value.name,
               'phone':value.mobile,
               'email':value.email,
                'verified':value.otp_verified?'Yes':'No',
                'status': value.is_active?'active now':'Off',
                'joindate':joint_String,
                'key':value.id
                })
      })

      this.setState({
        dataSource,
        pagination
      })
    })
    .catch((error)=>{
      console.log('error in api hiting',error)
    });
  }
   
  onChange=(pagination, filters, sorter)=>{
    console.log('params pagination', pagination, 'filter',filters,'sorter', sorter);
      this.state.orderType=sorter.field;
      this.state.page= pagination.current;
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.getUserListData(null);
    }
  searchUser=()=>{
    this.getUserListData({'searchType':this.state.searchType,'searchVlaue':this.state.searchVlaue});
  }
  render() {
    const {match,location}=this.props;
    return (
     <div> 
       <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
       <div style={{display:'flex',width:'80%'}}>
         <div style={{fontSize:18,fontWeight:'600', marginTop:'4px'}}>Search</div>
         <InputGroup compact style={{width:'65%',marginLeft:'25px'}}>
            <Select defaultValue="name" onChange={(value)=>{this.setState({searchType:value})}}>
              <Option value="name">Name</Option>
              <Option value='email'>Email</Option>
              <Option value='mobile'>Phone No</Option>
            </Select>
            <Input style={{ width: '75%' }} placeholder={'Search by '+ this.state.searchType} onChange={(e)=>this.setState({searchVlaue:e.target.value})} />
          </InputGroup>
          <Button type="primary" onClick={this.searchUser}>Search</Button>
        </div>
        <Button type="primary">Add New User</Button>
       </div>

        <Link to={{
          pathname: `${match.url}/1234`,
          search: '?sort=name',
          hash: '#the-hash',
          state: { userId: '234edgdfh34' }
        }}> go to users details page</Link>

          <div>
           <Table columns={columns} dataSource={this.state.dataSource} onChange={this.onChange}   pagination={this.state.pagination}/>
         </div>
        </div>
    );
  }
}

export default UserList;
