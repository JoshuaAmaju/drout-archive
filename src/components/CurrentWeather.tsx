import React from "react";
import PropTypes from "prop-types";
import { useMachine } from "@xstate/react";
import { weatherMachine } from "../machines/weather.machine";
import { fetchCurrentData } from "../services/weather.service";
import View from "./View";
import Text from "./Text";
import Icon from "./WeatherIcons";

function CurrentWeather(props: any) {
  let { style, latitude, longitude } = props;

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

  return (
    <View>
      <Text>hdkf'ldf</Text>
      <Icon icon="celsius" width={60} />
    </View>
  );
}

CurrentWeather.propTypes = {
  style: PropTypes.object,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

export default CurrentWeather;
