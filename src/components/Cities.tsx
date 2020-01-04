import { useMachine } from "@xstate/react";
import { css, StyleSheet } from "aphrodite";
import React, { useEffect, useState } from "react";
import { ReactComponent as Plus } from "../assets/svg/plus.svg";
import { weatherMachine } from "../machines/weather.machine";
import "../styles/cities.css";
import "../styles/utils.css";
import Temperature from "./Temperature";
import Text, { TextTypes } from "./Text";
import View from "./View";
import Modal from "./Modal";
import MapView from "./MapView";

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
    console.log('city', latitude, longitude);

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
  let [open, setOpen] = useState(false);
  let { latitude, longitude } = props.default;
  let [cities, setCity]: any = useState([{ latitude, longitude }]);

  let style = StyleSheet.create({
    spacer: {
      marginLeft: "1rem"
    },
    button: {
      padding: "1rem",
      alignItems: "center",
      borderRadius: "1rem",
      justifyContent: "center",
      border: "1px solid #ccc"
    }
  });

  const onClose = () => setOpen(false);

  const handleResult = (result: any) => {
    console.log(result);
    let { center } = result;
    let [latitude, longitude] = center;
    setCity([...cities, { latitude, longitude }]);
  };

  return (
    <>
      <View style={{ flexDirection: "column" }}>
        <Text type={TextTypes.H2} style={{ marginBottom: "1rem" }}>
          Locations
        </Text>
        <View style={{ flexWrap: "wrap" }} className="cities-list">
          {cities.map(({ latitude, longitude }: any, i: number) => {
            return (
              <City
                key={i}
                latitude={latitude}
                longitude={longitude}
                className={i > 0 ? css(style.spacer) : ""}
              />
            );
          })}
          <button className={css(style.button)} onClick={() => setOpen(true)}>
            <Plus width={50} />
          </button>
        </View>
      </View>
      {open && (
        <Modal title="Add location" onClose={onClose}>
          <MapView onResult={handleResult} />
        </Modal>
      )}
    </>
  );
};

export default Cities;
