export function formatWeatherData(data: any) {
  let {
    dt,
    id,
    name,
    weather,
    wind: { speed },
    sys: { country },
    main: { temp, temp_max, temp_min, pressure, humidity, feels_like }
  } = data;

  let { icon, main, description } = weather[0];

  return {
    id,
    country,
    pressure,
    humidity,
    city: name,
    description,
    dateTime: dt,
    windSpeed: speed,
    weatherIcon: icon,
    temperature: temp,
    feelsLike: feels_like,
    weatherCondition: main,
    temperatureMax: temp_max,
    temperatureMin: temp_min
  };
}
