import { useMachine } from "@xstate/react";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { weatherMachine } from "../machines/weather.machine";
import { fetchForecastData } from "../services/weather.service";
import View from "./View";
import { formatWeatherData, DAYS_OF_THE_WEEK } from "../utils/utils";
import { assign } from "xstate";
import Temperature from "./Temperature";
import Text, { TextTypes } from "./Text";
import Icon, { IconCodes } from "./WeatherIcons";
import { css, StyleSheet } from "aphrodite";

let style = StyleSheet.create({
  ul: {
    gap: "1rem",
    display: "flex",
    overflowX: "auto"
  },
  marginTop: {
    marginTop: "1rem"
  }
});

function HourlyForecast(props: any) {
  let { latitude, longitude } = props;

  let [current, send] = useMachine(
    weatherMachine
      .withConfig({
        services: {
          fetch: (ctx, ev) => {
            let { latitude, longitude } = ctx;
            return fetchForecastData({ latitude, longitude });
          }
        },
        actions: {
          formatData: assign({
            data: (ctx, ev: { data: any }) => {
              let { list } = ev.data;
              return list.map((item: any) => formatWeatherData(item));
            }
          })
        }
      })
      .withContext({ latitude, longitude })
  );

  let {
    context: { data }
  }: any = current;

  useEffect(() => {
    send({ type: "FETCH", latitude, longitude });
  }, [send, latitude, longitude]);

  useEffect(() => {
      localStorage.setItem('hourly-data', JSON.stringify(data))
    console.log(data);
  }, [data]);

  return (
    <View style={{ flexDirection: "column" }}>
      <Text type={TextTypes.H2} style={{ margin: "1rem 0" }}>
        Hourly weather
      </Text>
      {data && (
        <ul className={css(style.ul)}>
          {data.map((item: any, i: number) => {
            let {
              dateTime,
              temperature,
              description,
              weatherIcon
            }: any = item || {
              temperature: 36,
              dateTime: "Fri",
              weatherIcon: "10n",
              description: "clear sky"
            };

            return (
              <View
                key={dateTime}
                style={{
                  padding: "1rem",
                  alignItems: "center",
                  borderRadius: "1rem",
                  flexDirection: "column",
                  border: "2px solid #ccc",
                  marginLeft: i > 0 ? "1rem" : 0
                }}
              >
                <Text>{`${
                  DAYS_OF_THE_WEEK[new Date(dateTime).getDay()]
                }`}</Text>
                <Icon
                  className={css(style.marginTop)}
                  icon={IconCodes[weatherIcon]}
                  width={30}
                />
                <Temperature
                  className={css(style.marginTop)}
                  value={temperature.toFixed(0)}
                />
              </View>
            );
          })}
        </ul>
      )}
    </View>
  );
}

HourlyForecast.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

export default HourlyForecast;
