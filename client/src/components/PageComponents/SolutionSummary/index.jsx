import React, { Component } from "react";
import { connect } from "react-redux";
import { getByID } from "../../../actions/enterpriseActions";
import { editSolutionFunc } from "../../../actions/enterpriseActions";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import CheckBox from "rc-checkbox";

class SolutionSummary extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handleFeatureToggle = this.handleFeatureToggle.bind(this);

    this.state = {
      isFeatured : false
    }
  }

  componentDidMount() {
    const apiCall = this.props.getByID(this.props.id);
    const self = this;
    apiCall.then(function() {
      self.setState({
        isFeatured: self.props.enterpriseData.singleSolution.isFeatured
      });
    });

  }

  handleFeatureToggle(e) {
    this.setState({
      isFeatured: e.target.checked
    });
    this.props.enterpriseData.singleSolution.isFeatured = e.target.checked;
    const apiCall = this.props.editSolutionFunc(this.props.enterpriseData.singleSolution);

  }

  render() {
    const properties = {
      infinite: true,
      indicators: true,
      arrows: true,
    };
    const { singleSolution } = this.props.enterpriseData;
    const { isAuthenticated, user } = this.props.auth;

    let canToggleFeatured = false;

    if (isAuthenticated) {
      if (user.role === 'Administrator') {
        canToggleFeatured = true;
      }
    }

    return (
      <div class="solution-summary">
        <div className="title">
          <h1>{singleSolution.Name}</h1>
        </div>
        {typeof this.props.img !== "undefined" && (
          <div>
            <Slide
              {...properties}
              style={{ maxWidth: "500px", maxHeight: "300px" }}
            >
              {this.props.img}
            </Slide>
          </div>
        )}
        <div className="summary">
          <table>
            <colgroup>
              <col style={{width:"30%"}} />
              <col style={{width:"70%"}} />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" class="title">
                  Summary
                </th>
              </tr>
              <tr>
                <td class="item">Name</td>
                <td>{singleSolution["Name"]}</td>
              </tr>
              <tr>
                <td class="item">Responsible Organization</td>
                <td>{singleSolution["Responsible Organization"]}</td>
              </tr>
              <tr>
                <td class="item">Short Description</td>
                <td>{singleSolution["Short Description"]}</td>
              </tr>
              <tr>
                <td class="item">General Description</td>
                <td>{singleSolution["General Description"]}</td>
              </tr>
              <tr>
                <td class="item">Solution Type</td>
                <td>{singleSolution["Solution Type"]}</td>
              </tr>
              <tr>
                <td class="item">Primary Domain</td>
                <td>{singleSolution["Primary Domain"]}</td>
              </tr>
              <tr>
                <td class="item">Secondary Domain</td>
                <td>{singleSolution["Secondary Domain"]}</td>
              </tr>
              <tr>
                <td class="item">Organizational Entity Type</td>
                <td>{singleSolution["Organizational Entity Type"]}</td>
              </tr>
              <tr>
                <td class="item">Keywords</td>
                <td>{singleSolution["Keyword Descriptors"]}</td>
              </tr>
              <tr>
                <td class="item">Location</td>
                <td>{singleSolution["Location"]}</td>
              </tr>
              <tr>
                <td class="item">Country</td>
                <td>{singleSolution["Country"]}</td>
              </tr>
              <tr>
                <td class="item">State</td>
                <td>{singleSolution["State"]}</td>
              </tr>
              <tr>
                <td class="item">City</td>
                <td>{singleSolution["City"]}</td>
              </tr>
              <tr>
                <td class="item">Latitude</td>
                <td>{singleSolution["Lattitude"]}</td>
              </tr>
              <tr>
                <td class="item">Longitude</td>
                <td>{singleSolution["Longitude"]}</td>
              </tr>
              <tr>
                <td class="item">Scope of Activities</td>
                <td>{singleSolution["Scope of Activities"]}</td>
              </tr>
              <tr>
                <td class="item">Operational Area</td>
                <td>{singleSolution["Operational Area"]}</td>
              </tr>
              <tr>
                <td class="item">Climate Zone</td>
                <td>{singleSolution["Climate Zone"]}</td>
              </tr>
              <tr>
                <td class="item">City Type</td>
                <td>{singleSolution["City Type"]}</td>
              </tr>
              <tr>
                <td class="item">Date Founded</td>
                <td>{singleSolution["Date Founded"]}</td>
              </tr>
              <tr>
                <td class="item">Economic Network</td>
                <td>{singleSolution["Economic Networks"]}</td>
              </tr>
              <tr>
                <td class="item">Associations</td>
                <td>{singleSolution["Associations"]}</td>
              </tr>
              <tr>
                <td class="item">Annual Revenue</td>
                <td>{singleSolution["Annual Revenu"]}</td>
              </tr>
              <tr>
                <td class="item">Number of Workers</td>
                <td>{singleSolution["Number of Employees"]}</td>
              </tr>
              {/* This is not used for anything right now, and can be confusing.
              <tr>
                <td class="item"></td>
                <td>
                  <button>Download as PDF</button>
                </td>
              </tr>
              */}
              <tr>
                <td colspan="2">
                <label>
                &nbsp;&nbsp;
                <CheckBox
                  name="Featured"
                  onChange={this.handleFeatureToggle}
                  disabled={!canToggleFeatured}
                  checked={this.state.isFeatured}
                />
                &nbsp; Featured Solution
                </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

SolutionSummary.PropTypes = {
  getByID: PropTypes.func.isRequired,
  img: PropTypes.object
};

const mapStateToProps = state => ({
  enterpriseData: state.enterpriseData,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getByID, editSolutionFunc }
)(SolutionSummary);
