import React from "react";
import Text, { TextTypes } from "./Text";
import View from "./View";

type HeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = props => {
  let { title, actions } = props;

  return (
    <View
      style={{
        padding: "1rem",
        flexDirection: "column",
        borderBottom: "1px solid #ccc"
      }}
    >
      {actions && (
        <View style={{ alignSelf: "flex-end", marginBottom: "1rem" }}>
          {actions}
        </View>
      )}
      <Text type={TextTypes.H1}>{title}</Text>
    </View>
  );
};

export default Header;
