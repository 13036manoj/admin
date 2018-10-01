import React, { Component } from 'react';
import {  Route,Link } from "react-router-dom";
import { Table } from 'antd';
class UserDetail extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }
   
  render() {
    const {match,location}=this.props;
    console.log('props at userlist',this.props)

    return (
     <div>
        <h3>this is User details page  {location.state.userId} 
           {console.log('location data',location)}
        </h3>
     </div>
    );
  }
}

export default UserDetail;
