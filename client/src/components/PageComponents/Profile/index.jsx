import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { getProfile, updateProfileFunc } from "../../../actions/profileActions";
import PropTypes from "prop-types";

class Profile extends Component {

  PropTypes = {
    username: PropTypes.string.isRequired,
    getProfile: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    //Having trouble loading profile data in constructor, yet need info to initialize text fields with existing data.
    this.state = {
      editMode: false,
      firstname: 'ProfileTest',
      lastname: '',
      organization: '',
      position: '',
      email: '',
      biography: ''
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBiography = this.onChangeBiography.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  }

  handleEditClick(){
    this.setState({
      editMode: !this.state.editMode
    });
  }

  onChangeFirstName(e) {
		this.setState({
			firstname: e.target.value
		});
	}

	onChangeLastName(e) {
		this.setState({
			lastname: e.target.value
		});
  }

  onChangeOrganization(e) {
		this.setState({
			organization: e.target.value
		});
  }

  onChangePosition(e) {
		this.setState({
			position: e.target.value
		});
  }

  onChangeEmail(e) {
		this.setState({
			email: e.target.value
		});
	}

  onChangeBiography(e) {
    this.setState({
      biography: e.target.value
    });
  }

	onSubmit(e) {
		e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;
    console.log("submitting profile update form")
    if (isAuthenticated)
    {
      console.log("authenticated profile update form")
      const apiCall = this.props.updateProfileFunc({ username: user.username,
        firstname: this.state.firstname, lastname: this.state.lastname,
        organization: this.state.organization, position: this.state.position,
        email: this.state.email, biography: this.state.biography });
      apiCall.then(data => {
        this.props.history.push('/');
      });
  }
  }

  componentDidMount() {
    const apiCall = this.props.getProfile(this.props.username);
    const self = this;
    apiCall.then(function() {
      const { profile } = self.props.profileData;
      self.setState({
        firstname: profile.first_name,
        lastname: profile.last_name,
        organization: profile.organization,
        position: profile.position,
        email: profile.email_address,
        biography: profile.biography
      });
    });
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
    // { expression ? body : alternate body } means eval boolean expression, if true then body else alternate body.
    return (
      <div>
        { profile ? (
          <div>
            {this.state.editMode && isOwnProfile ? (
            <div>
              <div id="profile_form" className="form_input">
                <div className="profile-form">
					      <form onSubmit={this.onSubmit}>
						    <h2>Welcome to your Profile { userName } ([Edit Mode])</h2>
						    <div className="form-group">
							    <div className="input-group">
								    <span className="input-group-addon">
									    <i className="fa fa-user"/> First Name
								    </span>
                    <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstname}
                    required="required"
                    onChange={this.onChangeFirstName}
                    />
							    </div>
						    </div>
						    <div className="form-group">
							    <div className="input-group">
								    <span className="input-group-addon">
									    <i className="fa fa-user-o"/> Last Name
								    </span>
								    <input
									  type="text"
									  className="form-control"
									  name="lastname"
									  value={this.state.lastname}
									  required="required"
                    onChange={this.onChangeLastName}
								    />
							    </div>
						    </div>
                <div className="form-group">
							    <div className="input-group">
								    <span className="input-group-addon">
									    <i className="fa fa-sitemap"/> Organization
								    </span>
								    <input
									  type="text"
									  className="form-control"
									  name="organization"
									  value={this.state.organization}
									  required="required"
                    onChange={this.onChangeOrganization}
								    />
							    </div>
						    </div>
                <div className="form-group">
							    <div className="input-group">
								    <span className="input-group-addon">
									    <i className="fa fa-briefcase"/> Position
								    </span>
								    <input
									  type="text"
									  className="form-control"
									  name="position"
									  value={this.state.position}
									  required="required"
                    onChange={this.onChangePosition}
								    />
							    </div>
						    </div>
                <div className="form-group">
							    <div className="input-group">
								    <span className="input-group-addon">
									    <i className="fa fa-envelope"/> E-mail
								    </span>
								    <input
									  type="text"
									  className="form-control"
									  name="email"
									  value={this.state.email}
									  required="required"
                    onChange={this.onChangeEmail}
								    />
							    </div>
						    </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-pencil"/> Biography
                    </span>
                    <input
                    type="text"
                    className="form-control"
                    name="biography"
                    value={this.state.biography}
                    required="required"
                    onChange={this.onChangeBiography}
                    />
                  </div>
                </div>
						    <div className="form-group">
							    <button
								  type="submit"
								  className="btn btn-primary btn-block btn-lg">
									Save Changes
							    </button>
						    </div>
					      </form>
				        </div>
			        </div>
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
                <div>Name: { profile.first_name && profile.last_name ? profile.first_name + " " + profile.last_name : "" }</div>
                <div>Organization: { profile.organization ? profile.organization : "" }</div>
                <div>Position: { profile.position ? profile.position : "" } </div>
                <div>Email: { profile.email_address ? profile.email_address : "" } </div>
                <div>Biography: { profile.biography ? profile.biography : "" } </div>
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

export default withRouter(connect(
  mapStateToProps,
  {getProfile, updateProfileFunc},
)(Profile));
