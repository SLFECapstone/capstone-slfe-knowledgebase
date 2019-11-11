import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Profile from '../PageComponents/Profile'
import { getProfile } from "../../actions/profileActions";

class profile extends Component {
  componentDidMount() {
    document.title = "SLFE - User Profile";
    const { match } = this.props;
    console.log("inside profile " + match.params.username);
    this.props.getProfile(match.params.username);
    console.log(this.props.profileData);
  }

  render() {
    return (
      <div >
        <Profile />
      </div>
    )
  }
}

profile.PropTypes = {
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profileData: state.profileData
});

export default connect(
  mapStateToProps,
  { getProfile }
)(profile);
