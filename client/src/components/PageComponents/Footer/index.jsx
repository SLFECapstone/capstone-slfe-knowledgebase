import React from 'react';

var currentYear = (new Date()).getFullYear();

export default function Footer()
{
  return(
    <div>
        <footer>
            <div className="footer">
                <div class="copyright">
                    <p>Copyright © {currentYear} SFLE Knowledgebase</p>
                </div> 
                <div className="links">
                    <a href="/">Contact</a>
                    <a href="/">About</a>
                    <a href="/">License</a>
                    <a href="/">Research</a>
                </div>
            </div>
        </footer>
     </div>
  )
};
