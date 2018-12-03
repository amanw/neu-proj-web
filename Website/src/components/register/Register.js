import React from 'react';
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom';

import * as actions from 'actions';

export class Register extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    }

    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(userData) {
    debugger;
    var registerData = {
      username: userData.username,
      email:userData.email,
      password:userData.password,
      passwordConfirmation: userData.passwordConfirmation,
      isAdmin:false
    }
    actions.register(registerData).then(
      registered => this.setState({redirect: true}),
      errors => this.setState({errors})
    );
  }

  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return <Redirect to={{pathname: '/index', state: { successRegister: true }}} />
    }

    return (
      <div id ="page-content-wrapper">
      <div className = "container-fluid">
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page"><i className="fas fa-user-plus"/><span> Register </span></li>
      </ol>
      </nav>
      <section id='register'>
        <div className='bwm-form'>
          <div className='row'>
            <div className='col-md-5'>
              <RegisterForm submitCb={this.registerUser} errors={errors} />
            </div>
            <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'>This is how you will create a new member to add the auditors.</h2>
                <img src={process.env.PUBLIC_URL + '/img/register-image.jpg'} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      </div>
    )
  }
}
