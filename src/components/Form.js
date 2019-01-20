import React from "react";
import styled from "styled-components";

const InputForm = styled.form`
  margin-top: 20px;
  & > input {
    padding: 10px;
    @media (max-width: 930px) {
      display: block;
      width: 100%;
      margin: 5px;
    }
  }
  & > input:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    @media (max-width: 930px) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  & > button {
    color: #fefefe;
    background-color: #6db5ca;
    border: none;
    padding: 12px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    @media (max-width: 930px) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      display: block;
      margin: 0 auto;
    }
  }
`;

const Form = props => {
  return (
    <InputForm onSubmit={props.loadWeather}>
      <input type="text" placeholder="City..." name="city" required />
      <input type="text" placeholder="Country..." name="country" required />
      <button>Get Weather</button>
    </InputForm>
  );
};

export default Form;
