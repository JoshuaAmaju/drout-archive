import React from "react";
import View from "./View";
import { css, StyleSheet } from "aphrodite";

const Modal = (props: any) => {
  let { children } = props;

  const style = StyleSheet.create({
    floating: {
      left: 0,
      width: "100%",
      position: "absolute"
    }
  });

  return (
    <>
      <View
        className={css(style.floating)}
        style={{
          zIndex: 9,
          height: "100%",
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          border: "1px solid #ccc"
        }}
      ></View>
      <View
        className={css(style.floating)}
        style={{
          zIndex: 10,
          bottom: 0,
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          backgroundColor: "#fff"
        }}
      >
        {children}
      </View>
    </>
  );
};

export default Modal;
