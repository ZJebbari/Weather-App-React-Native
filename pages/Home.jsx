import { Text, View } from "react-native";
import { s } from "./Home.style";
import { Txt } from "../components/Txt/Txt";
import { WeatherBasic } from "../components/WeatherBasic/WeatherBasic";
import { getWeatherInterpretation } from "../utils/weather-utils";
import { WeatherAdvanced } from "../components/WeatherAdvanced/WeatherAdvanced";
import { SearchBar } from "../components/SearchBar/SearchBar";

export const Home = ({ weather, address, onSubmitSearch }) => {
  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  return (
    <>
      <View style={s.meteo_basic}>
        <WeatherBasic
          dailyWeather={weather.daily}
          temperature={Math.round((currentWeather.temperature * 9) / 5 + 32)}
          interpretation={currentInterpretation}
          address={address}
        />
      </View>
      <View style={s.searchBar_conttainer}>
        <SearchBar onSubmit={onSubmitSearch} />
      </View>
      <View style={s.meteo_advance}>
        <WeatherAdvanced
          sunrise={weather.daily.sunrise[0].split("T")[1]}
          sunset={weather.daily.sunset[0].split("T")[1]}
          windspeed={currentWeather.windspeed}
        />
      </View>
    </>
  );
};
