import { Text, useWindowDimensions } from "react-native";
import { s } from "./Txt.style";
const IPHONE_14_PROMAX = 0.001072961373390558;
export const Txt = ({ children, style, ...restProps }) => {
  const fontSize = style?.fontSize || s.txt.fontSize;
  const { height } = useWindowDimensions();
  // console.log(1 / height);
  // console.log(Math.round(fontSize * 0.001072961373390558 * height));
  return (
    <Text
      style={[
        s.txt,
        style,
        { fontSize: Math.round(fontSize * IPHONE_14_PROMAX * height) },
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
};
