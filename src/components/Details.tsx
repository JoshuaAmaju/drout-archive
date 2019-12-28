import React from "react";
import "../styles/details.css";
import View from "./View";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import Cities from "./Cities";

type DetailsProps = {
  latitude: number;
  longitude: number;
};

const Details: React.FC<DetailsProps> = props => {
  let { latitude, longitude } = props;
  return (
    <View className="details" style={{ flexDirection: "column" }}>
      <CurrentWeather latitude={latitude} longitude={longitude} />
      <HourlyForecast latitude={latitude} longitude={longitude} />
    </View>
  );
};

export default Details;
