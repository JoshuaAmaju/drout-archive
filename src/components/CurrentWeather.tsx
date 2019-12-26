import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMachine } from "@xstate/react";
import { weatherMachine } from "../machines/weather.machine";
import { fetchCurrentData } from "../services/weather.service";
import View from "./View";
import Text, { TextTypes } from "./Text";
import Icon, { IconCodes } from "./WeatherIcons";
import { css, StyleSheet } from "aphrodite";
import Temperature from "./Temperature";

let style = StyleSheet.create({
  icon: {
    right: "-2rem",
    bottom: "-2rem",
    position: "absolute"
  }
});

function CurrentWeather(props: any) {
  let { latitude, longitude } = props;

  let [current, send] = useMachine(
    weatherMachine
      .withConfig({
        services: {
          fetch: (ctx, ev) => {
            let { latitude, longitude } = ctx;
            return fetchCurrentData({ latitude, longitude });
          }
        }
      })
      .withContext({ latitude, longitude })
  );

  let {
    context: { data }
  } = current;
  let { city, country, temperature, description, weatherIcon }: any = data || {
    city: "lagos",
    country: "NG",
    temperature: 36,
    weatherIcon: "10n",
    description: "clear sky"
  };

  useEffect(() => {
    send({ type: "FETCH", latitude, longitude });
  }, [send, latitude, longitude]);

  useEffect(() => {
    console.log(current.context);
  }, [current]);

  const DetailItem = (props: any) => {
    let { icon, title, detail } = props;
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Icon icon={icon} width={30} />
          <View style={{ marginLeft: ".5rem", flexDirection: "column" }}>
            <Text style={{ fontWeight: 600 }}>{title}</Text>
            {detail}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <Text type={TextTypes.H2} style={{ marginBottom: "1rem" }}>
        {`${city}, ${country}`}
      </Text>
      <View
        style={{
          padding: "1rem",
          overflow: "hidden",
          position: "relative",
          borderRadius: "1rem",
          backgroundColor: "#ccc",
          flexDirection: "column"
        }}
      >
        <View>
          <Text
            style={{
              margin: 0,
              fontSize: "4rem",
              fontWeight: "bold"
            }}
          >
            {temperature.toFixed(0)}
          </Text>
          <Text
            type={TextTypes.SUP}
            style={{
              fontSize: "2rem",
              fontWeight: 700
            }}
          >
            o
          </Text>
          <Text
            type={TextTypes.SUP}
            style={{
              fontSize: "3rem",
              fontWeight: 600
            }}
          >
            C
          </Text>
        </View>
        <Text type={TextTypes.H4} style={{ margin: 0 }}>
          {description}
        </Text>
        <Icon
          className={css(style.icon)}
          icon={IconCodes[weatherIcon]}
          width={150}
        />
      </View>
      <View
        style={{
          gap: "1rem",
          padding: "1rem",
          display: "grid",
          marginTop: "2rem",
          borderRadius: "1rem",
          backgroundColor: "#ccc",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <DetailItem
          icon="thermometer"
          title="Temperature"
          detail={<Temperature value={temperature} />}
        />
        <DetailItem
          icon="thermometer"
          title="Feels like"
          detail={<Temperature value={temperature} />}
        />
        <DetailItem
          icon="umbrella"
          title="Precipitation"
          detail={<Text>{temperature}</Text>}
        />
        <DetailItem
          icon="wind"
          title="Wind speed"
          detail={<Text>{`${temperature} km/h`}</Text>}
        />
      </View>
    </View>
  );
}

CurrentWeather.propTypes = {
  style: PropTypes.object,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

export default CurrentWeather;
