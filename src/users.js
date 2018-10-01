import React from "react";
import {  Route,Link } from "react-router-dom";
import UserList from './userList'
import UserDetail from './userDetail'

const Users = (props) => {
    let {match,location}=props;
   return (
    <div>
     <Route exact path={match.url} render={()=><UserList {...props}/>}/>
     <Route path={`${match.url}/:userId`} component={() =>{
         if(!location.state){
          return <h3>No Page Found</h3>
        }else{
           return <UserDetail {...props} /> 
        } 
       }
       }/>
    </div>
  )
 }
export default Users;
