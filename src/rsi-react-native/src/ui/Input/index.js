import React, { useState, useEffect} from "react";
import { View, TextInput, StyleSheet } from "react-native";


const Input = props => {
  const [value, setValue] = useState(props.initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const clear = !!props.clear;
  
  const textChangeHandler = text => {
    setValue(text);
    props.onInputChange(props.id, text);
  };

  const lostFocusHandler = () => {
    if (value && value.length > 0) {
      setIsDirty(true);
    }
  };

  useEffect(() => {
    if (clear) {
      setValue(null);
    }
  });

  return (
    <View style={{...styles.formControl, ...props.style}}>
      <TextInput
        {...props}
        style={{...styles.input, ...props.inputStyle}}
        value={value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
});

export default Input;
