import { useState, useEffect } from "react";
import axios from "axios";

import { getDayForAppointment } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });
  //call selector function to return all appointments matching with the provided Day
  //const dailyAppointments = getAppointmentsForDay(state, state.day);
  //update state with a new day selected
  const setDay = (day) => setState({ ...state, day: day.name });

  //add new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = [...state.days];

    //what day was the interview on - day obj
    const day = getDayForAppointment(state, appointment);

    let newSpots = 0;
    for (let appt of day.appointments) {
      if (appointments[appt].interview === null) {
        newSpots++;
      }
    }

    const newDay = { ...state.days[day.id - 1], spots: newSpots };
    days[day.id - 1] = newDay;

    const URL = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(URL, { interview }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = [...state.days];

    //what day was the interview on - day obj
    const day = getDayForAppointment(state, appointment);
    console.log("DAY", day);

    let newSpots = 0;
    for (let appt of day.appointments) {
      if (appointments[appt].interview === null) {
        newSpots++;
      }
    }

    const newDay = { ...state.days[day.id - 1], spots: newSpots };
    days[day.id - 1] = newDay;

    const URL = `http://localhost:8001/api/appointments/${id}`;
    return axios.delete(URL).then(() => {
      setState({ ...state, appointments, days });
    });
  }
  useEffect(() => {
    const GET_DAYS = `http://localhost:8001/api/days`;
    const GET_APPOINTMENTS = "http://localhost:8001/api/appointments";
    const GET_INTERVIEWERS = "http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ])
      .then((all) => {
        setState({
          ...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: Object.values(all[2].data),
        });
      })
      .catch((error) => console.log("ERROR: ", error));
  });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
