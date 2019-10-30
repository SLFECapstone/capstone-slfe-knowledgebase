import React, { Component } from 'react'
import Profile from '../PageComponents/Profile'

class profile extends Component {
  componentDidMount() {
    document.title = "SLFE - User Profile";
  }

  render() {
    return (
      <div >
        <Profile />
      </div>
    )
  }
}

export default profile;
