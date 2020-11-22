import React from "react";
import Toast from "react-native-toast-message";

export const ToastRendered = () => <Toast ref={(ref) => Toast.setRef(ref)} />;

export const success = (heading, text) => {
  Toast.show({
    type: "success",
    text1: heading,
    text2: text,
  });
};

export const error = (heading, text) => {
  Toast.show({
    type: "error",
    text1: heading,
    text2: text,
  });
};

export const info = (heading, text) => {
  Toast.show({
    type: "info",
    text1: heading,
    text2: text,
  });
};
