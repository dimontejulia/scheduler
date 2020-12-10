import DayList from "components/DayList";

export function getAppointmentsForDay(state, day) {
  //get the day object
  const dayFound = state.days.find((currentDay) => currentDay.name === day);
  //if day not found
  if (!dayFound) {
    return [];
  }
  //get the appointments object for the day object
  //fill appointments object with the appointments
  const appointments = dayFound.appointments.map(
    (appointmentID) => state.appointments[appointmentID]
  );
  return appointments;
}

//given the day, return an object of interviewers
export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find((currentDay) => currentDay.name === day);
  if (!dayFound) {
    return [];
  }

  console.log("Day found ===", dayFound);
  console.log("STATE:", state);
  if (
    dayFound.length <= 0 ||
    !state.interviewers ||
    !state.days ||
    state.interviewers.length === 0
  ) {
    return [];
  }

  //get the interviewer objects for that day object
  const interviewers = dayFound.interviewers.map(
    (interviewerID) => state.interviewers[interviewerID]
  );
  return interviewers;
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
