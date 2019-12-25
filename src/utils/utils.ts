export function formatWeatherData(data: any) {
  let {
    dt,
    name,
    weather,
    sys: { country },
    main: { temp_max }
  } = data;

  let { icon, main, description } = weather[0];

  return {
    country,
    city: name,
    description,
    dateTime: dt,
    weatherIcon: icon,
    temperature: temp_max,
    weatherCondition: main
  };
}
