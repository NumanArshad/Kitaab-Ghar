import React from "react";
import { useTheme, TextInput } from "react-native-paper";


const InputField = ({ extendStyles, ...rest }) => {
  const {
    colors: { background },
  } = useTheme();
  return (
    <TextInput
      style={extendStyles || { backgroundColor: background, maxHeight: 60 }}
      {...rest}
    />
  );
};

export default InputField;