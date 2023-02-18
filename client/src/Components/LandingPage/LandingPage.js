import React from "react";
import "./landingPage.css";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineLogout,
  HiOutlineBookmarkAlt,
} from "react-icons/hi";

export default function LandingPage({loggedIn}) {
  // Landing page
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-page-nav">
        <h2>BOOKSHOP MANAGERS</h2>
        <div className="landing-button">
          <div>
            <button onClick={() => navigate("/signin")} className='home_link'>Log In</button>
              <HiOutlineLogout className="landing_page_icon"/>
          </div>
          <div>
            <button className="home_link"
              id="landing-join-us-button" onClick={() => navigate("/signup")}>
          Join Us
        </button>
          </div>
        </div>
      </div>
      <div className="landing-page-message">
        <h1>Welcome to our Bookshop</h1>
        <img src="/svgs/landing-books.svg" alt="Books logo"></img>
      </div>
      <div className="landing-page-message">
        <ul>
        <h5>
          MAKE SALES
        </h5>
        <h5>
          TRACK SALES
        </h5>
        <h5>
          VIEW TRANSACTION
        </h5>
        <h5>
          MANAGE SALES
        </h5>
        </ul>
      
      </div>
    </div>
  );
}
