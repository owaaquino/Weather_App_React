# Weather Application with API

Display the current weather of the city and country user entered.

**Goal:**

- Learn how to use API using fetch.
- Refresh our the props and state knowledge.
- Introduction to React Style Component

**Features:**

- Display the current weather of the city and country user entered.

**Techs:**

- React.js
- React Router
- CSS
- HTML
- OWM Weather API

**Live links:**

- Hosted with Netlify -

# Notes

Prerequisites:

- Must install Nodejs on your unit
- Must install NPM on your unit
- Install create-react-app installed to your node module ( check out [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app) for how to install the framework)
- Have a basic understanding of Javascript (ES6)
- Have a basic knowledge about React.js framework
- Styled Component is included in the dependencies of your npm

        npm install styled-component --save

## 1. Initialize and create basic Components

## App.js

As our main js file, lets make sure we import the React and related Components.
```javascript
    import React, { Component } from "react";
    import Title from "./components/Title";
    import Form from "./components/Form";
    import Weather from "./components/Weather";

    class App extends Component {
    }

    export default App;
```
## Title.js

Is just a simple stateless components that display a short information of our app
```javascript
    import React from "react";
    const Title = props => {
      return (
        <div>
          <h1>Weather Application</h1>
          <p>
            A simple weather application built with ReactJs and OWM Weather API.
          </p>
        </div>
      );
    };

    export default Title;
```
## Form.js

This component will handle our queries when we entered a city and a country to know the weather.
```javascript
    import React from "react";

    const Form = props => {
      return (
        <form onSubmit={/* handler funciton */}>
          <input type="text" placeholder="City..." name="city" required />
          <input type="text" placeholder="Country..." name="country" required />
          <button>Get Weather</button>
        </form>
      );
    };

    export default Form;
```
## Weather.js

Will display our result in this component.
```javascript
    import React from "react";

    const Weather = props => {
      return (
        <div="weather_div">
    		/* data we wanted to display goes here */
        </div>
      );
    };

    export default Weather;
```
## 2. Create a callback function for our API

Using the javascript fetch() api we can use this to get data from our API.

## App.js
```javascript
    class App extends Component {
    	//lets make a state where we can input our store our datas.
    	state = {
    		temperature: undefined,
        city: undefined,
        country: undefined,
        condition: undefined,
        icon: undefined,
        error: undefined
    	}
    	// create our callback function to get the API data and transfer them to the state.
    	getWeather = async e => {
        e.preventDefault();
        const Api_Key = "a4451e5b412a4bb2370d554eb617eeb4";
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
```
- getWeather function make sure to get the data from the API based on the city and country we entered into the form
- we make a state object to store our datas from the API after fetching.
- then use the data as props for our lower component to use.

## 3. Add onSubmit event on to our form

## Form.js
```javascript
    const Form = props => {
      return (
        <div onSubmit={props.loadWeather}>
          <input type="text" placeholder="City..." name="city" required />
          <input type="text" placeholder="Country..." name="country" required />
          <button>Get Weather</button>
        </div>
      );
    };
```
- onSubmit of our form the value of the input boxes will be put into our getWeather function and adding it to the API query.

## 4. Display the weather information

Now we display the weather information from our App.js to the Weather.js using props.

## Weather.js
```javascript
    const Weather = props => {
      return (
        <div id="weather_div">
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
        </div>
      );
    };
```
- notice that every details are displayed into a conditional operator because we wanted them to be displayed only if the props are present.

    e.x
```javascript
        {props.city && props.country && (
                  <p>
                    <span>Location:</span> {props.city}, {props.country}
                  </p>
                )}
```
    - this means display the details only if the three condition are met.

---

# Bonus

This section will introduce to a React component called "Styled Component". Basically this are for styling purposes, the great thing about this is that we can make our styles specific to a component. Also known as CSS-in-JS.

## Title.js
```javascript
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
```
- import the library to the component you wished to use the 'styled-component' into.
- create a variable/component that we wanted to apply style into (for above example we created the Heading component).
- Notice the 'styled.div' this means we wanted to style this and make this as a div element.
- In this component (Heading) we can apply the CSS styles directly to it. Or in the example above we also add some style to its children element like h1 and paragraph.
- Then make sure to use the component into the Title render method. So that the styles we made takes effect on the page.

## Form.js
```javascript
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
```
- we can specify media queries directly into the element, making sure the general markup will not be affected.

## Weather.js
```javascript
    import React from "react";
    import styled from "styled-components";

    const WeatherData = styled.div`
      display: flex;
      margin-top: 20px;
      justify-content: space-around;
      @media (max-width: 930px) {
        display: block;
      }
      & > div > p > span {
        font-weight: 600;
        color: #ff7235;
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
    ```