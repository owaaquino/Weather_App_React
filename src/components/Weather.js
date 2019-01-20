import React from "react";
import styled from "styled-components";

const WeatherData = styled.div`
  display: flex;
  margin-top: 20px;
  @media (max-width: 930px) {
    display: block;
  }
  & > div > p > span {
    font-weight: 600;
    color: #ff7235;
  }
  & > div {
    padding: 20px;
  }
`;

const Weather = props => {
  return (
    <WeatherData id="weather_div">
      <div>
        {props.icon && (
          <img
            src={`http://openweathermap.org/img/w/${props.icon}.png`}
            alt={props.condition}
          />
        )}
      </div>
      <div>
        {props.city && props.country && (
          <p>
            <span>Location:</span> {props.city}, {props.country}
          </p>
        )}
        {props.temp && (
          <p>
            <span>Temperature:</span> {props.temp}
          </p>
        )}
        {props.condition && (
          <p>
            <span>Condition:</span> {props.condition}
          </p>
        )}
        {<p>{props.error}</p>}
      </div>
    </WeatherData>
  );
};

export default Weather;
