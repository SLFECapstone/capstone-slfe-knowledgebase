import React from 'react';
import Radar from 'react-d3-radar';

export default function SolutionSummary()
{
    return(
        <div class="solution-summary">
            <div className="title">
                <h1>Peace of Land</h1>
            </div>
            <div className="images">
                <img src="http://chooseweb.s3.amazonaws.com/raw/kublai5.jpg" alt="peace of land image"/>
            </div>
            <div className="summary">
                <table >
                    <tbody>
                        <tr>
                            <th colspan="2" class="title">Summary</th>
                        </tr>
                        <tr>
                            <td class="item">Type</td>
                            <td>Food Forest</td>
                        </tr>
                        <tr>
                            <td class="item">Domain</td>
                            <td>Services</td>
                        </tr>
                        <tr>
                            <td class="item">Entity</td>
                            <td>Cooperative (LLC)</td>
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
                            <td>Rural</td>
                        </tr>
                        <tr>
                            <td class="item">Founded</td>
                            <td>1800</td>
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
                            <td>Urban gardening project with focus on permaculture</td>
                        </tr>
                    </tbody>
                </table>              
            </div>
        </div>
    );
}