import React from "react";

var currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <div>
      <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="footer-copyright text-center py-3">
              Copyright © {currentYear}:
                <a href="/about" className="text-success"> SFLE Knowledgebase</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
