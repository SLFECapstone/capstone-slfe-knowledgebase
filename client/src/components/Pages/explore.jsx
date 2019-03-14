import React, { Component } from 'react';
import SectionTitle from '../PageComponents/SectionTitle';
import Header from '../PageComponents/Header';
import SearchBar from '../PageComponents/SearchBar';
import Navbar from '../PageComponents/Navbar';
import styled from 'styled-components';

const Page = styled.div`
  display: inline-flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  background-color: #CCCCCC;
`;

export default function explore() {
    return (
      <div style={{display: 'flex', width:'100%'}} >
        <Page>
          <Header subTitle='EXPLORE'/>
          <div style={{marginTop: '20px', marginLeft:'100px'}} >
            <SearchBar/>
          </div>
          <div style={{marginTop: '50px'}}>
            <SectionTitle label="Category Type" />
          </div>
          <div style={{padding:'250px'}}/>
        </Page>
      </div>
    );
}
