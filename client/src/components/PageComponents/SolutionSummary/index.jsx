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
              style={{ maxWidth: "700px", maxHeight: "500px" }}
            >
              {this.props.img}
            </Slide>
          </div>
        )}
        <div className="summary">
          <table>
            <tbody>
              <tr>
                <th colspan="2" class="title">
                  Summary
                </th>
              </tr>
              <tr>
                <td class="item">Type</td>
                <td>{singleSolution["Solution Type"]}</td>
              </tr>
              <tr>
                <td class="item">Domain</td>
                <td>{singleSolution["Primary Domain"]}</td>
              </tr>
              <tr>
                <td class="item">Entity</td>
                <td>{singleSolution["Organizational Entity Type"]}</td>
              </tr>
              <tr>
                <td class="item">Area</td>
                <td>Very small</td>
              </tr>
              <tr>
                <td class="item">Climate</td>
                <td>Temperature</td>
              </tr>
              <tr>
                <td class="item">City</td>
                <td>{singleSolution["City Type"]}</td>
              </tr>
              <tr>
                <td class="item">Founded</td>
                <td>{singleSolution["Date Founded"]}</td>
              </tr>
              <tr>
                <td class="item">Economic</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td class="item">Other</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td class="item">Description</td>
                <td>{singleSolution["General Description"]}</td>
              </tr>
              <tr>
                <td class="item"></td>
                <td>
                  <button>Download as PDF</button>
                </td>
              </tr>
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
