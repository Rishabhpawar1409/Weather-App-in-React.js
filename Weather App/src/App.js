import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import image from "./images/cool-background.png";
import image1 from "./images/cloud.png";

export default function App() {
  const [inputCity, setInputCity] = useState("");

  const handleChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRequestedData(inputCity);
  };
  const apiId = "8f761e7ccc68be80c2e6ef17787a9493";
  const [data, setData] = useState({});

  const getRequestedData = (cityName) => {
    if (!cityName) return;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiId;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${image})`,
        width: "100%",
        height: "100vh"
      }}
    >
      <br></br>
      <h1>Weather App </h1>
      <div className="Container">
        <input
          type="text"
          placeholder="Enter Your City.."
          className="input"
          value={inputCity}
          onChange={handleChange}
        />
        <button className="btn" onClick={handleSubmit}>
          Search
        </button>
      </div>
      {Object.keys(data).length > 0 && (
        <div>
          <img src={image1} className="Icon" alt="Clowdy" />
          <h3 className="weatherCity">{data?.name}</h3>
          <h2 className="temp">{Math.floor(data?.main?.temp - 273.15)}</h2>
        </div>
      )}
    </div>
  );
}
