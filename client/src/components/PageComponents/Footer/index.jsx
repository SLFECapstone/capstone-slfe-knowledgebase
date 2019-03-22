import React from 'react';

var currentYear = (new Date()).getFullYear();

export default function Footer()
{
  return(
    <div>
        <footer>
            <div className="footer">
                <div className="copyright">
                    <p>Copyright © {currentYear} SFLE Knowledgebase</p>
                </div> 
                <div className="links">
                    <a href="/about">About</a>
                </div>
            </div>
        </footer>
     </div>
  )
};
