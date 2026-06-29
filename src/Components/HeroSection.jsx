import React from "react";
import "../CSS/HeroSection.css";
import Buttons from "../Props/Buttons";
import TextLogic from "../Data/TextLogic";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const HeroSection = () => {
  const nav = useNavigate();
  return (
    <main className="hero-image-container">
      <div className="overlay">
        <div className="hero-content-wrapper">
          <section className="hero-text">
            <p className="hero-button">
              Built for Farmers. Designed for growth
            </p>
            <h1 className="hero-first-text">
              <TextLogic />
            </h1>
            <p className="session-text">
              FarmGoo connects Nigerian farmers directly to trusted truck
              drivers — cutting post-harvest losses, eliminating exploitative
              middlemen, and putting more money in your hands.
            </p>

            <div className="button-container">
              <Buttons
                text="Start For Free"
                className="hero-buttons"
                onClick={() => nav("/chooseDash")}
                icon={<FaArrowRight />}
              />
              <Buttons text="See how it works"
               onClick={() => nav("/chooseDash")} 
              className="hero-button-two" />
            </div>

            <section className="input-text-two">
              <div>
                <p className="text-two">
                  60<span className="span-hero-text">%</span>
                </p>
                <p className="hero-text-three">Less Post-Harvest Loss</p>
              </div>
              <div>
                <p className="text-two">
                  3<span className="span-hero-text">X</span>
                </p>
                <p className="hero-text-three">Faster Driver Matching</p>
              </div>
              <div>
                <p className="text-two">
                  3<span className="span-hero-text">+</span>
                </p>
                <p className="hero-text-three">User Roles Supporting</p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
