import React, { Component } from "react";
import { connect } from "react-redux";
import { getByID } from "../../../actions/enterpriseActions";
import { editSolutionFunc } from "../../../actions/enterpriseActions";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import Radar from "react-d3-radar";
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

  // Convert latitude, longitude to cardinal directions with 4 decimal precision
  // (because this is the resolution of a parcel of land) as a displayable
  // value: lat (N,S), long (E, W)
  toGPS = (latitude, longitude) => {

    if (Number.isNaN(latitude) || Number.isNaN(longitude))
      return "";

    let lat = Math.abs(latitude).toFixed(4) + "° " + ((latitude < 0) ? "S" : "N");
    let lon = Math.abs(longitude).toFixed(4) + "° " + ((longitude < 0) ? "W" : "E");
    let output = lat + ", " + lon;
    return output;
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
      <div>
        <div className="row">
          <div className="col-md-9">
            <h1>{singleSolution.Name}</h1>
          </div>
          <div className="col-md-3">
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
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <h6>{singleSolution["Short Description"]}</h6>
          </div>
          <div className="col-md-3">
            {singleSolution["City"]}, {singleSolution["State"]}, {singleSolution["Country"]}
            <br/>
            {this.toGPS(singleSolution["Lattitude"], singleSolution["Longitude"])}
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <h5>Keywords: {singleSolution["Keyword Descriptors"]}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <table>
              <tr>
                <td>Primary Domain</td>
                <td>Date Founded</td>
                <td>Annual Revenue</td>
                <td>Number of Workers</td>
              </tr>
              <tr>
                <td>{singleSolution["Primary Domain"]}</td>
                <td>{singleSolution["Date Founded"]}</td>
                <td>{singleSolution["Annual Revenue"]}</td>
                <td>{singleSolution["Number of Workers"]}</td>
              </tr>
            </table>
          </div>
          <div className="col-md-3">
            {/*place holder*/}
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            {singleSolution["General Description"]}
          </div>
          <div className="col-md-3">
            {/*place holder*/}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            {/* padding */}
          </div>
          <div className="col-md-7">
          <div className="container">
            {typeof this.props.img !== "undefined" && (
              <div>
                <Slide
                  {...properties}
                  style={{ maxWidth: "500px", maxHeight: "450px" }}
                >
                  {this.props.img}
                </Slide>
              </div>
            )}
          </div>
          </div>
          <div className="col-md-3">
            {/*place holder*/}
          </div>
        </div>
        <div className="row">
          &nbsp;
        </div>
        <div className="row">
          <div className="col-md-12">
            <table>
              <tr>
                <td>Organizational Entity Type</td>
                <td>Scope of Activities</td>
              </tr>
              <tr>
                <td>{singleSolution["Organizational Entity Type"]}</td>
                <td>{singleSolution["Scope of Activities"]}</td>
              </tr>
              <tr>
                <td>Operational Area</td>
                <td>Climate Zone</td>
              </tr>
              <tr>
                <td>{singleSolution["Operational Area"]}</td>
                <td>{singleSolution["Climate Zone"]}</td>
              </tr>
              <tr>
                <td>City Type</td>
                <td>Secondary Domain</td>
              </tr>
              <tr>
                <td>{singleSolution["City Type"]}</td>
                <td>{singleSolution["Secondary Domain"]}</td>
              </tr>
              <tr>
                <td>Economic Network</td>
                <td>Associations</td>
              </tr>
              <tr>
                <td>{singleSolution["Economic Networks"]}</td>
                <td>{singleSolution["Associations"]}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="row">
          &nbsp;
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4 style={{padding:"10px", backgroundColor:`rgb(0,121,107)`, color:"white"}}>Details</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h5>Customer</h5>
            <p>{ singleSolution["Customer Description"] }</p>

            <h5>Workforce</h5>
            <p>{ singleSolution["Workforce Description"] }</p>

            <h5>Production</h5>
            <p>{ singleSolution["Production Description"] }</p>

            <h5>Sourcing</h5>
            <p>{ singleSolution["Sourcing Description"] }</p>

            <h5>Supporting Services</h5>
            <p>{ singleSolution["Supporting Services Description"] }</p>

            <h5>Distributing</h5>
            <p>{ singleSolution["Distributing Description"] }</p>

            <h5>Recycling</h5>
            <p>{ singleSolution["Re-Cyling Description"] }</p>

            <h5>Managing</h5>
            <p>{ singleSolution["Managing Description"] }</p>

            <h5>Decision Making</h5>
            <p>{ singleSolution["Decision Making Description"] }</p>

            <h5>Steering</h5>
            <p>{ singleSolution["Steering Description"] }</p>

            <h5>Ownership</h5>
            <p>{ singleSolution["Ownership Description"] }</p>

            <h5>Business Model</h5>
            <p>{ singleSolution["Business Model Description"] }</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4 style={{padding:"10px", backgroundColor:`rgb(0,121,107)`, color:"white"}}>Evaluation</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h5>Ownership and Decision Making</h5>
            <p>{ singleSolution["Ownership and Decision Making Evaluation Text"] }</p>

            <h5>Economic</h5>
            <p>{ singleSolution["Economic Performance Evaluation Text"] }</p>

            <h5>Environmental</h5>
            <p>{ singleSolution["Environmental Performance Evaluation Text"] }</p>

            <h5>Human and Social</h5>
            <p>{ singleSolution["Human and Social Performance Evaluation Text"] }</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <h5>Management</h5>
            <p>{ singleSolution["Management Evaluation Text"] }</p>

            <h5>Product Evaluation</h5>
            <p>{ singleSolution["Product Evaluation Text"] }</p>
          </div>
          <div className="col-md-3">
            <div class="evaluation-radar-chart">
                <Radar
                    width={500}
                    height={500}
                    padding={70}
                    domainMax={10}
                    highlighted={null}
                    data={{
                        variables: [
                            { key: 'ownership', label: 'Ownership and Decision Making' },
                            { key: 'economic', label: 'Economic' },
                            { key: 'environment', label: 'Environmental' },
                            { key: 'social', label: 'Human and Social' },
                            { key: 'management', label: 'Management' },
                            { key: 'evaluation', label: 'Product Evaluation' },
                        ],
                        sets: [
                            {
                                key: 'me',
                                label: 'My Scores',
                                values: {
                                    ownership: singleSolution["Ownership and Decision Making Evaluation Rating"],
                                    economic: singleSolution["Economic Performance Evaluation Rating"],
                                    environment: singleSolution["Environmental Performance Evaluation Rating"],
                                    social: singleSolution["Human and Social Performance Evaluation Rating"],
                                    management: singleSolution["Management Evaluation Rating"],
                                    evaluation: singleSolution["Product Evaluation Rating"],
                                },
                            }
                        ],
                    }}
                />
            </div>
          </div>
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
