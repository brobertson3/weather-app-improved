import React from "react";
import ReactDOM from "react-dom";
// import LocationSearchInput from "./components/LocationSearchInput";
import "./index.css";
import Weather from "./components/Weather";
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      currentTemp: 0,
      highTemp: 0,
      lowTemp: 0,
      city: "",
      country: "",
      description: "",
      condition: "",
      humidity: 0,
      hours: new Date().getHours()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Grabs the value in the input field every time it is changed
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Constructs the API call for OpenWeather and grabs the response and converts to JSON
  //TODO - works for zipcode now, need to expand for city, state, country and regex validation
  getWeather = async () => {
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const zip = this.state.value;

    // Convert from Kelvin to Farenheit
    const convertTemp = temp => {
      return Math.round(((temp - 273.15) * 9) / 5 + 32);
    };

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=${WEATHER_API_KEY}`
    ).catch(err => {
      console.log(err);
    });

    const response = await api_call.json().catch(err => {
      console.log(err);
    });

    // console.log(response);
    // Only run this code if API call worked and conversion to json successful
    if (api_call.ok === true) {
      // console.log("were in here");
      this.setState({
        currentTemp: convertTemp(response.main.temp),
        highTemp: convertTemp(response.main.temp_max),
        lowTemp: convertTemp(response.main.temp_min),
        humidity: response.main.humidity,
        city: response.name,
        country: response.sys.country,
        description: response.weather[0].description,
        condition: response.weather[0].main,
        hours: new Date().getHours()
      });
      document
        .querySelector(".single-day-weather-condition-container")
        .classList.add("show");
      document.querySelector(".form-input-container").classList.add("move-up");
    } else {
      // Hide the section if something went wrong with API call
      document
        .querySelector(".single-day-weather-condition-container")
        .classList.remove("show");
      document
        .querySelector(".form-input-container")
        .classList.remove("move-up");
    }
  };

  // Action to take when the user clicks the submit button
  handleSubmit(event) {
    this.getWeather();
    event.preventDefault();
  }

  getTimeOfDay = hours => {
    console.log(hours);
    return hours < 5 || hours >= 19 ? "night" : "day";
  };

  render() {
    return (
      <main className={this.getTimeOfDay(this.state.hours)}>
        <div className="main-container">
          <div className="form-input-container">
            <p>Please enter in your location (zip code only)</p>
            {/* This gets the location from the user */}

            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>

            {/* <LocationSearchInput /> */}
          </div>
          <Weather
            currentTemp={this.state.currentTemp}
            highTemp={this.state.highTemp}
            lowTemp={this.state.lowTemp}
            humidity={this.state.humidity}
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            condition={this.state.condition}
            hours={this.state.hours}
          />
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
