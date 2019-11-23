import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, updateProfileRoleFunc } from "../../actions/profileActions";
import ResultUser from "../PageComponents/ResultUser";
import Paginate from "../PageComponents/Paginate";

class tempAdminPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      userEntries: null
    };
  }

  componentWillMount() {
    const users = this.props.getUsers();
    users
      .then(data => {
        this.setState({
          users: data.payload
        });
      })
      .then(() => {
        this.setState({
          userEntries: this.getUserEntries()
        });
      });
  }

  componentDidMount() {
    document.title = "SLFE - Temp Admin Page";
  }

    getUserEntries = () => {
      var filteredData = this.state.users;
      const items = [];
      if (filteredData) {
        for (var i = 0; i < filteredData.length; i++) {
  
          let u = filteredData[i]["username"];
          items.push(
            <div
              onClick={() => {
                this.props.history.push(`/profile/${u}`);
              }}
              style={{ marginBottom: "50px", cursor: "pointer" }}
            >
              <ResultUser
                username={filteredData[i]["username"]}
                role={filteredData[i]["role"]}
              />
            </div>
          );
        }
      }
  
      return items;
    };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div >
        { isAuthenticated ? (
        <div >
          { (user.role == 'Administrator') ? (
          <div >
            Welcome Administrator

            {this.state.userEntries && (
            <Paginate todos={this.state.userEntries} />
          )}
            
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
