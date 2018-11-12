import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import DevTools from 'containers/devTools';

import { ToastContainer } from 'react-toastify';
import Login from 'components/login/Login';
import Header from 'components/shared/Header';
import Index from 'components/shared/index';
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
          <ToastContainer />
          <div id = "outer-container">
          <SideBar/>
          <Header logout={this.logout}/>
          <div className='container-fluid'>
          <main id = "page-wrap">
            <Switch>
              <Route exact path='/' render={() =>  <Redirect to='/login' /> }/>
              <Route exact path='/login' component={Login} />
              <ProtectedRoute exact path='/index' component={Index} />
              <ProtectedRoute exact path='/register' component={Register} />
            </Switch>
          </main>
          </div>
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
