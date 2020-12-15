import React from "react";

import { render, cleanup, waitForElement, fireEvent, getAllByTestId, getByPlaceholderText, getByAltText, queryByText } from "@testing-library/react";
import { getByText, prettyDOM } from "@testing-library/react";
// required for scoped queries, and reading the container

import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => {
  it("Defaults to monday and changes scheduale based on day pressed", async () => {
    // Renders w/o crashing tests arent very useful
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText('Monday'))
    
    fireEvent.click(getByText('Tuesday'))
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument()
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { debug, container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /Saving/i)).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, /Monday/i));

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument()
  
    console.log(prettyDOM(day));
  });
})
