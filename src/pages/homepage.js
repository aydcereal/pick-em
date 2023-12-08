import heroImg from "../images/hero.png";
import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className=" homepage">
          <div className="row">
            <div className="col-12 col-sm-6">
              <img className="hero-img" src={heroImg} />
            </div>
            <div className="col-12 col-sm-6">
              <div className="title">
                <h1>Welcome to pick em bets</h1>
              </div>
              <div className="pContainer">
                <p className="callout">
                  your premier destination for weekly football picks and
                  exciting wagers! Join us now to play alongside your friends
                  and family, as you make informed bets on your favorite teams.
                  Sign up today and embark on a thrilling journey of football
                  and friendly competition!
                </p>
              </div>
              <p>
                <Link to="/signup" className="btn btn-lg btn-danger">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <div className="row features row-cols-2 row-cols-md-3  ">
            <div className="col feature-card">
              <h2>Effortless Setup</h2>
              <p>
                Get your pool up and running within minutes, effortlessly
                inviting members to join.{" "}
              </p>
            </div>
            <div className="col feature-card ">
              <h2>Configuration Options</h2>
              <p>
                Tailor your pool with a wide range of scoring systems and
                customizable settings as the administrator.
              </p>
            </div>
            <div className="col feature-card ">
              <h2>Online Pick Sheets</h2>
              <p>
                Members can easily make their picks using our user-friendly and
                foolproof online pick sheets.
              </p>
            </div>
            <div className="col feature-card ">
              <h2>Automatic Deadlines</h2>
              <p>
                Picks are securely locked down at the start of each week,
                ensuring fair play and timely submissions.
              </p>
            </div>
            <div className="col feature-card ">
              <h2>Real-time Updates</h2>
              <p>
                Stay on top of the action with dynamic standings and reports
                that are updated as games conclude.
              </p>
            </div>
            <div className="col feature-card ">
              <h2>Private Message Board</h2>
              <p>
                Foster a sense of community, post rules, engage in friendly
                banter, and communicate with other members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
