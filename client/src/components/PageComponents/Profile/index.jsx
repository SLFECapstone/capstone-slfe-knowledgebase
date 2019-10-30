import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Profile extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

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
    console.log(user);
    return (

      <div>
        <h1>Profile Page for {header}</h1>
        {adminView}
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Profile);
