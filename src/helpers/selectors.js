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
  return apptArray;
}

//return an object that contains the interview data if it is passed an object that contains an interviewer.
export function getInterview(state, interview) {
  if (interview) {
    const interviewData = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
    return interviewData;
  } else {
    return null;
  }
}
