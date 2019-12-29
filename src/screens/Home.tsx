import PropTypes from "prop-types";
import React from "react";
import Details from "../components/Details";
import { useLocation } from "../hooks/use-location";
import Cities from "../components/Cities";
import View from "../components/View";
import Header from "../components/Header";
import { ReactComponent as Search } from "../assets/svg/search.svg";
import { navigate, Link } from "@reach/router";

function Home() {
  let [coords] = useLocation();
  let { latitude, longitude } = coords || {
    latitude: 0,
    longitude: 0
  };

  return (
    <View style={{ flexDirection: "column", height: "100vh" }}>
      <Header
        title="Home"
        actions={
          <Link to="/map">
            <Search width={30} />
          </Link>
        }
      />
      <View style={{ flexDirection: "column", padding: "1rem" }}>
        <Details latitude={latitude} longitude={longitude} />
        <View style={{ height: "1rem" }}></View>
        <Cities default={{ latitude, longitude }} />
      </View>
    </View>
  );
}

Home.propTypes = {
  path: PropTypes.string
};

export default Home;
