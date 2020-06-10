import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, Fonts, TouchableComponent } from "../rsi-react-native";

const NumberCounter = ({ value, index, increment, decrement, readOnly }) => {
  return (
    <View style={styles.counter}>
      {!readOnly && (
        <View style={styles.increment}>
          <TouchableComponent onPress={() => increment(index)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableComponent>
        </View>
      )}
      <Text style={styles.counterText}>{value}</Text>
      {!readOnly && (
        <View style={styles.decrement}>
          <TouchableComponent onPress={() => decrement(index)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableComponent>
        </View>
      )}
    </View>
  );
};

/* return an array of decimal positions
 * based on max value. every array element is
 * 10**[arryindex] representation
 */
const buildInitialValues = (max, value) => {
  const values = [];
  let val = 0;
  let exp = 0;
  while (val < max) {
    values.push(0);
    exp += 1;
    val = Math.pow(10, exp);
  }
  const previousValues = value
    .toString()
    .split("")
    .map((x) => +x);
  const offset = values.length - previousValues.length;
  for (let i = 0; i < previousValues.length; i++) {
    values[offset + i] = previousValues[i];
  }
  return values;
};

const Counter = (props) => {
  const { value, max, onRead, readOnly } = props;
  const initialValues = buildInitialValues(max, value);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const reading = +values.join("");
    onRead(reading);
  }, [values]);

  const incrementHandler = (index) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = (newValues[index] + 1) % 10;
      return newValues;
    });
  };

  const decrementHandler = (index) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValues[index] > 0 ? newValues[index] - 1 : 9;
      return newValues;
    });
  };

  return (
    <View style={styles.screen}>
      {values.map((val, idx) => (
        <NumberCounter
          key={idx}
          value={values[idx]}
          index={idx}
          increment={incrementHandler}
          decrement={decrementHandler}
          readOnly={readOnly}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    justifyContent: "center",
  },
  increment: {
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    backgroundColor: Colors.counterButton,
    paddingVertical: 2,
  },
  counter: {
    width: 65,
    borderWidth: 4,
    borderColor: Colors.counterBorder,
    backgroundColor: Colors.counterColor,
  },
  decrement: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    paddingVertical: 2,
    backgroundColor: Colors.counterButton,
  },
  counterText: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default Counter;
