import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import DevTools from 'containers/devTools';

import { ToastContainer } from 'react-toastify';
import Login from 'components/login/Login';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import Index from 'components/shared/index';
import University from 'components/university/UniversityList';
import UniversityAdd from 'components/university/UniversityAdd';
import UniversityEdit from 'components/university/UniversityEdit';
import AuditPlan from 'components/auditplan/Auditplan';
import AuditPlanEdit from 'components/auditplan/AuditplanEdit';
import Scheduler from 'components/scheduler/Scheduler';
import AuditPlanList from 'components/auditplan/AuditPlanList';
import IssueAdd from 'components/issues/IssueAdd';
import IssueEdit from 'components/issues/IssueEdit';
import IssueList from 'components/issues/IssueList';
import { Register } from 'components/register/Register';
import SideBar from 'components/shared/SideBar';


import { ProtectedRoute } from 'routes/ProtectedRoute';
import * as actions from 'actions';

import 'App.css';

let store = configureStore();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className='App'>
          <DevTools/>
          <div id = "outer-container">
          <SideBar/>
          <Header logout={this.logout}/>
          <div className='container-fluid'>
          <ToastContainer />
          <main id = "page-wrap">
            <Switch>
              <Route exact path='/' render={() =>  <Redirect to='/login' /> }/>
              <Route exact path='/login' component={Login} />
              <ProtectedRoute exact path='/index' component={Index} />
              <ProtectedRoute exact path='/university' component={University} />
              <ProtectedRoute exact path='/university/new' component={UniversityAdd} />
              <ProtectedRoute exact path='/university/:id' component={UniversityEdit} />
              <ProtectedRoute exact path='/auditplan/new/:id' component={AuditPlan} />
              <ProtectedRoute exact path='/auditplan/edit/:id' component={AuditPlanEdit} />
              <ProtectedRoute exact path='/auditplanlist' component={AuditPlanList} />
              <ProtectedRoute exact path='/scheduler/:id' component={Scheduler} />
              <ProtectedRoute exact path='/issues/new/:id' component={IssueAdd} />
              <ProtectedRoute exact path='/issues/edit/:id' component={IssueEdit} />
              <ProtectedRoute exact path='/issues' component={IssueList} />
              <ProtectedRoute exact path='/register' component={Register} />
            </Switch>
          </main>
          </div>
           <Footer/>
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
