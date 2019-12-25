import { OPEN_WEATHER_MAP_API_KEY } from "../utils/api-keys";
import { OPEN_WEATHER_MAP_ENDPOINT } from "../utils/endpoints";

export const fetchCurrentData = (coords: {
  latitude: number;
  longitude: number;
}) => {
  let { latitude, longitude } = coords;
  let url = `${URL}/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  return fetch(url).then(res => res.json());
};

export const fetchForecastData = (coords: {
  latitude: number;
  longitude: number;
}) => {
  let { latitude, longitude } = coords;
  let url = `${URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  return fetch(url).then(res => res.json());
};
