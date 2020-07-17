import { Alert } from "react-native";

const MsgBox = (title, msg, onOk, onCancel = () => {}) => {
  return Alert.alert(
    title,
    msg,
    [
      {
        text: "Cancel",
        onPress: onCancel,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: onOk,
      },
    ],
    { cancelable: false }
  );
};

export default MsgBox;
