import { Text, View } from "react-native";
import { Txt } from "../Txt/Txt";
import {
  StyledLabel,
  StyledValue,
  StyledView,
  s,
} from "./WeatherAdvanced.style";

function convertTo12HourFormat(timeString) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  // Determine whether it's "am" or "pm"
  const amOrPm = hours >= 12 ? " pm" : " am";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Format the time string
  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")}${amOrPm}`;

  return formattedTime;
}

function kmPerHourToMilesPerHour(kmPerHour) {
  // Conversion factor from km/h to mph
  const conversionFactor = 0.621371;

  // Convert km/h to mph
  const milesPerHour = kmPerHour * conversionFactor;

  return milesPerHour;
}

export const WeatherAdvanced = ({ sunrise, sunset, windspeed }) => {
  return (
    <View style={s.container}>
      <StyledView>
        <StyledValue>{convertTo12HourFormat(sunrise)}</StyledValue>
        <StyledLabel>Sunrise</StyledLabel>
      </StyledView>
      <StyledView>
        <StyledValue>{convertTo12HourFormat(sunset)}</StyledValue>
        <StyledLabel>Sunset</StyledLabel>
      </StyledView>
      <StyledView>
        <StyledValue>
          {Math.round(kmPerHourToMilesPerHour(windspeed))} mph
        </StyledValue>
        <StyledLabel>Wind speed</StyledLabel>
      </StyledView>
    </View>
  );
};
