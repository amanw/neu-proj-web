import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push as Menu } from 'react-burger-menu'
// import classNames from 'classnames';

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: 'red'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#16181d',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    top:'100px'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

// To check if menu is open or close
var isMenuOpen = function(state) {
  debugger;
  return state.isOpen;
};

class SideBar extends Component {

  // constructor(props) {
  //   super(props);
  // }
  showSettings (event) {
    event.preventDefault();
  }

  render (){
    const{ isAuth } = this.props.auth;
    if (isAuth) {
  return (
  <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } styles={ styles } onStateChange={ isMenuOpen }>
    <a id="home" className="menu-item" href="/index"><i className="fas fa-tachometer-alt"/><span>DashBoard</span></a>
    <a id="about" className="menu-item" href="/about">About</a>
    <a id="contact" className="menu-item" href="/contact">Contact</a>
    <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
  </Menu>
  );
    }
    else{
      return (null);
    }
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(SideBar));

