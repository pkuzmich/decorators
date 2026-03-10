import { Controller, Get, Inject, Injectable, startApp } from "./framework";

@Injectable("CitiesDB")
class CitiesDB {
  public getCities() {
    console.log("CitiesDB: getCities called");
    return ["Brno", "Prague", "Dortmund"];
  }
}

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
  @Inject("CitiesDB")
  private citiesDb: CitiesDB;

  @Get("/cities")
  public getCities() {
    return {
      cities: this.citiesDb.getCities(),
    };
  }
}

startApp();
