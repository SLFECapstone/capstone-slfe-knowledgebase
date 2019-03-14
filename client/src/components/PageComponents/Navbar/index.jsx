import React from 'react'

export default function Navbar()
{
  return(
    <div className="navbar">
        <div className="logo">
            <a href="/" className="logo--link">
                <img className="logo--image" alt="" src="https://i.imgur.com/L2kMZ75.png"/>
            </a>
        </div>
        <div className="nav">
            <a href="/browse">Result</a>
            <a href="/about">About</a>
            <a href="/map">Map</a>
            <a href="/login"><i className="fa fa-sign-in"></i></a>
        </div>
    </div>
  )
}
