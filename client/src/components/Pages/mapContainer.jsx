import React, { Component } from 'react';
import Header from '../PageComponents/Header';
import styled from 'styled-components';
import Map from './map.jsx'

const Page = styled.div`
  display: inline-flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  background-color: #CCCCCC;
`;

class mapContainer extends Component {

	render() {
    return (
    	<div style={{display: 'flex', width:'100%'}} >
	      <Page>
	      <Header subTitle='MAP'/>
		    <Map width={'1000px'} height={'300px'}/>
	      <div style={{padding:'250px'}}/>
		    </Page>
		  </div>

    );
  }
}

export default mapContainer;
