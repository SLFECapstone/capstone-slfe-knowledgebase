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
    this.state = {editMode: false};
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(){
    this.setState({
      editMode: !this.state.editMode
    });
  }

  componentDidMount() {
    
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profileData;

    let adminIsViewing = false;
    let userName = "Anonymous User";
    let isOwnProfile = false;

    if (isAuthenticated) {
      if (profile) {
        userName = user.username;
        adminIsViewing = (user.role === "Administrator");
        isOwnProfile = (profile.username === user.username);
      }
    }

    // console.log(user);
    return (
      <div>
        { profile ? (
          <div>
            {this.state.editMode && isOwnProfile ? (
            <div>
              In Edit Mode on your own profile.
            </div>) : (
            <div>
              { isOwnProfile ? (
              <div>
                <h2>Welcome to your Profile { userName }</h2>
                <div><button onClick={this.handleEditClick}>Edit Profile</button></div> 
                <div>&nbsp;</div>
              </div>
              ) : (<h2>{ userName }, welcome to { profile.username }'s Profile</h2>)}
              <body>
                <div>Name: { profile.first_name ? profile.first_name + " " + profile.last_name : "" }</div>
                <div>Organization: { profile.organization ? profile.organization : "" }</div>
                <div>Position: { profile.position ? profile.position : "" } </div>
                <div>Email: { profile.email_address ? profile.email_address : "" } </div>
              </body>
            </div>)}
          
          </div>
        ) : (<div></div>)
        }
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
