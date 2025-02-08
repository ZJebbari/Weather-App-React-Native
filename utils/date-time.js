export function nowToHHMM() {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const amOrPm = hours >= 12 ? " pm" : " am";
  hours = hours % 12 || 12; // Convert hours to 12-hour format
  return `${hours}:${minutes}${amOrPm}`;
}
