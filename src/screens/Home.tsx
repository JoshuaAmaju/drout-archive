import React from "react";
import PropTypes from "prop-types";
import View from "../components/View";
import CurrentWeather from "../components/CurrentWeather";
// import { navigate } from "@reach/router";

function Home() {
  return (
    <View>
      <CurrentWeather latitude={0} longitude={0} />
    </View>
  );
}

Home.propTypes = {
  path: PropTypes.string
};

export default Home;
