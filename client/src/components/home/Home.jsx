import React from "react";
import "./Home.css";
import homeImage from "../../assets/homeImage.jpg";
import homeImageSecond from "../../assets/homeImageSecond.jpg";

const Home = () => {
  return (
    <div className="homeSection">
      {/* First */}
      <div className="firstSection grid gridTwoTemplate">
        <div>
          <h2>We are the World Best IT Company</h2>
          <h1>Welcome to Sarvajeet Technical</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            recusandae, harum rem aut quod corrupti, ea placeat ipsum
            repudiandae nemo illum ipsa dolorum repellat qui adipisci? Fugiat
            quaerat eius eum.
          </p>
          <div>
            <button className="btn">Connect Now</button>
            <button className="btn">Learn More</button>
          </div>
        </div>
        <div>
          <img src={homeImage} alt="" />
        </div>
      </div>

      {/* Second */}
      <div className="secondSection grid gridFourTemplate">
        <div>
          <h2>50+</h2>
          <p>Registered Companies</p>
        </div>
        <div>
          <h2>100,00+</h2>
          <p>Happy Clients</p>
        </div>
        <div>
          <h2>500+</h2>
          <p>Well Known Developers</p>
        </div>
        <div>
          <h2>24/7</h2>
          <p>Service</p>
        </div>
      </div>

      {/* Third  */}
      <div className="thirdSection grid gridTwoTemplate">
        <div>
          <img src={homeImageSecond} alt="" />
        </div>
        <div>
          <h2>We are here to help you</h2>
          <h1>Get Started Today</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            recusandae, harum rem aut quod corrupti, ea placeat ipsum
            repudiandae nemo illum ipsa dolorum repellat qui adipisci? Fugiat
            quaerat eius eum.
          </p>
          <div>
            <button className="btn">Connect Now</button>
            <button className="btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
