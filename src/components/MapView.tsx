import { css, StyleSheet } from "aphrodite";
import MapboxGl from "mapbox-gl";
import React, { useEffect } from "react";
import { useLocation } from "../hooks/use-location";
import { MAPBOX_GL_ACCESS_TOKEN } from "../utils/api-keys";

let MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");

MapboxGl.accessToken = MAPBOX_GL_ACCESS_TOKEN;

let style = StyleSheet.create({
  map: { height: "100%" }
});

function MapView() {
  let [coords] = useLocation();

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

    geocoder.on("result", (res: { result: any }) => {
      //   setMode("open");
      //   let { center } = result;
      //   let [latitude, longitude] = center;
      //   setLocation({ latitude, longitude });
    });
  }, [coords]);

  return <div id="map" className={css(style.map)}></div>;
}

export default MapView;
