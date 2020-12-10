import DayList from "components/DayList";

export function getAppointmentsForDay(state, day) {
  let apptArray = [];
  const selectedDay = state.days.filter((d) => d.name === day);
  if (!state.days.length || !selectedDay.length) {
    return apptArray;
  }
  const appointments = selectedDay[0].appointments;
  for (let appt of appointments) {
    if (state.appointments[appt]) apptArray.push(state.appointments[appt]);
  }
  console.log("appt array", apptArray);
  return apptArray;
}
