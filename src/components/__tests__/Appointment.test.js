import React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";


import Appointment from "components/Appointment"

describe("Appointment Testing", () => {

  it("renders without crashing", () => {
    render(<Appointment/>);
  }); 
  test("renders without crashing", () => {
    render(<Appointment/>);
  });  
  // with jest we can use both 'it' and 'test'

  it("calls mock, with particular values", () => {
    const mock = jest.fn();
    mock("hello");
    expect(mock).toHaveBeenCalledWith("hello");
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("returns mock with particular values", () => {
    const mock = jest.fn((a, b) => a * b);
    mock(2, 5)
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveReturnedWith(10);
  });
  // using a mock function
});
