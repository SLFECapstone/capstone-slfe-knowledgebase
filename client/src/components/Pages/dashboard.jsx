import React, { Component } from 'react';
import { connect } from "react-redux";
//import { getCurrentProfile} from '../../actions/profileActions';

class dashboard extends Component {
    componentDidMount() {
        //this.props.getCurrentProfile();
    }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default connect()(dashboard);
//export default connect(null, { getCurrentProfile }) (dashboard);
