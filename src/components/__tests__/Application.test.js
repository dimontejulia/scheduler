import React from "react";
import axios from "axios";

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
  queryByAltText,
  waitForElementToBeRemoved,
  prettyDOM,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  debug();
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
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

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(
    container,
    "appointment"
  ).find((appointment) => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(
    container,
    "appointment"
  ).find((appointment) => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(queryByAltText(appointment, "Edit"));
  // 4. Change text to "Lydia Miller-Jones"
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Save"));
  // 6. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  // 7. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );
  // 8. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
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
  await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

  await waitForElement(() => expect(getByText(appointment, "Error saving!")));
});

xit("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(
    container,
    "appointment"
  ).find((appointment) => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(queryByAltText(appointment, "Delete"));

  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Confirm"));

  await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));

  await waitForElement(() => expect(getByText(appointment, "Error deleting!")));
});
