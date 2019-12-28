import React, { useEffect, useState } from "react";
import View from "./View";
import { useLocation } from "../hooks/use-location";
import { useMachine } from "@xstate/react";
import Text, { TextTypes } from "./Text";
import { weatherMachine } from "../machines/weather.machine";
import Temperature from "./Temperature";
import { css, StyleSheet } from "aphrodite";
import "../styles/cities.css";
import { ReactComponent as Plus } from "../assets/svg/plus.svg";

type CityProps = {
  latitude: number;
  longitude: number;
  className?: string;
};

const City: React.FC<CityProps> = props => {
  let { latitude, longitude, className } = props;
  let [current, send] = useMachine(
    weatherMachine.withContext({
      latitude,
      longitude
    })
  );

  let {
    context: { data }
  } = current;

  let { city, country, temperature }: any = data || {
    city: "lagos",
    country: "NG",
    temperature: 36,
    description: "clear sky"
  };

  let style = StyleSheet.create({
    temperature: {
      fontSize: "2rem"
    }
  });

  useEffect(() => {
    send({ type: "FETCH", latitude, longitude });
  }, [send, latitude, longitude]);

  return (
    <View
      className={className}
      style={{
        padding: "1rem",
        backgroundColor: "#ccc",
        borderRadius: "1rem"
      }}
    >
      <View
        style={{
          margin: "auto",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Temperature value={temperature} className={css(style.temperature)} />
        <Text style={{ marginTop: "1rem" }}>{`${city}, ${country}`}</Text>
      </View>
    </View>
  );
};

type CitiesProps = {
  default: {
    latitude: number;
    longitude: number;
  };
};

const Cities: React.FC<CitiesProps> = props => {
  let { latitude, longitude } = props.default;
  let [cities, setCity]: any = useState([{ latitude, longitude }]);

  let style = StyleSheet.create({
    spacer: {
      marginLeft: "1rem"
    },
    list: {
      "> * + *": {
        marginLeft: "1rem"
      }
    }
  });

  return (
    <View style={{ flexDirection: "column" }}>
      <Text type={TextTypes.H2} style={{ marginBottom: "1rem" }}>
        Cities
      </Text>
      <View style={{ flexWrap: "wrap" }} className="cities-list">
        {cities.map(({ latitude, longitude }: any, i: number) => {
          return (
            <City
              key={i}
              className={i > 0 ? css(style.spacer) : ""}
              latitude={latitude}
              longitude={longitude}
            />
          );
        })}
        <View
          style={{
            padding: "1rem",
            alignItems: "center",
            borderRadius: "1rem",
            justifyContent: "center",
            border: "1px solid #ccc"
          }}
        >
          <Plus width={50} />
        </View>
      </View>
    </View>
  );
};

export default Cities;
