import React, { useRef, useState } from "react";
import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
// import LocationSearchInput from "./components/LocationSearchInput";
import "./index.css";
import Weather from "./components/Weather";
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
  const [weatherState, setWeatherState] = useState({
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
  })

  const singleDayWeatherRef = useRef(null)
  const formInputRef = useRef(null)

  // Grabs the value in the input field every time it is changed
  const handleChange = (event) => {
    setWeatherState({ ...weatherState, value: event.target.value });
  }

  // Constructs the API call for OpenWeather and grabs the response and converts to JSON
  //TODO - works for zipcode now, need to expand for city, state, country and regex validation
  const getWeather = async () => {
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const zip = weatherState.value;

    // Convert from Kelvin to Farenheit
    const convertTemp = temp => {
      return Math.round(((temp - 273.15) * 9) / 5 + 32);
    };

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${zip},us&appid=${WEATHER_API_KEY}`
    ).catch(err => {
      console.log(err);
    });

    const response = await api_call.json().catch(err => {
      console.log(err);
    });

    // Only run this code if API call worked and conversion to json successful
    if (api_call.ok === true) {
      setWeatherState({
        ...weatherState,
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
      singleDayWeatherRef.current.classList.add("show");
      formInputRef.current.classList.add("move-up");
    } else {
      // Hide the section if something went wrong with API call
      singleDayWeatherRef.current.classList.remove("show");
      formInputRef.current.classList.remove("move-up");
    }
  };

  // Action to take when the user clicks the submit button
  const handleSubmit = (event) => {
    getWeather();
    event.preventDefault();
  }

  const getTimeOfDay = hours => {
    console.log(hours);
    return hours < 5 || hours >= 19 ? "night" : "day";
  };

  return (
    <main className={getTimeOfDay(weatherState.hours)}>
      <div className="main-container">
        <div ref={formInputRef} className="form-input-container">
          <Typography variant='body1' sx={{ marginBottom: '15px' }}>Please enter in your location (zip code only)</Typography>
          {/* This gets the location from the user */}

          <form>
            <label>
              <TextField
                value={weatherState.value}
                onChange={handleChange}
                placeholder='Enter in zipcode'
                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="Toggle password visibility"
                        onClick={handleSubmit}
                      >
                        {<SearchIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </label>
          </form>

          {/* <LocationSearchInput /> */}
        </div>
        <Weather
          currentTemp={weatherState.currentTemp}
          highTemp={weatherState.highTemp}
          lowTemp={weatherState.lowTemp}
          humidity={weatherState.humidity}
          city={weatherState.city}
          country={weatherState.country}
          description={weatherState.description}
          condition={weatherState.condition}
          hours={weatherState.hours}
          singleDayWeatherRef={singleDayWeatherRef}
        />
      </div>
    </main>
  );

}

export default App