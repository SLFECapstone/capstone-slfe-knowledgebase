import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEnterprises, getDomains, getSolutions, getByID, getField, getCustom, getLatLong} from '../../../actions/enterpriseActions';
import {getDomainEntries} from '../../../actions/domainActions';
import propTypes from 'prop-types';
import DataTable2 from './DataTable2';
import Linkify from 'react-linkify';

class CheckBox extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      field: [],
      field2:[],
      LL:[],
      domain: [],
      reload: false
    }
  }

  componentWillMount() {
    this.props.getDomains();
    this.props.getSolutions();
    this.props.getByID("5bdd0493eec25d51595255d1");
    
    // you can call the api this way too if you need to call the same route more than once. 
    // in this case getField has two fields (FieldName, n) 
    //    where fieldName is the field you want to get 
    //    and n is 0 or 1
    //    if 0, the data will be filtered so that there are no repeats, empty strings, or null
    //    if 1, the api will return every value in the db regardless of empty strings, null, or repeats
    let field2 = this.props.getField("Researcher", 0);
    field2.then((data) => {
      this.setState({
        field2: data.payload
      })
    });

    let field = this.props.getField("Researcher", 1);
    field.then((data) => {
      this.setState({
        field: data.payload
      })
    });

    field = this.props.getCustom("Primary Domain", "Distribution");
    field.then((data) => {
      this.setState({
        array: data.payload
      })
    })

    var latlong = this.props.getLatLong();
    latlong.then((data)=>{
      this.setState({
        LL: data.payload
      })
    })
    var domainEntries = this.props.getDomainEntries();
    domainEntries.then((data)=>{
      this.setState({
        domain: data.payload
      })
    })
    

  }

  render() {
    const { enterprises } = this.props.enterpriseData;
    const { domains } = this.props.enterpriseData;
    const { solutions } = this.props.enterpriseData;
    const { singleSolution } = this.props.enterpriseData;
    //const { field } = this.props.enterpriseData;


    //if (!domains.length || !solutions.length || !enterprises.length || !singleSolution.length) {
    //  console.log("data loading\n");
    //}
    //else {
    //  console.log("done loading!")
    //}

    const bord = {
      border: "2px solid black",
      borderRadius: "5px",
      diplay: "inline-block",
      clear: "both",
      float: "left",
      backgroundColor: "white"
    }

    return (
      <div >
        <div style={bord}>
          <h1>Primary Domains</h1>
          {domains.map((value, index) =>
            <label key={index}>
              {value}
              <input type="checkbox" />
              <br />
            </label>
          )}
          <h1>Solution Types</h1>
          {solutions.map((value, index) =>
            <label key={index}>
              {value}
              <input type="checkbox" />
              <br />
            </label>
          )}
        </div>

        <img src="https://s3-us-west-1.amazonaws.com/slfe-image-storage/img.png" alt="testing this" />
        <DataTable2 array={enterprises} />

        <h1>getDomainEntries()</h1>
        <pre>{this.state.domain.map((r, index) => 
                <label key={index}>
                <img src={r.image} alt="" />{r.name}
                <br/>
                </label>

               )}</pre>

        <h1>GetByID: "5b85bed93a50c440b96151f8"</h1>
        <pre style={{ position: 'relative' }}>
          {JSON.stringify(singleSolution, null, 2)}
        </pre>

        <h1>GetField: "Researcher" with n=1</h1>
        <pre>
          {this.state.field.map((r, index) =>
            <label key={index}>
              {r.Researcher}
              <br />
            </label>
          )}
        </pre>

        <h1>GetField: "Researcher" with n=0</h1>
        <pre>
          {this.state.field2.map((value, index) =>
            <label key={index}>
              {value}
              <br />
            </label>
          )}
        </pre>

        <h1>getCustom("Primary Domain", "Distribution")</h1><h4>To get every solution where Primary Domain = Distribution</h4>
        <Linkify>
          {this.state.array.map((s, index) =>
            <label key={index}>
              ID: {s.ID}
              <br />
              Name: {s.Name}
              <br />
              Primary Domain: {s['Primary Domain']}
              <br />
              Solution Type: {s['Solution Type']}
              <br />
              References: {s.References}
              <br />
              <br />
            </label>

          )}
        </Linkify>
      
      <img src="https://s3-us-west-1.amazonaws.com/slfe-image-storage/img.png" alt="testing this"/>
      <DataTable2 array = {enterprises}/>
      <h1>GetByID: "5b85bed93a50c440b96151f8"</h1>
      <pre style={{position:'relative'}}>
        {JSON.stringify(singleSolution, null, 2)} 
      </pre>
      <h1>GetField: "Researcher" with n=1</h1>
      <pre>
        {this.state.field.map((r, index) => 
          <label key={index}>
            {r.Researcher}
            <br/>
          </label>
        )}
      </pre>

      <pre>
        <h1>getLatLong test</h1>
        {this.state.LL.map((r, index) => 
          <label key={index}>
            <b>Id is:</b> {r._id} <br/>
            {r.lat},
            {r.long}
            <br/>
          </label>
        )}
      </pre>

      <h1>GetField: "Researcher" with n=0</h1>
      <pre>
        {this.state.field2.map((value,index) => 
          <label key={index}>
            {value}
            <br/>
          </label>
        )}
      </pre>

      <h1>getCustom("Primary Domain", "Distribution")</h1><h4>To get every solution where Primary Domain = Distribution</h4>
      <Linkify>
        {this.state.array.map((s, index) =>
          <label key={index}> 
            ID: {s.ID}
            <br/>
            Name: {s.Name}
            <br/>
            Primary Domain: {s['Primary Domain']}
            <br/>
            Solution Type: {s['Solution Type']}
            <br/>
            References: {s.References}
            <br/>
            <br/>
          </label>  
          
        )}
      </Linkify>
    </div>
    )
  }

}

CheckBox.propTypes = {
  getEnterprises: propTypes.func.isRequired,
  getDomains: propTypes.func.isRequired,
  getSolutions: propTypes.func.isRequired,
  getByID: propTypes.func.isRequired,
  getField: propTypes.func.isRequired,
  enterpriseData: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  enterpriseData: state.enterpriseData,
  domainData: state.domainData
});

export default connect(
  mapStateToProps,
  {getEnterprises, getSolutions, getDomains, getByID, getField, getCustom, getLatLong, getDomainEntries}
) (CheckBox);
