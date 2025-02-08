import { useRoute } from "@react-navigation/native";
import { Txt } from "../../components/Txt/Txt";
import { Header } from "../../components/Header/Header";
import { ForeCastListItem } from "../../components/ForeCastListItem/ForeCastListItem";
import { DAYS, getWeatherInterpretation } from "../../utils/weather-utils";
import { View } from "react-native";

export const Forecasts = () => {
  const { params } = useRoute();
  // console.log(params);
  const forecastList = (
    <View>
      {params.time.map((time, index) => {
        const weatherCode = params.weathercode[index];
        const image = getWeatherInterpretation(weatherCode).image;
        const temperature = params.temperature_2m_max[index];
        const date = new Date(time);
        // console.log(time);
        const dayOfTheWeek = DAYS[date.getDay()];
        const formatedDate = date.toLocaleDateString("default", {
          day: "numeric",
          month: "numeric",
        });
        return (
          <ForeCastListItem
            key={time}
            image={image}
            day={dayOfTheWeek}
            date={formatedDate}
            temperature={Math.round((temperature * 9) / 5 + 32)}
            // temperature={temperature}
          />
        );
      })}
    </View>
  );
  return (
    <>
      <Header address={params.address} />
      {forecastList}
    </>
  );
};
