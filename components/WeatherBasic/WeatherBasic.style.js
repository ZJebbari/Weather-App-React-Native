import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  clock: {
    alignSelf: "flex-end",
  },
  interpretation: {
    alignSelf: "flex-end",
    transform: [{ rotate: "-90deg" }],
  },
  interpretation_txt: {
    fontSize: 20,
  },
  temperature_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  temperature: {
    fontSize: 150,
  },
  image: { height: 90, width: 90 },
  city: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  country: {
    fontSize: 13,
    marginLeft: 5,
  },
});
