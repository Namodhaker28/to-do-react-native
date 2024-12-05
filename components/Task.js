import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = ({ text, index, completeTask }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={styles.square}
          onPress={() => completeTask(index)}
        ></TouchableOpacity>
        <Text
          style={styles.itemList}
          selectable={true}
          selectionColor="#f2a750"
        >
          {text}
        </Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#f2a222",
    opacity: 0.5,
    borderRadius: 6,
    marginRight: 15,
  },
  itemList: {
    fontSize: 16,
    fontWeight: 500,
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#f2a222",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
