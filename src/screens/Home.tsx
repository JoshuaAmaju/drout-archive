import React from "react";
import PropTypes from "prop-types";
import View from "../components/View";
import CurrentWeather from "../components/CurrentWeather";
import { useLocation } from "../hooks/use-location";
import HourlyForecast from "../components/HourlyForecast";
// import { navigate } from "@reach/router";

function Home() {
  let [coords] = useLocation();
  let { latitude, longitude } = coords || {
    latitude: 0,
    longitude: 0
  };

  return (
    <View style={{ padding: "1rem", height: "100vh", flexDirection: "column" }}>
      <CurrentWeather latitude={latitude} longitude={longitude} />
      <HourlyForecast latitude={latitude} longitude={longitude} />
    </View>
  );
}

Home.propTypes = {
  path: PropTypes.string
};

export default Home;
