import React from "react";
import PropTypes from "prop-types";

function Text(props: any) {
  let { type = "p", children, className } = props;
  let Type = type;
  return <Type className={className}>{children}</Type>;
}

Text.defaultTypes = {};

Text.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
  className: PropTypes.string
};

export default Text;
