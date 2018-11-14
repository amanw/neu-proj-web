import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from 'actions';

class Login extends React.Component {

  constructor() {
    super();

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(userData) {
    this.props.dispatch(actions.login(userData));
  }

  render() {
    const { isAuth, errors } = this.props.auth;
    const { successRegister } = this.props.location.state || false;

    if (isAuth) {
      return <Redirect to={{pathname: '/index'}} /> 
    }

    return (
      <section id="login" className="section flex-container">
       <div className="panel-login">
       <div className="panel-innerlogin">
          <div className="row">
            <div className="col-md-12 col-md-offset-3">
            <img className="img-fluid mx-auto d-block mb-5" 
            src={process.env.PUBLIC_URL + '/img/logo.png'}></img>
              <h1 className="login-h1">Login</h1>
              {
                successRegister &&
                  <div className='alert alert-success'>
                    <p> You have been succesfuly registered, please login now. </p>
                  </div>
              }
              <LoginForm submitCb={this.loginUser} errors={errors}/>
            </div>
            {/* <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                <img src={process.env.PUBLIC_URL + '/img/login-image.jpg'} alt=""/>
              </div>
            </div> */}
          </div>
          </div>
          </div>
    
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Login)
