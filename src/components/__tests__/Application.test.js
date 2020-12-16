import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  prettyDOM,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});
/*
Wait until the text "Archie Cohen" is displayed.
Click the "Add" button on the first empty appointment.
Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
Click the first interviewer in the list.
Click the "Save" button on that same appointment.
Check that the element with the text "Saving" is displayed.
Wait until the element with the text "Lydia Miller-Jones" is displayed.
Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
*/

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  //wait until the save operation is complete and then confirm that the student's name is showing
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );

  await waitForElement(() => getByText(day, "no spots remaining"));
});
