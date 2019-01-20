import React from "react";
import styled from "styled-components";

const Heading = styled.div`
  text-align: left;
  & > h1 {
    color: #ff7235;
  }
  & > p {
    color: #45503b;
  }
`;

const Title = props => {
  return (
    <Heading>
      <h1>Weather Application</h1>
      <p>
        A simple weather application built with ReactJs and OWM Weather API.
      </p>
    </Heading>
  );
};

export default Title;
