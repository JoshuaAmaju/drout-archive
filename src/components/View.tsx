import React from "react";
import PropTypes from "prop-types";

function View(props: any) {
  let { className, children } = props;
  return <div className={className}>{children}</div>;
}

View.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default View;
