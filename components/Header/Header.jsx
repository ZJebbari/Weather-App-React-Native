import { TouchableOpacity, View } from "react-native";
import { Txt } from "../Txt/Txt";
import { useNavigation } from "@react-navigation/native";
import { s } from "./Header.style";

export const Header = ({ address }) => {
  const nav = useNavigation();
  return (
    <View style={s.container}>
      <TouchableOpacity style={s.back_btn} onPress={() => nav.goBack()}>
        <Txt>{"<"}</Txt>
      </TouchableOpacity>
      <View style={s.header_txts}>
        <View style={s.city}>
          <Txt>{address.city.toUpperCase()}</Txt>
          <Txt style={s.country}>{address.countryCode}</Txt>
        </View>
        <Txt style={s.subtitle}>7 days forecasts</Txt>
      </View>
    </View>
  );
};
