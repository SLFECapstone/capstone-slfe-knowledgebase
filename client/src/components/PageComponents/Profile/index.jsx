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
    console.log("inside profile pagecomponent " + this.props.profileData);
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
        <h1>Profile Page for {profile.username}</h1>
        {adminView}
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
