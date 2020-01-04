import { css, StyleSheet } from "aphrodite";
import MapboxGl from "mapbox-gl";
import React, { useEffect } from "react";
import { useLocation } from "../hooks/use-location";
import { MAPBOX_GL_ACCESS_TOKEN } from "../utils/api-keys";
import PropTypes from "prop-types";

const ACCESS_TOKEN = `pk.eyJ1IjoicG9sYXJpc2RpZ2kiLCJhIjoiY2s0dTN1aWtjMDJqejNrcjhxYmZtNGp5biJ9.kkKoxo8kN1e3PvXv59r5gg`;

MapboxGl.accessToken = ACCESS_TOKEN;
let MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");

let style = StyleSheet.create({
  map: { height: "100%" }
});

function MapView(props: any) {
  let [coords] = useLocation();
  let { onClick, onResult } = props;

  useEffect(() => {
    let { latitude, longitude } = coords || {
      latitude: 0,
      longitude: 0
    };

    let map = new MapboxGl.Map({
      zoom: 4,
      container: "map",
      center: [latitude, longitude],
      style: "mapbox://styles/mapbox/streets-v11"
    });

    let geocoder = new MapboxGeocoder({
      zoom: 14,
      mapboxgl: MapboxGl,
      placeholder: "Enter search",
      accessToken: MapboxGl.accessToken
    });

    map.addControl(geocoder);
    map.on("click", onClick);
    map.addControl(new MapboxGl.NavigationControl());

    geocoder.on("result", (res: { result: any }) => {
      //   setMode("open");
      //   let { center } = result;
      //   let [latitude, longitude] = center;
      //   setLocation({ latitude, longitude });
      onResult && onResult(res.result);
    });

    return () => {
      map.remove();
    };
  }, [coords, onClick, onResult]);

  return <div id="map" className={css(style.map)}></div>;
}

MapView.propTypes = {
  onClick: PropTypes.func,
  onResult: PropTypes.func
};

export default MapView;
