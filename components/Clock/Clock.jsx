import { useState } from "react";
import { nowToHHMM } from "../../utils/date-time";
import { Txt } from "../Txt/Txt";
import { s } from "./Clock.style";

export const Clock = () => {
  const [time, setTime] = useState(nowToHHMM());

  useState(() => {
    const interval = setInterval(() => {
      setTime(nowToHHMM());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <Txt style={s.time}>{time}</Txt>;
};
