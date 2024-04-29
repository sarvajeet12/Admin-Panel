import React, { useEffect, useState } from "react";
import "./Service.css";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const [services, setServices] = useState([]);

  // fetch service data from backend

  const useService = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const serviceData = await response.json();

        //console.log(serviceData.msg);

        setServices(serviceData.msg);
      }
    } catch (error) {
      console.log("service page :  ", error);
    }
  };

  // automatically run this function
  useEffect(() => {
    useService();
  }, []);

  // End : fetch service data from backend

  return (
    <div className="serviceSection">
      <h1 className="heading">Services</h1>
      <div className="serviceCardContainer grid gridThreeTemplate">
        {services.map((item, index) => {
          return (
            <ServiceCard
              key={index}
              provider={item.provider}
              price={item.price}
              service={item.service}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Service;
