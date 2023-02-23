import axios from "axios";
import { WeatherResponseType } from "../reducers/weather.model";
import { baseUrl } from "./api-routes";

export const fetchWeatherByLatLong = async (name: string, lat: number, lon: number): Promise<WeatherResponseType> => {
  return axios
    .get(`${baseUrl}/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(({data}) => ({...data, state_name: name}))
    .catch();
};