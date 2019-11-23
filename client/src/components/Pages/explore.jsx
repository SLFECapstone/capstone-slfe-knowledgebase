import React, { Component } from "react";
import SectionTitle from "../PageComponents/SectionTitle";
import styled from "styled-components";
import CategoryType from "../PageComponents/CategoryType";
import PropTypes from "prop-types";
import Search from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import { getEnterprises, getField } from "../../actions/enterpriseActions";
import { getDomains } from "../../actions/enterpriseActions";
import { getDomainEntries } from "../../actions/domainActions";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import Map from "./map.jsx";

const Page = styled.div`
  flex-direction: column;
  min-width: fit-content;
  height: 100%;
  width: 100%;
  background-color: #f3f3f3;
`;

const PageSection = styled.span`
  margin-left: 24px;
  width: 95%;
`;

const ModifiedCard = styled(Card)`
  height: 260px;
  margin: 25px;
`;

const FeatCardTitle = styled(CardTitle)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FeatCardText = styled(CardText)`
  max-height: 76px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textChange: null,
      searchTermText: "",
      dataArray: [],
      solutionTypes: null
    };

    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount() {
    document.title = "SLFE Knowledge Base";
  }

  onSubmitClick(al) {
    this.props.history.push(`/browse?searchTerm=${al}`);
  }

  getCategoryItems = () => {
    var categoryTypes = [];
    var sorted_cat = [];
    if (this.state.domains) {
      const { domains } = this.state;
      // The categories must be hard-coded order per Nigel request #190 in Taiga.
      sorted_cat.push(domains.find(c => c.name === "Production"));
      sorted_cat.push(domains.find(c => c.name === "Processing"));
      sorted_cat.push(domains.find(c => c.name === "Distribution"));
      sorted_cat.push(domains.find(c => c.name === "Outlets"));
      sorted_cat.push(domains.find(c => c.name === "Recycling"));
      sorted_cat.push(domains.find(c => c.name === "Integrating"));
      this.state.domains = sorted_cat;

      const addText = [
        "Production: Growing, harvesting, extracting, collecting, …",

        "Processing: Manufacturing, assembling, baking, cooking, constructing, …",

        "Distribution: Storing, transporting, (re-packaging), aggregating …",

        "Outlets: Delivering, retailing, serving, …",

        "Recycling: Collecting, sorting, repurposing, …",

        "Integrating: Supporting, coordinating, financing, …"
      ];

      console.log("domainnnnn", this.state.domain);

      for (var i = 0; i < this.state.domains.length; i++) {
        categoryTypes.push(
          <div style={{ cursor: "pointer" }}>
            <CategoryType
              history={this.props.history}
              styleObject={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                width: "200px",
                textAlign: "center",
                padding: "4px",
                cursor: "pointer",
                backgroundColor: "#00796B",
                position: "relative",
                borderRadius: "10px",
                boxShadow:
                  "0px 10px 0px 0px rgb(2, 77, 68), 0px 0px 20px 0px #bbb",
                transition: "all 0.3s"
              }}
              image={this.state.domains[i].image}
              label={`${addText.filter(d =>
                d.includes(this.state.domains[i].name)
              )}`}
              type="primaryDomain"
            />
          </div>
        );
      }
    }

    return categoryTypes;
  };

  getPopularItems = () => {
    var popularItems = [];
    console.log(this.state.popularSolutions);
    if (this.state.popularSolutions) {
      for (var i = 0; i < this.state.popularSolutions.length; i++) {
        // Only show featured solutions
        if (this.state.popularSolutions[i].isFeatured) {
          popularItems.push(
            <ModifiedCard>
              <CardBody>
                <FeatCardTitle>
                  <h3>
                    <p class="text-success">
                      {this.state.popularSolutions[i].Name}
                    </p>
                  </h3>
                </FeatCardTitle>
                <CardSubtitle>
                  <h5>
                    <p class="text-muted">
                      {this.state.popularSolutions[i]["Primary Domain"]}
                    </p>
                  </h5>
                </CardSubtitle>
                <FeatCardText>
                  {this.state.popularSolutions[i]["General Description"]}
                </FeatCardText>
                <a
                  style={{ color: "blue" }}
                  href={`/solution/${this.state.popularSolutions[i]._id}`}
                >
                  <Button outline color="success">
                    Learn More
                  </Button>
                </a>
              </CardBody>
            </ModifiedCard>
          );
        }
      }
    }

    return popularItems;
  };
  componentWillMount() {
    const domains = this.props.getDomainEntries();
    domains.then(data => {
      this.setState({
        domains: data.payload
      });
    });
    const poulars = this.props.getEnterprises();
    poulars.then(data => {
      this.setState({
        popularSolutions: data.payload
      });
    });
    const fields = this.props.getField("Solution Type", "0");
    fields.then(data => {
      this.setState({
        solutionTypes: data.payload
      });
    });
    while (this.state.dataArray.loading === false) {
      if (this.state.dataArray.loading === true) {
        break;
      }
    }
  }

  mapData(array) {}

  render() {
    const categoryList = this.getCategoryItems();
    const popularList = this.getPopularItems();

    return (
      <Page>
        <PageSection>
          <div style={{ width: "75%", marginTop: "20px"}}>
            <div>
              <SectionTitle label="Search" />
              <MuiThemeProvider>
                <Search
                  value={this.state.searchTermText}
                  onChange={value => {
                    this.setState({ searchTermText: value });
                  }}
                  onRequestSearch={() => {
                    this.props.history.push(
                      `/browse?searchTerm=${this.state.searchTermText}`
                    );
                  }}
                />
              </MuiThemeProvider>
            </div>
          </div>
        </PageSection>
        <br />
        <div style={{ paddingLeft: "27px" }}>
          <h2 class="text-success" style={{ textAlign: "left" }}>
          Food Economy Domain
        </h2>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginRight: "10px",
            width: "100%"
          }}
        >
          {categoryList}
        </div>
        <br />
        <div style={{ paddingLeft: "27px" }}>
          <h2 class="text-success" style={{ textAlign: "left" }}>
            Featured Solutions
          </h2>
        </div>

        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)"
          }}
        >
          {popularList}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Map width={"100%"} height={"500px"} />
        </div>
      </Page>
    );
  }
}
explore.propTypes = {
  getDomainEntreis: PropTypes.func.isRequired,
  getDomains: PropTypes.func.isRequired,
  getEnterprises: PropTypes.func.isRequired,
  categoryTypes: PropTypes.object,
  enterprise: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  enterprise: state.enterprise
});

export default connect(
  mapStateToProps,
  { getEnterprises, getDomains, getField, getDomainEntries }
)(explore);
