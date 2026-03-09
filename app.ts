/* import express from "express";

const app = express();
const port = 3000;

app.get("/api/forecast", (req, res) => {
  res.json({
    apiVersion: "v1",
    temperature: 25,
    humidity: 60,
    city: "Brno",
  });
});

app.get("/api/cities", (req, res) => {
  res.json({
    apiVersion: "v1",
    cities: ["Brno", "Prague", "Dortmund"],
  });
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
*/

import { Controller, Get, startApp } from "./framework";

@Controller("/api")
class WeatherController {
  @Get("/forecast")
  public getForecast() {
    return {
      apiVersion: "v1",
      temperature: 25,
      humidity: 60,
      city: "Brno",
    };
  }
}

@Controller("/api")
class CitiesController {
  @Get("/cities")
  public getCities() {
    return {
      cities: ["Brno", "Prague", "Dortmund"],
    };
  }
}

startApp();
