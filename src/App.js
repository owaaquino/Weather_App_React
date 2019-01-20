import React, { Component } from "react";
import "./App.css";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    condition: undefined,
    icon: undefined,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const Api_Key = "a4451e5b412a4bb2370d554eb617eeb4";
    // store the user input to the variables based on the inputbox name attribute. ( name="city" = city variable )
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          temperature: responseData.main.temp,
          city: responseData.name,
          country: responseData.sys.country,
          condition: responseData.weather[0].description,
          icon: responseData.weather[0].icon
        });
        console.log(responseData);
      })
      .catch(error => {
        console.log("Error fetching and parsing data.", error);
        // this.setState({
        //   error: "Error fetching and Parsing data."
        // });
      });
  };

  render() {
    return (
      <div>
        {/* some components */}
        <Title />
        <Form loadWeather={this.getWeather} />
        <Weather
          temp={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          condition={this.state.condition}
          icon={this.state.icon}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
