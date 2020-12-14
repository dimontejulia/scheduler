import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  //call selector function to return all appointments matching with the provided Day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

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

    const URL = `http://localhost:8001/api/appointments/${id}`;
    return axios
      .put(URL, { interview })
      .then(() => {
        setState({ ...state, appointments });
      })
      .catch((err) => console.log(err));
  }

  function cancelInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const URL = `http://localhost:8001/api/appointments/${id}`;
    return axios
      .delete(URL)
      .then(() => {
        setState({ ...state, appointments });
      })
      .catch((err) => console.log(err));
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
        console.log("ALL", all);
        setState({
          ...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: Object.values(all[2].data),
        });
        console.log("CURRENT STATE===", state);
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);
}
