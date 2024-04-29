import React from "react";
import "./About.css";
import aboutImage from "../../assets/aboutImage.jpg";
import { useAuth } from "../../store/Auth";

const About = () => {
  const { user } = useAuth();

  return (
    <div className="aboutSection">
      {/* First */}
      <div className="firstSection grid gridTwoTemplate">
        <div>
          <h2>
            Welcome,{" "}
            {user ? `${user.username} to our website!` : "to  our website!"}
          </h2>
          <h1>Why Choose Us?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            animi dolore vel! Minima delectus voluptatem maiores neque quia,
            maxime et
            <br />
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
            adipisci dolore corporis doloremque molestias voluptates.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            totam ipsum, necessitatibus vero assumenda tempora unde quaerat modi
            at sint soluta quidem facere amet rerum perspiciatis consequuntur
            veritatis ratione minima.
            <br />
            <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            quaerat ad quas blanditiis modi tempore amet, ipsum eius vero?
            Repellendus!
          </p>
          <div>
            <button className="btn">Connect Now</button>
            <button className="btn">Learn More</button>
          </div>
        </div>
        <div>
          <img src={aboutImage} alt="" />
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
    </div>
  );
};

export default About;
