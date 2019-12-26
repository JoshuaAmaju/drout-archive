import React from "react";
import { css } from "aphrodite";
import classNames from "classnames";
import { StyleSheet, CSSProperties } from "aphrodite";

type ViewProps = {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

const View: React.FC<ViewProps> = (props: any) => {
  let { style, children, className } = props;

  let viewStyle = StyleSheet.create({
    View: {
      display: "flex",
      flexDirection: "row",
      ...style
    }
  });

  return (
    <div className={classNames(css(viewStyle.View), className)}>{children}</div>
  );
};

export default View;
