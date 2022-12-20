import React from "react";
// import sunIcon from "../icons/sun.svg";
import downArrow from "../icons/down-arrow.svg";
const Weather = props => {
  const returnTempColor = temp => {
    if (temp < 50) {
      return "cold";
    } else if (temp >= 50 && temp < 75) {
      return "moderate";
    } else if (temp >= 75 && temp < 90) {
      return "warm";
    } else return "hot";
  };

  const weatherIcon = [
    {
      description: "clear sky",
      dayAndNight: true,
      filenameDay: "sun.svg",
      filenameNight: "moon-white.svg"
    },
    {
      description: "few clouds",
      dayAndNight: true,
      filenameDay: "sun-cloudy-white.svg",
      filenameNight: "moon-cloudy-white.svg"
    },
    {
      description: "scattered clouds",
      dayAndNight: false,
      filename: "cloudy-white.svg"
    },
    {
      description: "broken clouds",
      dayAndNight: false,
      filename: "cloudy-white.svg"
    },
    {
      description: "shower rain",
      dayAndNight: false,
      filename: "rain-white.svg"
    },
    {
      description: "rain",
      dayAndNight: false,
      filename: "rain-white.svg"
    },
    {
      description: "thunderstorm",
      dayAndNight: false,
      filename: "thunder-white.svg"
    },
    {
      description: "snow",
      dayAndNight: false,
      filename: "snow-white.svg"
    },
    {
      description: "mist",
      dayAndNight: false,
      filename: "mist-white.svg"
    },
    {
      description: "haze",
      dayAndNight: false,
      filename: "mist-white.svg"
    }
  ];

  // Return the icon filename based on what matches the description
  const filenameWeatherIcon = () => {
    let iconFilename = "sun.svg"; // Default image so error won't pop up before location chosen

    weatherIcon.forEach(key => {
      if (key.description === props.description) {
        if (key.dayAndNight) {
          iconFilename =
            props.hours >= 19 || props.hours < 5
              ? key.filenameNight
              : key.filenameDay;
        } else {
          iconFilename = key.filename;
        }
      }
    });
    return iconFilename;
  };

  return (
    <div className="single-day-weather-condition-container">
      <p className="city-container">
        {props.city}, {props.country}
      </p>
      {/* <p>Today</p> */}
      <div className="weather-icon-container weather-split-container">
        <img
          id="weather-condition-icon"
          src={require(`../icons/${filenameWeatherIcon()}`)}
          alt="weather icon"
        />
      </div>
      <div className="weather-details-container weather-split-container">
        <p>
          <span
            className={`temperature-numbers current-temp-number ${returnTempColor(
              props.currentTemp
            )}`}
          >
            {props.currentTemp}&deg;
          </span>
        </p>
        <div className="high-low-container">
          <img className="high-temp-icon" src={downArrow} alt="up arrow" />
          <span
            className={`temperature-numbers high-temp-number ${returnTempColor(
              props.highTemp
            )}`}
          >
            {props.highTemp}&deg;
          </span>

          <img className="low-temp-icon" src={downArrow} alt="down arrow" />
          <span
            className={`temperature-numbers low-temp-number ${returnTempColor(
              props.lowTemp
            )}`}
          >
            {props.lowTemp}&deg;
          </span>
        </div>
        <p className="weather-description">{props.description}</p>
      </div>
    </div>
  );
};
export default Weather;
