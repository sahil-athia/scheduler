import React, { Fragment } from 'react';
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";


import Form from "components/Appointment/Form"

afterEach(cleanup)

describe("Form Testing", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without crashing", () => {
    render(<Form interviewers={interviewers}/>)
  })

  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form interviewers={interviewers}/>)
    // we are destructuring our function from the render
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const {getByTestId} = render(<Form interviewers={interviewers} name="Lydia Miller-Jones"/>)
    // we are destructuring our function from the render
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
    // requires us to add data-testid, with student-name-input (data-testid = "student-name-input")
  });

  // getByTestId can be replaced with getByPlaceholderText

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn()
  
    const {getByText} = render(<Form interviewers={interviewers} onSave={onSave}/>)
  
    fireEvent.click(getByText("Save"))
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn()
  
    const {getByText, queryByText} = render(<Form interviewers={interviewers} onSave={onSave} name="Lydia Miller-Jones"/>)
  
    fireEvent.click(getByText("Save"))
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
})
