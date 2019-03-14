import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default function ResultCard({ url, title, summary, rating, link })
{
  return(
    <div>
      <div id="result-card">
        <div className="img">
          <img src={url} alt="Italian Trulli" />
        </div>
        <div className="details">
          <div className="title">{ title }</div>
          <div>
            <StarRatingComponent 
              name="rate1" 
              starCount={5}
              value={ rating }/>
          </div>
          <div className="summary">{ summary }</div>
        </div>
      </div>
      <hr/>
    </div>
    
  )
};