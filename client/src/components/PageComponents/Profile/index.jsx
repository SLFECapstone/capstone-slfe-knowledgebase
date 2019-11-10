import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../../actions/profileActions";
import PropTypes from "prop-types";

class Profile extends Component {

  // static propTypes = {
  //   auth: PropTypes.object.isRequired,
  // };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profileData;

    let adminView;
    let header;

    if (isAuthenticated) {
      header = user.username;
      if (user.role === "Administrator") {
        adminView = <p>Admin is viewing</p>
      }
    }
    else {
      header = "Unknown";
    }

    // console.log(user);
    return (
      <div>
        { profile ? [
          <h1>{ profile.first_name ? profile.first_name + " " + profile.last_name : "" }</h1>,
          <h3>Organization: { profile.organization ? profile.organization : "" }</h3>,
          <h3>Position: { profile.position ? profile.position : "" } </h3>,
          <h3>Email: { profile.email_address ? profile.email_address : "" } </h3>
        ] : (<div><div>) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profileData: state.profileData
});

export default connect(
  mapStateToProps,
  {getProfile}
)(Profile);
