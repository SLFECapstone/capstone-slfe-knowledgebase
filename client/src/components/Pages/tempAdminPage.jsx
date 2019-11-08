import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../PageComponents/Navbar'
import Footer from '../PageComponents/Footer'

class tempAdminPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
		super(props);
  }

  componentDidMount() {
    document.title = "SLFE - Temp Admin Page";
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div >
        { isAuthenticated ? (
        <div >
          { (user.role == 'Administrator') ? (
          <div >
            Welcome Administrator
          </div>):(<div >Unauthorized User</div>)}
        </div>):(<div >Unauthenticated User</div>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(tempAdminPage);
