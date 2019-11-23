import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, updateProfileRoleFunc } from "../../actions/profileActions";

class tempAdminPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
		super(props);
  }

  componentDidMount() {
    document.title = "SLFE - Temp Admin Page";

    const users = this.props.getUsers();
    users
      .then(data => {
        this.setState({
          users: data.payload
        });
      })
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

tempAdminPage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  updateProfileRoleFunc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUsers, updateProfileRoleFunc }
)(tempAdminPage);
