import PropTypes from "prop-types";
import React from "react";
import View from "../components/View";
import MapView from "../components/MapView";

function Map() {
  return (
    <View style={{ height: "100vh", flexDirection: "column" }}>
      <MapView />
    </View>
  );
}

Map.propTypes = {
  path: PropTypes.string
};

export default Map;
