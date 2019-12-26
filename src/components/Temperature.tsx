import React from "react";
import View from "./View";
import Text, { TextTypes } from "./Text";

type Value = {
  value: number;
};

const Temperature: React.FC<Value> = (props: any) => {
  return (
    <View>
      <Text>{props.value}</Text>
      <Text
        type={TextTypes.SUP}
        style={{ marginLeft: ".1rem", fontSize: ".7rem" }}
      >
        o
      </Text>
    </View>
  );
};

export default Temperature;
