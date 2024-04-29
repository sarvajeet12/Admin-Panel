import React from "react";
import serviceImage from "../../assets/serviceImage.jpg";

const ServiceCard = ({ provider, price, service, description }) => {
  return (
    <div className="serviceCard">
      <img src={serviceImage} alt="" />
      <div>
        <span>{provider}</span>
        <span>{price}</span>
        <h2>{service}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
