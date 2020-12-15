/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
import Appointment from "../Appointment/index";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
  it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
  });
});
