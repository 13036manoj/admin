import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';
import  Users  from './users';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  
  getMenuItemKey=()=>{
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    switch(pathSnippets[0]){
      case 'users':
      return ['1'];
      case 'teams':
      return ['2'];
      case 'matches':
      return ['3'];
      case 'tournaments':
      return ['4'];
      case 'venues':
      return ['5'];
      case 'content':
      return ['6'];
      default :
       return ['1']
    }
    

  }
  render() {
    const breadcrumbNameMap = {
      '/users': 'users',
      '/teams': 'teams',
      '/matches': 'matches',
      '/tournaments': 'tournaments',
      '/venues': 'venues',
      '/content': 'content',
    };
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    console.log('location',location,'pathsnippets',pathSnippets)
    const extraBreadcrumbItems = pathSnippets.map((_val, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if(index==pathSnippets.length-1){
        return (
          <Breadcrumb.Item key={url}>
             {_val}      
          </Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
           {_val}      
          </Link>
        </Breadcrumb.Item>
      );
    });

    return (
      <Layout style={{height:'-webkit-fill-available'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo"> admin</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={this.getMenuItemKey()}>
          <Menu.Item key="1">
            <Link to="/users"> 
             <Icon type="user" />
            <span className="nav-text">Users</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
          <Link to="/teams"> 
             <Icon type="video-camera" />
             <span className="nav-text">Teams</span>
            </Link>
          </Menu.Item>
         <Menu.Item key="3">
          <Link to="/matches">
            <Icon type="upload" />
             <span className="nav-text">Matches</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
           <Link to="/tournaments">  
            <Icon type="user" />
            <span className="nav-text">Tournaments</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
           <Link to="/venues">  
            <Icon type="user" />
            <span className="nav-text">Venues</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
           <Link to="/content">  
            <Icon type="user" />
            <span className="nav-text">Content Mgmt</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', paddingTop:'10px' }} >
          <Breadcrumb>
          {extraBreadcrumbItems}
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Switch>
           <Route path="/users" component={Users} />
           <Route path="/teams" component={()=><div>teams</div>} />
           <Route path="/tournaments" component={()=><div>tournaments</div>} />
           <Route path="/matches" component={()=><div>matches</div>} />
           <Route path="/venues" component={()=><div>venues</div>} />
           <Route path="/content" component={()=><div>content</div>} />
          </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
         will work like pagination
        </Footer>
      </Layout>
    </Layout>
    );
  }
}

export default withRouter(App);
