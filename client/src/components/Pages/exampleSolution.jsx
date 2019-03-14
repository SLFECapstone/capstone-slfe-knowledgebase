import React from 'react';
import Navbar from '../PageComponents/Navbar';
import Footer from '../PageComponents/Footer';
import Summary from '../PageComponents/SolutionSummary';
import Tabs from '../PageComponents/SolutionTab';
import Radar from 'react-d3-radar';

import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';


export default function solution() {
    const DummyContent = () => (
        <p style={{ padding: '18px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      );

    return (
      <div class="solution-page">
        <Navbar />
        <div className="content">
          <Summary />
          <Tabs>
            <div label="Overview">
              <h4>Product/Services</h4>
              <p>
                  Food, trees for other gardens, education (low-cost, donation-based).
              </p>
              <h4>Workforce</h4>
              <p>
                  External trainers are used as contractors. We also use volunteers, seminars participants and students from TU Berlin.
              </p>
              <h4>Production Process</h4>
              <p>
                  Broad variety of short and long permaculture seminars contributing to site development and education on Permaculture design, social permaculture, community building 
              </p>
              <h4>Recycling</h4>
              <p>
                  For building, the resources collected during initial cleaning are used. Plan to use recycled materials for heating and enregy and building a lake for rain water storage.
              </p>
            </div>
            <div label="Details">
              <h4>History</h4>
              <p>
                  Hannah Gerlof and her brother Hannes noticed a brownfield site with 0,03ha barrack, after 17month of negotiation they  leased it from property management firm BIM (Berliner Immobilien Management GmbH). In the meantime, a project group had build around them being able to finance the lease together. Through many planning meetings and successfully aquired funding, they started working onsite in Jan 2017 (communal event cleaning the site with neighbours and other interested people). They connected to the national Permaculture institute as a practice site allowing wider recognition.
              </p>
              <h4>Future Outlook</h4>
              <p>
                  Planning a lake for producing edible water plants and storing rain water. Plans for building an onsite garden/neighborhood café with a kitchen for larger events; tool shed and a thermal mass rocket stove for cooking and heating.
              </p>
              <h4>Recognition</h4>
              <p>
                  Adward as special place of sustainability education by the German UNESCO commission (not found on adward's website).
              </p>
            </div>
            <div label="Evaluation">
                <div className="container">
                    <div class="evaluation-info">
                        <Accordion atomic={true}>
                            <AccordionItem title="Product">
                                <DummyContent />
                            </AccordionItem>
                            <AccordionItem title="Environmental">
                                <DummyContent />
                            </AccordionItem>
                            <AccordionItem title="Social">
                                <DummyContent />
                            </AccordionItem>
                            <AccordionItem title="Management">
                                <DummyContent />
                            </AccordionItem>
                            <AccordionItem title="Economics">
                                <DummyContent />
                            </AccordionItem>
                            <AccordionItem title="Ownership">
                                <DummyContent />
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div class="evaluation-radar-chart">
                    <Radar
                        width={500}
                        height={500}
                        padding={70}
                        domainMax={10}
                        highlighted={null}
                        data={{
                            variables: [
                            {key: 'resilience', label: 'Product'},
                            {key: 'strength', label: 'Environmental'},
                            {key: 'adaptability', label: 'Social'},
                            {key: 'creativity', label: 'Management'},
                            {key: 'openness', label: 'Economics'},
                            {key: 'confidence', label: 'Ownership'},
                            ],
                            sets: [
                            {
                                key: 'me',
                                label: 'My Scores',
                                values: {
                                resilience: 4,
                                strength: 6,
                                adaptability: 7,
                                creativity: 2,
                                openness: 8,
                                confidence: 1,
                                },
                            }
                        ],
                        }}
                    />
                </div>
                </div>
            </div>
          </Tabs>
        </div>
        <Footer />
      </div>
    );
}
