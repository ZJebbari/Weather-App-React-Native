import { Image, Text, TouchableOpacity, View } from "react-native";
import { s } from "./WeatherBasic.style";
import { Txt } from "../Txt/Txt";
import { useEffect, useState } from "react";
import { Clock } from "../Clock/Clock";
import { useNavigation } from "@react-navigation/native";

export const WeatherBasic = ({
  temperature,
  interpretation,
  address,
  dailyWeather,
}) => {
  // const [time, setTime] = useState(new Date().toLocaleTimeString());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentTime = new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //     setTime(currentTime);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const nav = useNavigation();
  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <View style={s.city}>
        <Txt>{address.city},</Txt>
        <Txt style={s.country}>{address.countryCode}</Txt>
      </View>
      <View style={s.interpretation}>
        <Txt style={s.interpretation_txt}>{interpretation.label}</Txt>
      </View>
      <View style={s.temperature_box}>
        <TouchableOpacity
          onPress={() =>
            nav.navigate("Forecasts", { address, ...dailyWeather })
          }
        >
          <Txt style={s.temperature}>{temperature}°</Txt>
        </TouchableOpacity>
        <Image style={s.image} source={interpretation.image} />
      </View>
    </>
  );
};
