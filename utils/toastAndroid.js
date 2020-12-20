import { ToastAndroid } from "react-native";

const handleAndroidToast = message => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0,
    50
  );
};

export default handleAndroidToast;
