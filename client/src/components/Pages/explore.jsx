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
  Row,
  Col,
  Container,
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
  height: 250px;
  margin: 25px;
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
      // The categories must be hard-coded order per Nigel request #190 in Taiga.
      sorted_cat.push(this.state.domains.find(c => c.name === "Production"));
      sorted_cat.push(this.state.domains.find(c => c.name === "Processing"));
      sorted_cat.push(this.state.domains.find(c => c.name === "Distribution"));
      sorted_cat.push(this.state.domains.find(c => c.name === "Outlets"));
      sorted_cat.push(this.state.domains.find(c => c.name === "Recycling"));
      sorted_cat.push(this.state.domains.find(c => c.name === "Integrating"));
      this.state.domains = sorted_cat;

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
                width: "120px",
                height: "120px",
                backgroundColor: "#ffff"
              }}
              image={this.state.domains[i].image}
              label={this.state.domains[i].name}
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
                <CardTitle>
                  <h3>
                    <p class="text-success">
                      {this.state.popularSolutions[i].Name}
                    </p>
                  </h3>
                </CardTitle>
                <CardSubtitle>
                  <h5>
                    <p class="text-muted">
                      {this.state.popularSolutions[i]["Primary Domain"]}
                    </p>
                  </h5>
                </CardSubtitle>
                <CardText>
                  {this.state.popularSolutions[i]["General Description"]}
                </CardText>
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
          <div style={{ width: "75%", marginTop: "20px" }}>
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
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <section className="food-domains-title">
                <div className="title">
                  <h1>
                    <p class="text-success">Food Economy Domain</p>
                  </h1>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
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
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <section className="feat-soln-title">
                <div className="title">
                  <h1>
                    <p class="text-success">Featured Solutions</p>
                  </h1>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
        <br />
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
