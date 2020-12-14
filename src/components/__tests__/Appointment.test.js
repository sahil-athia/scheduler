import React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";


import Appointment from "components/Appointment"

describe("Appointment Testing", () => {

  it("renders without crashing", () => {
    render(<Appointment/>)
  })  
  test("renders without crashing", () => {
    render(<Appointment/>)
  })  
  // with jest we can use both 'it' and 'test'
  
})
