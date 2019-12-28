import PropTypes from "prop-types";
import React from "react";
import Details from "../components/Details";
import { useLocation } from "../hooks/use-location";
import Cities from "../components/Cities";
import View from "../components/View";
// import { navigate } from "@reach/router";

function Home() {
  let [coords] = useLocation();
  let { latitude, longitude } = coords || {
    latitude: 0,
    longitude: 0
  };

  return (
    <View style={{ flexDirection: "column", padding: "1rem", height: "100vh" }}>
      <Details latitude={latitude} longitude={longitude} />
      <View style={{ height: "1rem" }}></View>
      <Cities default={{ latitude, longitude }} />
    </View>
  );
}

Home.propTypes = {
  path: PropTypes.string
};

export default Home;
