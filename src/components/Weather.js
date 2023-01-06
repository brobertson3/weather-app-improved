import React from "react";
import downArrow from "../icons/down-arrow.svg";
import { Typography } from "@mui/material";
import { styled } from '@mui/system';

const SCityTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
  marginBottom: '60px',
  marginTop: '20px'
}));

const Weather = ({ currentTemp,
  highTemp,
  lowTemp,
  humidity,
  city,
  country,
  description,
  condition,
  hours,
  singleDayWeatherRef }) => {
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
      if (key.description === description) {
        if (key.dayAndNight) {
          iconFilename =
            hours >= 19 || hours < 5
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
    <section ref={singleDayWeatherRef} className="single-day-weather-condition-container" >
      <SCityTypography variant='h3'>{city}, {country}</SCityTypography>
      <div className="weather-icon-container weather-split-container">
        <img
          id="weather-condition-icon"
          src={require(`../icons/${filenameWeatherIcon()}`)}
          alt="weather icon"
        />
      </div>
      <div className="weather-details-container weather-split-container">
        <Typography variant='h3'>
          <span
            className={`temperature-numbers current-temp-number ${returnTempColor(
              currentTemp
            )}`}
          >
            {currentTemp}&deg;
          </span>
        </Typography>
        <div className="high-low-container">
          <img className="high-temp-icon" src={downArrow} alt="up arrow" />
          <span
            className={`temperature-numbers high-temp-number ${returnTempColor(
              highTemp
            )}`}
          >
            {highTemp}&deg;
          </span>

          <img className="low-temp-icon" src={downArrow} alt="down arrow" />
          <span
            className={`temperature-numbers low-temp-number ${returnTempColor(
              lowTemp
            )}`}
          >
            {lowTemp}&deg;
          </span>
        </div>
        <p className="weather-description">{description}</p>
      </div>
    </section>
  );
};
export default Weather;
