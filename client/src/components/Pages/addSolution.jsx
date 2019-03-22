import React, { Component } from 'react'
import Navbar from '../PageComponents/Navbar'
import Tabs from "../PageComponents/SolutionTab";
import Footer from '../PageComponents/Footer'
import { connect } from "react-redux";
import { getDomainEntries } from "../../actions/domainActions";
import { addSolutionFunc } from "../../actions/enterpriseActions";
import { withRouter } from 'react-router-dom'

class addSolution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      ResponsibleOrganization: "",
      ShortDescription: "",
      PrimaryDomain: "",
      SecondaryDomain: "",
      SolutionType: "",
      KeywordDescriptors: "",
      DateFounded: "0"
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleResponsibleOrganizationChange = this.handleResponsibleOrganizationChange.bind(this);
    this.handleShortDescriptionChange = this.handleShortDescriptionChange.bind(this);
    this.handlePrimaryDomainChange = this.handlePrimaryDomainChange.bind(this);
    this.handleSecondayDomainChange = this.handleSecondayDomainChange.bind(this);
    this.handleSolutionTypeChange = this.handleSolutionTypeChange.bind(this);
    this.handleKeywordDescriptorsChange = this.handleKeywordDescriptorsChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ Name: event.target.value });
  }

  handleResponsibleOrganizationChange(event) {
    this.setState({ ResponsibleOrganization: event.target.value });
  }

  handleShortDescriptionChange(event) {
    this.setState({ShortDescription: event.target.value});
  }

  handlePrimaryDomainChange(event) {
    this.setState({PrimaryDomain: event.target.value});
  }

  handleSecondayDomainChange(event) {
    this.setState({SecondaryDomain: event.target.value });
  }

  handleSolutionTypeChange(event) {
    this.setState({SolutionType: event.target.value });
  }

  handleKeywordDescriptorsChange(event) {
    this.setState({KeywordDescriptors: event.target.value });
  }

  handleFormSubmit() {
    if (this.state.Name !== "") {
      const apiCall = this.props.addSolutionFunc(this.state);
      apiCall.then(data => {
        console.log(data.payload._id);
        this.props.history.push('/solution/' + data.payload._id);
      });
    } else {
      alert("Name is required.");
    }
  }

  componentWillMount() {
    const domains = this.props.getDomainEntries();
    domains.then(data => {
      this.setState({
        domains: data.payload
      });

      this.setState({
        PrimaryDomain: data.payload[0].name
      })
    });
  }

  componentDidMount() {
    document.title = "Add Solution";
  }

  getCategoryItems() {
    var categoryTypes = [];
    if (this.state.domains) {
      for (var i = 0; i < this.state.domains.length; i++) {
        categoryTypes.push(
          <option value={this.state.domains[i].name}>
            {this.state.domains[i].name}
          </option>
        );
      }
    }

    return categoryTypes;
  }

  render() {
    const categoryList = this.getCategoryItems();

    return (
      <div >
        <Navbar />
        <h1>Add New Solution</h1> 
        <br />
        <Tabs showCancelBtn={true} showSaveBtn={true} onSave={this.handleFormSubmit}>
          <div label="General">
            <label>Name</label> <br />
            <input type="text" value={this.state.Name} onChange={this.handleNameChange}></input>
            <br /><br />
            <label>Responsible Organization</label> <br />
            <input type="text" value={this.state.ResponsibleOrganization} onChange={this.handleResponsibleOrganizationChange}></input>
            <br /><br />
            <label>Short Description</label> <br />
            <input type="text" value={this.state.ShortDescription} onChange={this.handleShortDescriptionChange}></input>
            <br /><br />
            <label>Primary Domain</label> <br />
            <select onChange={this.handlePrimaryDomainChange}>
              {categoryList}
            </select>
            <br /><br />
            <label>Secondary Domain</label> <br />
            <select onChange={this.handleSecondayDomainChange}>
              <option value="">None</option>
              {categoryList}
            </select>
            <br /><br />
            <label>Solution Type</label> <br />
            <input type="text" value={this.state.SolutionType} onChange={this.handleSolutionTypeChange}></input>
            <br /><br />
            <label>Keyword Descriptors</label> <br />
            <input type="text" value={this.state.KeywordDescriptors} onChange={this.handleKeywordDescriptorsChange}></input>
            <br /><br />
          </div>
          <div label="Images">
            <p>Image form goes here</p>
          </div>
          <div label="References">
            <p>Add list of references here</p>
          </div>            
        </Tabs>
      <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enterprise: state.enterprise
});

export default withRouter(connect(
  mapStateToProps,
  { getDomainEntries, addSolutionFunc }
)(addSolution));
