import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Celsius } from "../assets/svg/wi-celsius.svg";

const Icons: any = {
  celsius: Celsius
};

function Icon(props: any) {
  let { icon, fill, width, height, stroke, className } = props;
  let attrs = { fill, width, height, stroke, className };

  let Icon = Icons[icon];
  return <Icon {...attrs} />;
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
