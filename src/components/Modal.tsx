import React from "react";
import View from "./View";
import Text, { TextTypes } from "./Text";
import PropTypes from "prop-types";
import { ReactComponent as Close } from "../assets/svg/close.svg";

const Modal = (props: any) => {
  let { title, children, onClose } = props;

  return (
    <View
      style={{
        top: 0,
        left: 0,
        zIndex: 10,
        width: "100%",
        height: "100%",
        position: "fixed",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem"
      }}
    >
      <View style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <button onClick={onClose}>
          <Close width={20} />
        </button>
        {title && (
          <Text type={TextTypes.H3} style={{ marginLeft: "1rem" }}>
            {title}
          </Text>
        )}
      </View>
      {children}
    </View>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Modal;
