import React, { useCallback } from "react";
import PropTypes from "prop-types";

function Image(props: any) {
  let { alt, source, width } = props;
  const ref = useCallback(node => {}, []);
  return <img ref={ref} src={source} width={width} alt={alt} />;
}

Image.propTypes = {
  width: PropTypes.number,
  alt: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};
