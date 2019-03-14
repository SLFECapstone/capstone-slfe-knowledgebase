import React from 'react';
import styled from 'styled-components';
import H3 from '../H3';
import image from './test2.jpg'
import PropTypes from 'prop-types';

const headerBackground = styled.h3`
  display: inline-flex;
  width: 100%;
  height: 200px;
  color: white;
`;
const H2 = styled.body`
  display: inline-flex
  font-family: BentonSans Book, sans-serif;
  font-size: 16px;
  margin-top: 15px;
  color: white;
  height: 200px;
  margin-left: 10px;
`;

const Section = styled.div`
  display: inline-flex;
  height: 75px;
  justify-content: space-between;
  width: 100%;
  background-color: #00796B;
`;

const subSection = styled.div`
  display: inline-flex;
  margin-bottom: 15px;

  height: 100px;
  justify-content: flex-end;
  width: 100%;
  background-color: #00796B;
`;

const clickable = styled.a`
  font-style: bold;
  margin-right: 10px;
`;

const handleClick = ()=> {
  console.log("clicked");
}
export default function Header({subTitle})
{
  return(
    <div style={{ width: '100%', height: '150px'}}>
      <Section>
        <div style={{ display: 'flex', flexDirection:'column',alignItems:'center',marginTop:'10px'}}>
          <H3> SLFE Knowledgebase</H3>
        </div>
        <subSection>
          <form style={{marginTop: '10px'}}>
            <a
              href='/About'
              style={{marginRight: '15px', textDecoration: 'none', color: 'white', fontWeight: 'bold'}}
              >About</a>
            <a
              href='/Partners'
              style={{marginRight: '15px', textDecoration: 'none', color: 'white', fontWeight: 'bold'}}>Partners</a>
            <a
              href='/Explore'
              style={{marginRight: '15px', textDecoration: 'none', color: 'white', fontWeight: 'bold'}}>Explore</a>
          </form>
        </subSection>
      </Section>
      <div style={{height: '60px', width: '100%', backgroundImage: `url(${image})`}}>
        <H2>{subTitle} </H2>
      </div>
    </div>
  );
};

Header.propTypes = {
  subTitle: PropTypes.string.isRequired,
};
