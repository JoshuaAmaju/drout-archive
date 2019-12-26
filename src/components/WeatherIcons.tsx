import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Wind } from "../assets/svg/wind.svg";
import { ReactComponent as Cloud } from "../assets/svg/wi-cloud.svg";
import { ReactComponent as Rain } from "../assets/svg/wi-day-rain.svg";
import { ReactComponent as Cloudy } from "../assets/svg/wi-cloudy.svg";
import { ReactComponent as Degrees } from "../assets/svg/wi-degrees.svg";
import { ReactComponent as Sunny } from "../assets/svg/wi-day-sunny.svg";
import { ReactComponent as Celsius } from "../assets/svg/wi-celsius.svg";
import { ReactComponent as RainMix } from "../assets/svg/wi-rain-mix.svg";
import { ReactComponent as Umbrella } from "../assets/svg/wi-umbrella.svg";
import { ReactComponent as Showers } from "../assets/svg/wi-day-showers.svg";
import { ReactComponent as Thermometer } from "../assets/svg/wi-thermometer.svg";
import { ReactComponent as StormShowers } from "../assets/svg/wi-day-storm-showers.svg";

const Icons: any = {
  rain: Rain,
  wind: Wind,
  cloud: Cloud,
  sunny: Sunny,
  cloudy: Cloudy,
  degrees: Degrees,
  showers: Showers,
  celsius: Celsius,
  umbrella: Umbrella,
  "rain-mix": RainMix,
  thermometer: Thermometer,
  "storm-showers": StormShowers
};

export const IconCodes: any = {
  "10n": "showers",
  "10d": "showers",
  "03d": "",
  "03n": "",
  "02n": "cloudy",
  "02d": "",
  "01n": "sunny",
  "01d": "sunny",
  "04n": "broken-clouds",
  "04d": "sunny-overcast"
};

function Icon(props: any) {
  let { icon, fill, width, height, stroke, className } = props;
  let attrs = { fill, width, height, stroke, className };
  let Icon = Icons[icon];
  return Icon ? <Icon {...attrs} /> : null;
}

Icon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  stroke: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired
};

export default Icon;
