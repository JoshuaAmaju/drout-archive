import React from "react";
import classNames from "classnames";
import { css, StyleSheet, CSSProperties } from "aphrodite";

export enum TextTypes {
  P = "p",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  SUP = "sup",
  SPAN = "span"
}

type TextProps = {
  type?: TextTypes;
  children?: string;
  className?: string;
  style?: CSSProperties;
};

const Text: React.FC<TextProps> = (props: any) => {
  let { type = "p", style, children, className } = props;
  let Type = type;

  let textStyle = StyleSheet.create({ Text: { ...style } });

  return (
    <Type className={classNames(css(textStyle.Text), className)}>
      {children}
    </Type>
  );
};

export default Text;
