import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  borderRadius:{
    borderRadius: 40,
    borderTopRightRadius:40,
    borderTopLeftRadius:40
  }
  ,
  inputContainer: {
    width: "90%",
    marginVertical: 10,
  },
  inputField: {
    maxHeight: 60,
    paddingLeft:10,
    marginVertical: 10,

  },
  submitButton: {
    width: "90%",
    minHeight: 50,
    justifyContent: "center",
  },
  socialLoginContainer: {
    marginVertical: 30,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
