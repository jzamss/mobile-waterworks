import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Item = (props) => (
  <View style={styles.itemContainer}>
    <Text style={{ ...styles.caption, ...props.style }}>{props.caption}</Text>
    <Text style={props.style}>{props.value}</Text>
  </View>
);

const SimpleInfo = ({data}) => {
  return (
    <View style={styles.container}>
      <Item
        style={styles.emphasized}
        caption="Name:"
        value={data.acctname}
      />
      <Item
        style={styles.emphasized}
        caption="Address:"
        value={data.address}
      />
      <Item caption="Meter No.:" value={data.meterserialno} />
      <View style={styles.readingInfo}>
        <Item caption="Reading Previous:" value={data.prevreading} />
        <Item
          style={styles.currentReading}
          caption="Current:"
          value={data.reading}
        />
      </View>
    </View>
  );
};

const CompleteInfo = ({data}) => {
  return (
    <View style={styles.container}>
      <Item
        style={styles.emphasized}
        caption="Name:"
        value={data.acctname}
      />
      <Item
        style={styles.emphasized}
        caption="Address:"
        value={data.address}
      />
      <Item
        style={{...styles.emphasized, ...styles.verticalSpace}}
        caption="Meter Serial No.:"
        value={data.meterserialno}
      />
      <Item
        style={styles.emphasized}
        caption="Brand:"
        value={data.meterbrand}
      />
      <Item
        style={styles.emphasized}
        caption="Size:"
        value={data.metersize}
      />
      <Item
        style={styles.emphasized}
        caption="Capacity:"
        value={data.metercapacity}
      />
      <Item
        style={styles.emphasized}
        caption="Stubout:"
        value={data.stubout}
      />
      <Item
        style={{...styles.emphasized, ...styles.verticalSpace}}
        caption="Previous Reading:"
        value={data.prevreading}
      />
      <Item
        style={styles.emphasized}
        caption="Current Reading:"
        value={data.reading}
      />
      <Item
        style={styles.emphasized}
        caption="Volumne:"
        value={data.volume}
      />

      <Item
        style={{...styles.emphasized, ...styles.verticalSpace}}
        caption="Bill No.:"
        value={data.billno}
      />
      <Item
        style={styles.emphasized}
        caption="Previous Balance:"
        value={data.balanceforward.toFixed(2)}
      />
      <Item
        style={styles.emphasized}
        caption="Othere Fees/Charges:"
        value={data.otherfees.toFixed(2)}
      />
      <Item
        style={styles.emphasized}
        caption="Consumption (This Bill):"
        value={data.volume.toFixed(2)}
      />
      <Item
        style={styles.emphasized}
        caption="Total:"
        value={data.amount.toFixed(2)}
      />
    </View>
  );
};

const AccountDetail = (props) => {
  const { data, complete } = props;
  if (complete) {
    return <CompleteInfo data={data} />
  }
  return <SimpleInfo data={data} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: "row",
  },
  caption: {
    paddingRight: 10,
  },
  value: {},
  emphasized: {
    fontSize: 18,
  },
  readingInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  currentReading: {
    paddingRight: 5,
    paddingLeft: 15,
  },
  verticalSpace: {
    paddingTop: 15,
  },
});

export default AccountDetail;
