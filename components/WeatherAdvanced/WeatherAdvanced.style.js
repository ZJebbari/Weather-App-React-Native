import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Txt } from "../Txt/Txt";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#00000044",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
});

export const StyledView = styled.View`
  align-items: center;
`;

export const StyledLabel = styled.Text`
  font-size: 23px;
  color: white;
  font-family: "Alata-Regular";
`;
export const StyledValue = styled.Text`
  font-size: 17px;
  color: white;
  font-family: "Alata-Regular";
`;
