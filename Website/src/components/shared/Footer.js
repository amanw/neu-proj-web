import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends React.Component {

    
    render() {
        const {isAuth} = this.props.auth;
        if(isAuth) {
        return (
            // <p>test</p>
            <footer className="footer">
            <div className="container footer-align">
              <span className="text-muted">@Copyright 2018 Northeastern University.</span>
            </div>
          </footer>
        )
    }
    else {
        return (null)
    }
    }

}

function mapStateToProps(state) {
    return {
      auth: state.auth
    }
  }

export default withRouter(connect(mapStateToProps)(Footer));